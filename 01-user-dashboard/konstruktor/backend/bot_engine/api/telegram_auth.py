import hashlib
import hmac
import json
import os
from urllib.parse import unquote
from typing import Optional, Dict, Any


def verify_telegram_auth(init_data: str, bot_token: str) -> Optional[Dict[str, Any]]:
    """
    Проверяет подлинность данных от Telegram Web App
    
    Args:
        init_data: Строка инициализации от Telegram Web App
        bot_token: Токен бота
    
    Returns:
        Словарь с данными пользователя или None, если проверка не прошла
    """
    try:
        # Парсим параметры
        params = {}
        for param in init_data.split('&'):
            key, value = param.split('=', 1)
            params[key] = unquote(value)
        
        # Извлекаем hash для проверки
        received_hash = params.pop('hash', '')
        if not received_hash:
            return None
        
        # Создаем строку для проверки подписи
        check_string = '\n'.join([f"{key}={value}" for key, value in sorted(params.items())])
        
        # Создаем секретный ключ из токена бота
        secret_key = hmac.new(
            key="WebAppData".encode(),
            msg=bot_token.encode(),
            digestmod=hashlib.sha256
        ).digest()
        
        # Вычисляем ожидаемый hash
        expected_hash = hmac.new(
            key=secret_key,
            msg=check_string.encode(),
            digestmod=hashlib.sha256
        ).hexdigest()
        
        # Проверяем подпись
        if not hmac.compare_digest(received_hash, expected_hash):
            return None
        
        # Парсим данные пользователя
        user_data = json.loads(params.get('user', '{}'))
        
        return {
            'id': user_data.get('id'),
            'first_name': user_data.get('first_name'),
            'last_name': user_data.get('last_name'),
            'username': user_data.get('username'),
            'language_code': user_data.get('language_code'),
            'is_premium': user_data.get('is_premium', False)
        }
        
    except Exception as e:
        print(f"Error verifying Telegram auth: {e}")
        return None


def get_current_user_from_init_data(init_data: str) -> Optional[Dict[str, Any]]:
    """
    Извлекает данные текущего пользователя из init_data
    
    Args:
        init_data: Строка инициализации от Telegram Web App
    
    Returns:
        Данные пользователя или None
    """
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not bot_token:
        raise ValueError("TELEGRAM_BOT_TOKEN not set")
    
    return verify_telegram_auth(init_data, bot_token) 