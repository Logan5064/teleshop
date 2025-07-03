#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🤖 TeleShop Simple Auth Bot
Упрощенная версия бота для авторизации
"""

import os
import sys
import asyncio
import logging
import random
import string
from pathlib import Path

# Простые импорты
import asyncpg
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# FastAPI для веб API
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import threading

# Путь к конфигу
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = current_dir
for _ in range(10):
    if os.path.exists(os.path.join(project_root, "main_launcher.py")):
        break
    project_root = os.path.dirname(project_root)

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Загрузка токена
BOT_TOKEN = None
config_path = os.path.join(project_root, "05-server-launchers", "config", "shared", "config", "auth_config.env")

try:
    if os.path.exists(config_path):
        with open(config_path, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('TELEGRAM_BOT_TOKEN='):
                    BOT_TOKEN = line.split('=', 1)[1].strip()
                    break
        if BOT_TOKEN:
            logger.info("✅ Токен загружен из auth_config.env")
except Exception as e:
    logger.error(f"❌ Ошибка загрузки конфига: {e}")

if not BOT_TOKEN:
    logger.error("❌ TELEGRAM_BOT_TOKEN не найден")
    sys.exit(1)

# База данных (упрощенная версия - в памяти)
auth_codes = {}

def generate_code():
    """Генерация 6-значного кода"""
    return ''.join(random.choices(string.digits, k=6))

# FastAPI модели
class CodeVerifyRequest(BaseModel):
    code: str

# FastAPI приложение
app = FastAPI(title="TeleShop Auth Bot API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    """Проверка здоровья API"""
    return {"status": "ok", "bot": "simple_auth_bot"}

@app.post("/api/auth/verify-code")
async def verify_code(request: CodeVerifyRequest):
    """Проверка кода авторизации"""
    code = request.code
    
    logger.info(f"🔍 Проверка кода: {code}")
    
    if code not in auth_codes:
        logger.warning(f"❌ Код не найден: {code}")
        raise HTTPException(status_code=400, detail="Неверный или истекший код")
    
    # Проверяем время действия (15 минут)
    code_data = auth_codes[code]
    current_time = asyncio.get_event_loop().time()
    if current_time - code_data['created_at'] > 900:  # 15 минут
        del auth_codes[code]
        logger.warning(f"⏰ Код истек: {code}")
        raise HTTPException(status_code=400, detail="Код истек")
    
    # Удаляем использованный код
    user_data = auth_codes.pop(code)
    
    logger.info(f"✅ Код подтвержден для пользователя {user_data['user_id']}")
    
    return {
        "success": True,
        "session_token": f"session_{user_data['user_id']}_{random.randint(100000, 999999)}",
        "expires_in": 86400,  # 24 часа
        "message": "Авторизация успешна",
        "user": {
            "telegram_id": user_data['user_id'],
            "username": user_data['username'],
            "first_name": user_data['first_name']
        }
    }

def run_fastapi():
    """Запуск FastAPI сервера"""
    uvicorn.run(app, host="127.0.0.1", port=8080, log_level="info")

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    keyboard = [
        [InlineKeyboardButton("🔑 Получить код для входа", callback_data="get_code")],
        [InlineKeyboardButton("❓ Помощь", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🚀 **Добро пожаловать в TeleShop Constructor!**

Привет, {user.first_name}! 👋

Я помогу тебе войти в админку для создания Telegram магазинов.

🔑 **Для входа:**
• Нажми "Получить код"  
• Получишь 6-значный код
• Введи его на http://localhost:3000

⏰ **Код действует 15 минут**
"""
    
    await update.message.reply_text(
        welcome_text,
        reply_markup=reply_markup,
        parse_mode='Markdown'
    )
    
    logger.info(f"👤 Пользователь {user.id} ({user.username}) запустил бота")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /help"""
    help_text = """
📖 **Справка по TeleShop Auth Bot**

🔑 **Команды:**
• `/start` - Главное меню
• `/login` - Быстрое получение кода
• `/help` - Эта справка

🚀 **Как войти:**
1. Отправь `/login` или нажми "Получить код"
2. Получи 6-значный код
3. Перейди на http://localhost:3000
4. Введи код в форму входа

⚡ **Особенности:**
• Код действует 15 минут
• Безопасная авторизация
• Один код = один вход
"""
    
    await update.message.reply_text(help_text, parse_mode='Markdown')

async def login_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Быстрое получение кода"""
    await generate_code_for_user(update.effective_user, update)

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик кнопок"""
    query = update.callback_query
    await query.answer()
    
    user = query.from_user
    
    if query.data == "get_code":
        await generate_code_for_user(user, query)
    elif query.data == "help":
        await help_command(update, context)

async def generate_code_for_user(user, update_or_query):
    """Генерация кода для пользователя"""
    try:
        # Генерируем код
        code = generate_code()
        
        # Сохраняем в памяти (в реальном проекте - в БД)
        auth_codes[code] = {
            'user_id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'created_at': asyncio.get_event_loop().time()
        }
        
        # Создаем клавиатуру
        keyboard = [
            [InlineKeyboardButton("🔄 Получить новый код", callback_data="get_code")],
            [InlineKeyboardButton("❓ Помощь", callback_data="help")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        success_text = f"""
✅ **Код для входа сгенерирован!**

🔑 **Ваш код:** `{code}`

📋 **Инструкция:**
1. Перейдите на http://localhost:3000
2. Введите код: `{code}`
3. Нажмите "Войти"

⏰ **Код действует 15 минут**

*Никому не сообщайте свой код!*
"""
        
        if hasattr(update_or_query, 'edit_message_text'):
            await update_or_query.edit_message_text(
                success_text,
                reply_markup=reply_markup,
                parse_mode='Markdown'
            )
        else:
            await update_or_query.message.reply_text(
                success_text,
                reply_markup=reply_markup,
                parse_mode='Markdown'
            )
        
        logger.info(f"✅ Код {code} сгенерирован для пользователя {user.id} ({user.username})")
        
    except Exception as e:
        logger.error(f"❌ Ошибка генерации кода: {e}")
        
        error_msg = "❌ Произошла ошибка. Попробуйте позже."
        try:
            if hasattr(update_or_query, 'edit_message_text'):
                await update_or_query.edit_message_text(error_msg)
            else:
                await update_or_query.message.reply_text(error_msg)
        except Exception:
            pass

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ошибок"""
    logger.error(f"❌ Ошибка: {context.error}")

def main():
    """Главная функция"""
    try:
        # Запускаем FastAPI сервер в отдельном потоке
        fastapi_thread = threading.Thread(target=run_fastapi, daemon=True)
        fastapi_thread.start()
        logger.info("✅ FastAPI сервер запущен на порту 8080")
        
        # Создаем приложение
        application = Application.builder().token(BOT_TOKEN).build()
        
        # Регистрируем обработчики
        application.add_handler(CommandHandler("start", start_command))
        application.add_handler(CommandHandler("help", help_command))
        application.add_handler(CommandHandler("login", login_command))
        application.add_handler(CallbackQueryHandler(button_callback))
        application.add_error_handler(error_handler)
        
        logger.info("✅ Simple Auth Bot запущен и ожидает сообщения")
        
        # Запускаем polling (блокирующий вызов)
        application.run_polling(
            poll_interval=1.0,
            timeout=10,
            drop_pending_updates=True
        )
        
    except KeyboardInterrupt:
        logger.info("👋 Бот остановлен пользователем")
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    main() 