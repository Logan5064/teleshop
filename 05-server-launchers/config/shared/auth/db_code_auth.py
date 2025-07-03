#!/usr/bin/env python3
"""
🔑 Система авторизации по временным кодам с БД
Работает с PostgreSQL, коды и сессии хранятся в БД
"""

import random
import string
import hashlib
import logging
import traceback
from typing import Optional, Dict
from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, and_

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
from shared.models.auth_models import AuthCode, UserSession, TelegramUserProfile
from shared.utils.database import get_db, AsyncSessionLocal

# ===== НАСТРОЙКА ЛОГИРОВАНИЯ =====
logger = logging.getLogger("auth_system")
logger.setLevel(logging.INFO)

class DatabaseCodeAuth:
    """Класс для работы с авторизацией по кодам через БД"""
    
    @staticmethod
    def generate_temp_code() -> str:
        """Генерирует временный код (6 цифр)"""
        return ''.join(random.choices(string.digits, k=6))
    
    @staticmethod
    async def create_temp_code(telegram_id: str, telegram_data: dict, db: AsyncSession) -> str:
        """
        Создает временный код для пользователя в БД
        telegram_data содержит: username, first_name, last_name
        """
        logger.info(f"🔑 CODE CREATION START | Telegram ID: {telegram_id} | Username: {telegram_data.get('username', 'None')} | Name: {telegram_data.get('first_name', 'None')}")
        
        try:
            # Удаляем старые неиспользованные коды этого пользователя
            old_codes_result = await db.execute(
                delete(AuthCode).where(
                    and_(
                        AuthCode.telegram_id == telegram_id,
                        AuthCode.is_used == False
                    )
                )
            )
            deleted_codes = old_codes_result.rowcount
            if deleted_codes > 0:
                logger.info(f"🧹 OLD CODES CLEANED | Telegram ID: {telegram_id} | Deleted: {deleted_codes}")
            
            # Генерируем уникальный код
            attempts = 0
            max_attempts = 10
            while attempts < max_attempts:
                code = DatabaseCodeAuth.generate_temp_code()
                attempts += 1
                
                # Проверяем уникальность
                result = await db.execute(
                    select(AuthCode).where(AuthCode.code == code)
                )
                if result.scalar_one_or_none() is None:
                    logger.info(f"✅ UNIQUE CODE GENERATED | Code: {code} | Attempts: {attempts}")
                    break
                    
                if attempts >= max_attempts:
                    logger.error(f"❌ CODE GENERATION FAILED | Telegram ID: {telegram_id} | Max attempts reached")
                    raise HTTPException(status_code=500, detail="Не удалось сгенерировать уникальный код")
            
            # Создаем новый код (15 минут жизни)
            current_time = datetime.now(timezone.utc)
            expires_at = current_time + timedelta(minutes=15)
            
            new_code = AuthCode(
                code=code,
                telegram_id=telegram_id,
                telegram_username=telegram_data.get('username'),
                telegram_first_name=telegram_data.get('first_name'),
                telegram_last_name=telegram_data.get('last_name'),
                expires_at=expires_at,
                created_at=current_time  # Явно указываем created_at для надежности
            )
            
            db.add(new_code)
            await db.commit()
            
            logger.info(f"✅ CODE CREATED SUCCESS | Code: {code} | Telegram ID: {telegram_id} | Expires: {expires_at} | Valid for: 15 min")
            
            return code
            
        except HTTPException as e:
            # Переброс HTTP исключений без дополнительной обработки
            raise e
        except Exception as e:
            error_trace = traceback.format_exc()
            logger.error(f"❌ CODE CREATION CRITICAL ERROR | Telegram ID: {telegram_id} | Error: {str(e)}")
            logger.error(f"   Traceback: {error_trace}")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка создания кода")
    
    @staticmethod
    def generate_session_token() -> str:
        """Генерирует токен сессии"""
        random_string = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        return hashlib.sha256(random_string.encode()).hexdigest()
    
    @staticmethod
    async def verify_code_and_create_session(
        code: str, 
        db: AsyncSession,
        ip_address: str = None,
        user_agent: str = None
    ) -> str:
        """
        Проверяет код и создает сессию в БД
        Возвращает токен сессии
        """
        logger.info(f"🔍 CODE VERIFICATION START | Code: {code} | IP: {ip_address} | UA: {user_agent[:50] if user_agent else 'unknown'}...")
        
        try:
            # Найти код в БД
            result = await db.execute(
                select(AuthCode).where(AuthCode.code == code)
            )
            auth_code = result.scalar_one_or_none()
            
            if not auth_code:
                logger.warning(f"❌ CODE NOT FOUND | Code: {code} | IP: {ip_address}")
                raise HTTPException(status_code=400, detail="Неверный код")
            
            logger.info(f"📋 CODE FOUND | Code: {code} | Telegram ID: {auth_code.telegram_id} | Created: {auth_code.created_at} | Expires: {auth_code.expires_at}")
            
            # Проверяем что код валиден
            if not auth_code.is_valid:
                # Удаляем недействительный код
                await db.delete(auth_code)
                await db.commit()
                
                if auth_code.is_used:
                    logger.warning(f"❌ CODE ALREADY USED | Code: {code} | Telegram ID: {auth_code.telegram_id} | Used at: {auth_code.used_at}")
                    raise HTTPException(status_code=400, detail="Код уже использован")
                else:
                    logger.warning(f"❌ CODE EXPIRED | Code: {code} | Telegram ID: {auth_code.telegram_id} | Expired at: {auth_code.expires_at}")
                    raise HTTPException(status_code=400, detail="Код истек")
            
            # Помечаем код как использованный
            auth_code.is_used = True
            auth_code.used_at = datetime.now(timezone.utc)
            logger.info(f"✅ CODE MARKED AS USED | Code: {code} | Telegram ID: {auth_code.telegram_id}")
            
            # Получаем или создаем пользователя
            user = await DatabaseCodeAuth._get_or_create_user(auth_code, db)
            logger.info(f"👤 USER PROCESSED | User ID: {user.id} | Telegram ID: {user.telegram_id} | Username: {user.username}")
            
            # Создаем или обновляем профиль Telegram
            await DatabaseCodeAuth._update_telegram_profile(user, auth_code, db)
            
            # Деактивируем старые сессии пользователя
            old_sessions_result = await db.execute(
                delete(UserSession).where(
                    and_(
                        UserSession.user_id == user.id,
                        UserSession.expires_at < datetime.now(timezone.utc)
                    )
                )
            )
            deleted_sessions = old_sessions_result.rowcount
            if deleted_sessions > 0:
                logger.info(f"🧹 OLD SESSIONS CLEANED | User ID: {user.id} | Deleted: {deleted_sessions}")
            
            # Создаем новую сессию (24 часа)
            session_token = DatabaseCodeAuth.generate_session_token()
            current_time = datetime.now(timezone.utc)
            new_session = UserSession(
                session_token=session_token,
                user_id=user.id,
                telegram_id=auth_code.telegram_id,
                ip_address=ip_address,
                user_agent=user_agent,
                expires_at=current_time + timedelta(hours=24),  # 24 часа вместо 12
                created_at=current_time,      # Явно указываем время создания
                last_activity=current_time   # Явно указываем время последней активности
            )
            
            db.add(new_session)
            await db.commit()
            
            logger.info(f"🎫 SESSION CREATED | User ID: {user.id} | Telegram ID: {auth_code.telegram_id} | Token: {session_token[:20]}... | Expires: 24h")
            
            # Удаляем использованный код
            await db.delete(auth_code)
            await db.commit()
            logger.info(f"🗑️ CODE DELETED | Code: {code} | Telegram ID: {auth_code.telegram_id}")
            
            return session_token
            
        except HTTPException as e:
            # Переброс HTTP исключений без дополнительной обработки
            raise e
        except Exception as e:
            error_trace = traceback.format_exc()
            logger.error(f"❌ CODE VERIFICATION CRITICAL ERROR | Code: {code} | Error: {str(e)}")
            logger.error(f"   Traceback: {error_trace}")
            raise HTTPException(status_code=500, detail="Внутренняя ошибка авторизации")
    
    @staticmethod
    async def _get_or_create_user(auth_code: AuthCode, db: AsyncSession) -> User:
        """Получает или создает пользователя"""
        # Ищем существующего пользователя
        result = await db.execute(
            select(User).where(User.telegram_id == auth_code.telegram_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            # Создаем нового пользователя
            user = User(
                telegram_id=auth_code.telegram_id,
                username=auth_code.telegram_username,
                first_name=auth_code.telegram_first_name,
                last_name=auth_code.telegram_last_name,
                is_active=True,
                subscription_plan="free"
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)
            try:
                print(f"📝 Создан новый пользователь: {auth_code.telegram_id}")
            except UnicodeEncodeError:
                print(f"Sozdan novyy polzovatel: {auth_code.telegram_id}")
        else:
            # Обновляем данные существующего пользователя
            user.username = auth_code.telegram_username
            user.first_name = auth_code.telegram_first_name
            user.last_name = auth_code.telegram_last_name
            await db.commit()
        
        # Обновляем связь с кодом
        auth_code.user_id = user.id
        await db.commit()
        
        return user
    
    @staticmethod
    async def _update_telegram_profile(user: User, auth_code: AuthCode, db: AsyncSession):
        """Создает или обновляет профиль Telegram пользователя"""
        # Ищем существующий профиль
        result = await db.execute(
            select(TelegramUserProfile).where(TelegramUserProfile.user_id == user.id)
        )
        profile = result.scalar_one_or_none()
        
        telegram_data = {
            'username': auth_code.telegram_username,
            'first_name': auth_code.telegram_first_name,
            'last_name': auth_code.telegram_last_name
        }
        
        if not profile:
            # Создаем новый профиль с явным указанием timestamp полей
            current_time = datetime.now(timezone.utc)
            profile = TelegramUserProfile(
                user_id=user.id,
                telegram_id=auth_code.telegram_id,
                username=auth_code.telegram_username,
                first_name=auth_code.telegram_first_name,
                last_name=auth_code.telegram_last_name,
                first_seen=current_time,  # Явно указываем время первого входа
                last_seen=current_time,   # Явно указываем время последнего входа
                total_logins=1            # Первый вход
            )
            db.add(profile)
            logger.info(f"📝 PROFILE CREATED | User ID: {user.id} | Telegram ID: {auth_code.telegram_id} | Username: {auth_code.telegram_username}")
        else:
            # Обновляем существующий профиль
            profile.update_profile(telegram_data)
            logger.info(f"🔄 PROFILE UPDATED | User ID: {user.id} | Telegram ID: {auth_code.telegram_id} | Total logins: {profile.total_logins}")
        
        await db.commit()
    
    @staticmethod
    async def verify_session(session_token: str, db: AsyncSession) -> Optional[Dict]:
        """Проверяет активность сессии в БД"""
        result = await db.execute(
            select(UserSession).where(UserSession.session_token == session_token)
        )
        session = result.scalar_one_or_none()
        
        if not session:
            return None
        
        # Проверяем что сессия валидна
        if not session.is_valid:
            # Удаляем недействительную сессию
            await db.delete(session)
            await db.commit()
            return None
        
        # Обновляем время последней активности
        session.last_activity = datetime.now(timezone.utc)
        await db.commit()
        
        return {
            "user_id": session.user_id,
            "telegram_id": session.telegram_id,
            "expires_at": session.expires_at,
            "ip_address": session.ip_address
        }
    
    @staticmethod
    async def cleanup_expired(db: AsyncSession):
        """Очищает истекшие коды и сессии из БД"""
        current_time = datetime.now(timezone.utc)
        
        # Удаляем истекшие коды
        expired_codes_result = await db.execute(
            delete(AuthCode).where(AuthCode.expires_at < current_time)
        )
        
        # Удаляем истекшие сессии
        expired_sessions_result = await db.execute(
            delete(UserSession).where(UserSession.expires_at < current_time)
        )
        
        await db.commit()
        
        codes_deleted = expired_codes_result.rowcount
        sessions_deleted = expired_sessions_result.rowcount
        
        if codes_deleted > 0 or sessions_deleted > 0:
            try:
                print(f"🧹 Очищено из БД: {codes_deleted} кодов, {sessions_deleted} сессий")
            except UnicodeEncodeError:
                print(f"Ochishcheno iz BD: {codes_deleted} kodov, {sessions_deleted} sessiy")
    
    @staticmethod
    async def logout_session(session_token: str, db: AsyncSession) -> bool:
        """Удаляет сессию (выход пользователя)"""
        result = await db.execute(
            delete(UserSession).where(UserSession.session_token == session_token)
        )
        await db.commit()
        
        return result.rowcount > 0

# FastAPI Dependency для проверки сессии
async def get_current_user_by_session(
    request: Request,
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    FastAPI Dependency для получения текущего пользователя по сессии из БД
    Поддерживает как обычные токены, так и админские токены
    """
    # Получаем токен сессии из cookie или заголовка
    session_token = request.cookies.get("session_token") or request.cookies.get("admin_token")
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
    
    # Проверяем админский токен через новую систему
    if session_token.startswith("admin_"):
        from shared.auth.admin_auth import AdminSessionManager, TemporaryAdminUser
        
        admin_session_data = await AdminSessionManager.verify_admin_session(session_token, db)
        if admin_session_data:
            # Создаем временный админский объект (НЕ SQLAlchemy модель)
            admin_user = TemporaryAdminUser(admin_session_data)
            try:
                print(f"👑 Админский доступ через БД: {session_token[:20]}... (осталось {admin_user.time_left_hours:.1f}ч)")
            except:
                print(f"Admin access via DB: {session_token[:20]}... ({admin_user.time_left_hours:.1f}h left)")
            return admin_user
        else:
            raise HTTPException(status_code=401, detail="Админская сессия истекла или недействительна")
    
    # Обычная проверка пользовательского токена
    # Проверяем сессию в БД
    session_data = await DatabaseCodeAuth.verify_session(session_token, db)
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

def verify_admin_token(token: str) -> bool:
    """Проверка админского токена"""
    if not token or not token.startswith("admin_"):
        return False
    
    try:
        import time
        # Извлекаем временную метку из токена
        parts = token.split("_")
        if len(parts) < 3:
            return False
        
        timestamp = int(parts[1])
        current_time = int(time.time())
        
        # Проверяем что токен не истек (12 часов = 43200 секунд)
        if current_time - timestamp > 43200:
            return False
        
        return True
    except Exception as e:
        try:
            print(f"⚠️ Ошибка проверки админ токена: {e}")
        except:
            print(f"Warning: Admin token verification error")
        return False

# Функции для статистики
async def get_auth_stats(db: AsyncSession):
    """Возвращает статистику авторизации из БД"""
    # Активные коды
    active_codes_result = await db.execute(
        select(AuthCode).where(
            and_(
                AuthCode.is_used == False,
                AuthCode.expires_at > datetime.now(timezone.utc)
            )
        )
    )
    active_codes = len(active_codes_result.scalars().all())
    
    # Активные сессии
    active_sessions_result = await db.execute(
        select(UserSession).where(
            and_(
                UserSession.is_active == True,
                UserSession.expires_at > datetime.now(timezone.utc)
            )
        )
    )
    active_sessions = len(active_sessions_result.scalars().all())
    
    # Общее количество
    total_codes_result = await db.execute(select(AuthCode))
    total_codes = len(total_codes_result.scalars().all())
    
    total_sessions_result = await db.execute(select(UserSession))
    total_sessions = len(total_sessions_result.scalars().all())
    
    return {
        "active_codes": active_codes,
        "active_sessions": active_sessions,
        "total_codes_generated": total_codes,
        "total_sessions_created": total_sessions
    } 