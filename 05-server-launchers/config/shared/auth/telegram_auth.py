#!/usr/bin/env python3
"""
Система авторизации через Telegram Web App
Проверяет подпись и извлекает данные пользователя
"""

import hashlib
import hmac
import json
import time
from urllib.parse import unquote, parse_qsl
from typing import Optional, Dict, Any
from fastapi import HTTPException, Header, Depends
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

# Конфигурация
import os
from dotenv import load_dotenv

# Загружаем конфигурацию
load_dotenv('shared/config/config.env')
load_dotenv('shared/config/auth_config.env')

BOT_TOKEN = os.getenv("PLATFORM_BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")

if BOT_TOKEN == "YOUR_BOT_TOKEN_HERE":
    try:
        print("⚠️ ВНИМАНИЕ: Установите PLATFORM_BOT_TOKEN в shared/config/auth_config.env")
        print("⚠️ Авторизация работать не будет без токена бота!")
    except UnicodeEncodeError:
        print("VNIMANIE: Ustanovite PLATFORM_BOT_TOKEN v shared/config/auth_config.env")
        print("Avtorizaciya rabotat ne budet bez tokena bota!")

AUTH_TOKEN_EXPIRE_HOURS = int(os.getenv("AUTH_TOKEN_EXPIRE_HOURS", "24"))
MAX_ATTEMPTS_PER_HOUR = int(os.getenv("MAX_ATTEMPTS_PER_HOUR", "100"))
SECURITY_LOG_LEVEL = os.getenv("SECURITY_LOG_LEVEL", "INFO")

class TelegramWebAppAuth:
    """Класс для работы с авторизацией Telegram Web App"""
    
    @staticmethod
    def verify_telegram_webapp_data(init_data: str, bot_token: str) -> Dict[str, Any]:
        """
        Проверяет подпись Telegram Web App
        Возвращает данные пользователя если подпись валидна
        """
        try:
            # Парсим данные
            parsed_data = dict(parse_qsl(init_data))
            
            # Извлекаем хэш
            received_hash = parsed_data.pop('hash', None)
            if not received_hash:
                raise ValueError("Отсутствует хэш")
            
            # Сортируем параметры для проверки подписи
            sorted_params = sorted(parsed_data.items())
            data_check_string = '\n'.join([f"{k}={v}" for k, v in sorted_params])
            
            # Создаем ключ из токена бота
            secret_key = hmac.new(
                "WebAppData".encode(), 
                bot_token.encode(), 
                hashlib.sha256
            ).digest()
            
            # Вычисляем ожидаемый хэш
            expected_hash = hmac.new(
                secret_key,
                data_check_string.encode(),
                hashlib.sha256
            ).hexdigest()
            
            # Проверяем подпись
            if not hmac.compare_digest(received_hash, expected_hash):
                raise ValueError("Неверная подпись")
            
            # Проверяем время (данные не должны быть старше 24 часов)
            auth_date = int(parsed_data.get('auth_date', 0))
            current_time = int(time.time())
            if current_time - auth_date > 86400:  # 24 часа
                raise ValueError("Данные авторизации устарели")
            
            # Парсим данные пользователя
            user_data = json.loads(unquote(parsed_data.get('user', '{}')))
            
            return {
                'user': user_data,
                'auth_date': auth_date,
                'query_id': parsed_data.get('query_id'),
                'start_param': parsed_data.get('start_param')
            }
            
        except Exception as e:
            raise HTTPException(
                status_code=401, 
                detail=f"Ошибка авторизации Telegram: {str(e)}"
            )
    
    @staticmethod
    async def get_or_create_user(telegram_data: Dict[str, Any], db: AsyncSession) -> User:
        """
        Получает или создает пользователя из Telegram данных
        """
        user_info = telegram_data['user']
        telegram_id = str(user_info['id'])
        
        # Ищем существующего пользователя
        result = await db.execute(
            select(User).where(User.telegram_id == telegram_id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            # Создаем нового пользователя
            user = User(
                telegram_id=telegram_id,
                username=user_info.get('username'),
                first_name=user_info.get('first_name'),
                last_name=user_info.get('last_name'),
                is_active=True,
                subscription_plan="free"
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)
            try:
                print(f"Создан новый пользователь: {telegram_id}")
            except UnicodeEncodeError:
                print(f"Sozdan novyy polzovatel: {telegram_id}")
        else:
            # Обновляем данные существующего пользователя
            user.username = user_info.get('username')
            user.first_name = user_info.get('first_name') 
            user.last_name = user_info.get('last_name')
            await db.commit()
        
        return user

# Dependency для получения текущего пользователя
async def get_current_user(
    x_telegram_init_data: str = Header(None, alias="X-Telegram-Init-Data"),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    FastAPI Dependency для получения текущего пользователя
    Проверяет Telegram Web App подпись и возвращает пользователя
    """
    if not x_telegram_init_data:
        raise HTTPException(
            status_code=401,
            detail="Отсутствуют данные авторизации Telegram"
        )
    
    # Проверяем подпись Telegram
    telegram_data = TelegramWebAppAuth.verify_telegram_webapp_data(
        x_telegram_init_data, 
        BOT_TOKEN
    )
    
    # Получаем или создаем пользователя
    user = await TelegramWebAppAuth.get_or_create_user(telegram_data, db)
    
    return user

# Альтернативная версия для случаев когда токен может быть разным
async def get_current_user_flexible(
    x_telegram_init_data: str = Header(None, alias="X-Telegram-Init-Data"),
    x_bot_token: str = Header(None, alias="X-Bot-Token"),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Версия с гибким токеном бота
    """
    if not x_telegram_init_data:
        raise HTTPException(status_code=401, detail="Отсутствуют данные авторизации")
    
    bot_token = x_bot_token or BOT_TOKEN
    if not bot_token:
        raise HTTPException(status_code=401, detail="Отсутствует токен бота")
    
    telegram_data = TelegramWebAppAuth.verify_telegram_webapp_data(
        x_telegram_init_data, 
        bot_token
    )
    
    user = await TelegramWebAppAuth.get_or_create_user(telegram_data, db)
    return user

# Dependency для проверки владельца магазина
async def verify_shop_owner(
    shop_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
) -> bool:
    """
    Проверяет, что пользователь является владельцем магазина
    """
    from shared.models.shop import Shop
    
    result = await db.execute(
        select(Shop).where(Shop.id == shop_id, Shop.user_id == current_user.id)
    )
    shop = result.scalar_one_or_none()
    
    if not shop:
        raise HTTPException(
            status_code=403,
            detail="У вас нет доступа к этому магазину"
        )
    
    return True 