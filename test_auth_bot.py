#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🤖 TeleShop Auth Bot - Тестовая версия для локального запуска
"""

import asyncio
import logging
import threading
import time
from datetime import datetime, timedelta

# FastAPI для API endpoints
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Тестовое хранилище кодов в памяти
auth_codes = {}

def generate_auth_code():
    """Генерация 6-значного кода авторизации"""
    import random
    import string
    return ''.join(random.choices(string.digits, k=6))

def cleanup_expired_codes():
    """Очистка истекших кодов"""
    current_time = time.time()
    expired_codes = [code for code, data in auth_codes.items() 
                     if current_time - data['created_at'] > 900]  # 15 минут
    for code in expired_codes:
        del auth_codes[code]

def save_auth_code_to_memory(telegram_id, username, first_name, last_name, code):
    """Сохранение кода авторизации в памяти"""
    try:
        # Очищаем истекшие коды
        cleanup_expired_codes()
        
        # Удаляем старые коды этого пользователя
        to_remove = [c for c, data in auth_codes.items() if data['telegram_id'] == str(telegram_id)]
        for c in to_remove:
            del auth_codes[c]
        
        # Сохраняем новый код
        auth_codes[code] = {
            'telegram_id': str(telegram_id),
            'telegram_username': username,
            'telegram_first_name': first_name,
            'telegram_last_name': last_name,
            'created_at': time.time(),
            'expires_at': time.time() + 900,  # 15 минут
            'used': False
        }
        
        logger.info(f"✅ Код {code} сохранен для пользователя {telegram_id}")
        return True
        
    except Exception as e:
        logger.error(f"❌ Ошибка сохранения кода: {e}")
        return False

def verify_auth_code_in_memory(code):
    """Проверка и использование кода авторизации"""
    try:
        cleanup_expired_codes()
        
        if code not in auth_codes:
            return None
        
        data = auth_codes[code]
        
        if data['used']:
            return None
        
        if time.time() > data['expires_at']:
            del auth_codes[code]
            return None
        
        # Помечаем код как использованный
        auth_codes[code]['used'] = True
        
        return {
            'telegram_id': data['telegram_id'],
            'telegram_username': data['telegram_username'],
            'telegram_first_name': data['telegram_first_name'],
            'telegram_last_name': data['telegram_last_name']
        }
        
    except Exception as e:
        logger.error(f"❌ Ошибка проверки кода: {e}")
        return None

# FastAPI модели
class CodeVerifyRequest(BaseModel):
    code: str

class CodeVerifyResponse(BaseModel):
    success: bool
    session_token: str = None
    expires_in: int = None
    message: str = None
    user: dict = None

# FastAPI приложение
app = FastAPI(title="TeleShop Auth Bot API (Test)", version="1.0.0")

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://77.73.232.46:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    """Проверка здоровья API"""
    return {
        "status": "ok", 
        "bot": "teleshop_auth_bot_test", 
        "timestamp": datetime.now().isoformat(),
        "codes_count": len(auth_codes)
    }

@app.post("/api/auth/verify-code", response_model=CodeVerifyResponse)
async def verify_code(request: CodeVerifyRequest):
    """Проверка кода авторизации"""
    code = request.code.strip()
    
    logger.info(f"🔍 API: Проверка кода {code}")
    
    if not code or len(code) != 6 or not code.isdigit():
        logger.warning(f"❌ API: Неверный формат кода: {code}")
        raise HTTPException(status_code=400, detail="Код должен состоять из 6 цифр")
    
    # Проверяем код в памяти
    user_data = verify_auth_code_in_memory(code)
    
    if not user_data:
        logger.warning(f"❌ API: Неверный или истекший код: {code}")
        raise HTTPException(status_code=400, detail="Неверный или истекший код авторизации")
    
    # Генерируем session token
    import random
    session_token = f"teleshop_session_{user_data['telegram_id']}_{int(datetime.now().timestamp())}_{random.randint(100000, 999999)}"
    
    logger.info(f"✅ API: Код {code} подтвержден для пользователя {user_data['telegram_id']}")
    
    return CodeVerifyResponse(
        success=True,
        session_token=session_token,
        expires_in=86400,  # 24 часа
        message="Авторизация успешна",
        user={
            "telegram_id": user_data['telegram_id'],
            "username": user_data['telegram_username'],
            "first_name": user_data['telegram_first_name'],
            "last_name": user_data['telegram_last_name']
        }
    )

@app.post("/test/generate-code")
async def test_generate_code():
    """Тестовый эндпоинт для генерации кода"""
    code = generate_auth_code()
    
    success = save_auth_code_to_memory(
        telegram_id="123456789",
        username="test_user",
        first_name="Test",
        last_name="User",
        code=code
    )
    
    if success:
        return {
            "success": True,
            "code": code,
            "message": f"Тестовый код {code} сгенерирован",
            "expires_in": 900  # 15 минут
        }
    else:
        raise HTTPException(status_code=500, detail="Ошибка генерации кода")

if __name__ == "__main__":
    logger.info("🚀 Запуск тестового auth-bot сервера")
    logger.info("🌐 API будет доступен на http://localhost:8080")
    logger.info("📖 Документация API: http://localhost:8080/docs")
    logger.info("🧪 Тестовый эндпоинт: POST http://localhost:8080/test/generate-code")
    
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="info") 