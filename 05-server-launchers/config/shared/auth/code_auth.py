#!/usr/bin/env python3
"""
🔑 Система авторизации по временным кодам
Простая и понятная схема без Telegram Web App
"""

import random
import string
import time
import hashlib
from typing import Optional, Dict
from datetime import datetime, timedelta
from fastapi import HTTPException, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

# Импорты моделей  
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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

from shared.models.user import User
from shared.utils.database import get_db

# Хранилище временных кодов (в продакшн заменить на Redis)
temp_codes = {}  # {code: {telegram_id, expires_at, used}}

# Хранилище активных сессий (в продакшн заменить на Redis)
active_sessions = {}  # {session_token: {user_id, expires_at}}

class CodeAuth:
    """Класс для работы с авторизацией по кодам"""
    
    @staticmethod
    def generate_temp_code() -> str:
        """Генерирует временный код (6 цифр)"""
        return ''.join(random.choices(string.digits, k=6))
    
    @staticmethod
    def create_temp_code(telegram_id: str) -> str:
        """Создает временный код для пользователя"""
        code = CodeAuth.generate_temp_code()
        
        # Проверяем что код уникален
        while code in temp_codes:
            code = CodeAuth.generate_temp_code()
        
        # Сохраняем код (действует 30 минут)
        temp_codes[code] = {
            "telegram_id": telegram_id,
            "expires_at": datetime.utcnow() + timedelta(minutes=30),
            "used": False,
            "created_at": datetime.utcnow()
        }
        
        print(f"🔑 Создан временный код {code} для пользователя {telegram_id}")
        return code
    
    @staticmethod
    def generate_session_token() -> str:
        """Генерирует токен сессии"""
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        return hashlib.sha256(random_string.encode()).hexdigest()
    
    @staticmethod
    async def verify_code_and_create_session(code: str, db: AsyncSession) -> str:
        """
        Проверяет код и создает сессию
        Возвращает токен сессии
        """
        if code not in temp_codes:
            raise HTTPException(status_code=400, detail="Неверный код")
        
        code_data = temp_codes[code]
        
        # Проверяем что код не использован
        if code_data["used"]:
            raise HTTPException(status_code=400, detail="Код уже использован")
        
        # Проверяем что код не истек
        if datetime.utcnow() > code_data["expires_at"]:
            # Удаляем истекший код
            del temp_codes[code]
            raise HTTPException(status_code=400, detail="Код истек")
        
        # Помечаем код как использованный
        code_data["used"] = True
        
        # Получаем или создаем пользователя
        telegram_id = code_data["telegram_id"]
        user = await CodeAuth._get_or_create_user(telegram_id, db)
        
        # Создаем сессию (12 часов)
        session_token = CodeAuth.generate_session_token()
        active_sessions[session_token] = {
            "user_id": user.id,
            "telegram_id": telegram_id,
            "expires_at": datetime.utcnow() + timedelta(hours=12),
            "created_at": datetime.utcnow()
        }
        
        print(f"✅ Пользователь {telegram_id} авторизован, сессия на 12 часов")
        
        # Удаляем использованный код
        del temp_codes[code]
        
        return session_token
    
    @staticmethod
    async def _get_or_create_user(telegram_id: str, db: AsyncSession) -> User:
        """Получает или создает пользователя"""
        # Ищем существующего пользователя
        result = await db.execute(
            select(User).where(User.telegram_id == telegram_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            # Создаем нового пользователя (минимальные данные)
            user = User(
                telegram_id=telegram_id,
                username=f"user_{telegram_id}",
                is_active=True,
                subscription_plan="free"
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)
            print(f"📝 Создан новый пользователь: {telegram_id}")
        
        return user
    
    @staticmethod
    def verify_session(session_token: str) -> Optional[Dict]:
        """Проверяет активность сессии"""
        if session_token not in active_sessions:
            return None
        
        session_data = active_sessions[session_token]
        
        # Проверяем что сессия не истекла
        if datetime.utcnow() > session_data["expires_at"]:
            # Удаляем истекшую сессию
            del active_sessions[session_token]
            return None
        
        return session_data
    
    @staticmethod
    def cleanup_expired():
        """Очищает истекшие коды и сессии"""
        current_time = datetime.utcnow()
        
        # Удаляем истекшие коды
        expired_codes = [
            code for code, data in temp_codes.items() 
            if current_time > data["expires_at"]
        ]
        for code in expired_codes:
            del temp_codes[code]
        
        # Удаляем истекшие сессии
        expired_sessions = [
            token for token, data in active_sessions.items()
            if current_time > data["expires_at"]
        ]
        for token in expired_sessions:
            del active_sessions[token]
        
        if expired_codes or expired_sessions:
            print(f"🧹 Очищено: {len(expired_codes)} кодов, {len(expired_sessions)} сессий")

# FastAPI Dependency для проверки сессии
async def get_current_user_by_session(
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    FastAPI Dependency для получения текущего пользователя по сессии
    """
    # Получаем токен сессии из cookie или заголовка
    session_token = request.cookies.get("session_token")
    if not session_token:
        # Пробуем получить из заголовка
        session_token = request.headers.get("Authorization")
        if session_token and session_token.startswith("Bearer "):
            session_token = session_token[7:]
    
    if not session_token:
        raise HTTPException(
            status_code=401,
            detail="Требуется авторизация. Получите код в @вашем_боте"
        )
    
    # Проверяем сессию
    session_data = CodeAuth.verify_session(session_token)
    if not session_data:
        raise HTTPException(
            status_code=401,
            detail="Сессия истекла. Получите новый код в @вашем_боте"
        )
    
    # Получаем пользователя из БД
    result = await db.execute(
        select(User).where(User.id == session_data["user_id"])
    )
    user = result.scalar_one_or_none()
    
    if not user:
        raise HTTPException(status_code=401, detail="Пользователь не найден")
    
    return user

# Функции для статистики
def get_auth_stats():
    """Возвращает статистику авторизации"""
    current_time = datetime.utcnow()
    
    active_codes = len([
        code for code, data in temp_codes.items()
        if not data["used"] and current_time <= data["expires_at"]
    ])
    
    active_sessions_count = len([
        token for token, data in active_sessions.items()
        if current_time <= data["expires_at"]
    ])
    
    return {
        "active_codes": active_codes,
        "active_sessions": active_sessions_count,
        "total_codes_generated": len(temp_codes),
        "total_sessions_created": len(active_sessions)
    } 