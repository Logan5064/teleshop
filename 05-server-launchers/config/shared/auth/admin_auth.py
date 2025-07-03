#!/usr/bin/env python3
"""
🔐 Система админских сессий
Управление временными админскими профилями в БД
"""

import random
import string
import hashlib
import json
from typing import Optional, Dict
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, and_


# Добавляем путь к shared модулям
import sys
import os

# Добавляем путь к shared модулям
import sys
import os
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = current_dir
for _ in range(10):  # Ищем корень проекта
    if os.path.exists(os.path.join(project_root, "main_launcher.py")):
        break
    project_root = os.path.dirname(project_root)
shared_path = os.path.join(project_root, "05-server-launchers", "config")
sys.path.insert(0, shared_path)

from shared.models.auth_models import AdminSession
from shared.utils.database import get_db

class AdminSessionManager:
    """Менеджер админских сессий"""
    
    @staticmethod
    def generate_admin_token() -> str:
        """Генерирует админский токен"""
        timestamp = str(int(datetime.now(timezone.utc).timestamp()))
        random_string = ''.join(random.choices(string.ascii_letters + string.digits + '-_', k=32))
        return f"admin_{timestamp}_{random_string}"
    
    @staticmethod
    async def create_admin_session(
        password: str,
        db: AsyncSession,
        ip_address: str = None,
        user_agent: str = None,
        session_info: dict = None
    ) -> str:
        """
        Создает новую админскую сессию в БД
        Возвращает админский токен
        """
        # Проверяем пароль из environment variables
        admin_password = os.getenv("ADMIN_PASSWORD", "")
        if not admin_password:
            raise HTTPException(status_code=500, detail="Ошибка конфигурации сервера")
        
        if password != admin_password:
            raise HTTPException(status_code=401, detail="Неверный админский пароль")
        
        # Деактивируем старые сессии (опционально)
        await db.execute(
            delete(AdminSession).where(
                AdminSession.expires_at < datetime.now(timezone.utc)
            )
        )
        
        # Генерируем токен
        admin_token = AdminSessionManager.generate_admin_token()
        
        # Создаем новую сессию (12 часов)
        new_session = AdminSession(
            admin_token=admin_token,
            ip_address=ip_address,
            user_agent=user_agent,
            expires_at=datetime.now(timezone.utc) + timedelta(hours=12),
            login_method="password",
            session_info=json.dumps(session_info) if session_info else None
        )
        
        db.add(new_session)
        await db.commit()
        
        try:
            print(f"👑 Создана админская сессия: {admin_token[:30]}... (12 часов)")
        except:
            print(f"Admin session created: {admin_token[:30]}... (12 hours)")
        
        return admin_token
    
    @staticmethod
    async def verify_admin_session(admin_token: str, db: AsyncSession) -> Optional[Dict]:
        """Проверяет админскую сессию в БД"""
        result = await db.execute(
            select(AdminSession).where(AdminSession.admin_token == admin_token)
        )
        session = result.scalar_one_or_none()
        
        if not session:
            return None
        
        # Проверяем валидность
        if not session.is_valid:
            # Удаляем недействительную сессию
            await db.delete(session)
            await db.commit()
            return None
        
        # Обновляем время последней активности
        session.last_activity = datetime.now(timezone.utc)
        await db.commit()
        
        return {
            "admin_token": session.admin_token,
            "expires_at": session.expires_at,
            "time_left_hours": session.time_left_hours,
            "ip_address": session.ip_address,
            "created_at": session.created_at
        }
    
    @staticmethod
    async def cleanup_expired_sessions(db: AsyncSession):
        """Очищает истекшие админские сессии из БД"""
        current_time = datetime.now(timezone.utc)
        
        # Удаляем истекшие сессии
        expired_result = await db.execute(
            delete(AdminSession).where(AdminSession.expires_at < current_time)
        )
        
        await db.commit()
        
        sessions_deleted = expired_result.rowcount
        
        if sessions_deleted > 0:
            try:
                print(f"🧹 Удалено истекших админских сессий: {sessions_deleted}")
            except:
                print(f"Deleted expired admin sessions: {sessions_deleted}")
        
        return sessions_deleted
    
    @staticmethod
    async def logout_admin_session(admin_token: str, db: AsyncSession) -> bool:
        """Удаляет админскую сессию (выход)"""
        result = await db.execute(
            delete(AdminSession).where(AdminSession.admin_token == admin_token)
        )
        await db.commit()
        
        return result.rowcount > 0
    
    @staticmethod
    async def get_admin_sessions_stats(db: AsyncSession) -> Dict:
        """Возвращает статистику админских сессий"""
        # Активные сессии
        active_result = await db.execute(
            select(AdminSession).where(
                and_(
                    AdminSession.is_active == True,
                    AdminSession.expires_at > datetime.now(timezone.utc)
                )
            )
        )
        active_sessions = active_result.scalars().all()
        
        # Общее количество
        total_result = await db.execute(select(AdminSession))
        total_sessions = len(total_result.scalars().all())
        
        return {
            "active_sessions": len(active_sessions),
            "total_sessions_created": total_sessions,
            "active_sessions_details": [
                {
                    "token": session.admin_token[:20] + "...",
                    "created_at": session.created_at,
                    "expires_at": session.expires_at,
                    "time_left_hours": session.time_left_hours,
                    "ip_address": session.ip_address
                }
                for session in active_sessions
            ]
        }

# Класс для создания временного админского "пользователя"
class TemporaryAdminUser:
    """Временный админский пользователь (не SQLAlchemy модель)"""
    
    def __init__(self, admin_session_data: dict):
        self.id = 0  # Специальный ID для админа
        self.telegram_id = "admin"
        self.username = "admin"
        self.first_name = "Admin"
        self.last_name = "Temporary"
        self.is_active = True
        self.subscription_plan = "enterprise"
        self.created_at = admin_session_data.get("created_at", datetime.now(timezone.utc))
        
        # Дополнительная информация о сессии
        self.admin_token = admin_session_data.get("admin_token")
        self.expires_at = admin_session_data.get("expires_at")
        self.time_left_hours = admin_session_data.get("time_left_hours", 0)
        self.ip_address = admin_session_data.get("ip_address")
    
    def to_dict(self):
        """Преобразует в словарь для API ответов"""
        return {
            "id": self.id,
            "telegram_id": self.telegram_id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "is_active": self.is_active,
            "subscription_plan": self.subscription_plan,
            "profile_type": "admin_temporary",
            "expires_at": self.expires_at,
            "time_left_hours": round(self.time_left_hours, 2),
            "ip_address": self.ip_address
        } 