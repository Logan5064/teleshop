#!/usr/bin/env python3
"""
🤖 TeleShop Ultra Simple Auth Bot
Ультрапростая версия - только основные функции
"""

import logging
import random
import string
import time
import asyncio
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота
BOT_TOKEN = "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"

# Хранилище кодов
auth_codes = {}

def generate_code():
    """Генерация кода"""
    return ''.join(random.choices(string.digits, k=6))

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Команда /start"""
    user = update.effective_user
    
    keyboard = [[InlineKeyboardButton("🔑 Код", callback_data="code")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        f"Привет, {user.first_name}!\n🔑 Получи код для входа",
        reply_markup=reply_markup
    )

async def button(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработка кнопки"""
    query = update.callback_query
    await query.answer()
    
    user = query.from_user
    code = generate_code()
    
    # Сохраняем код
    auth_codes[code] = {
        'user_id': user.id,
        'username': user.username or 'noname',
        'first_name': user.first_name or 'User',
        'time': time.time()
    }
    
    keyboard = [[InlineKeyboardButton("🔄 Новый", callback_data="code")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await query.edit_message_text(
        f"✅ Код: {code}\n\n"
        f"Откройте: http://77.73.232.46:3000\n"
        f"Введите код: {code}",
        reply_markup=reply_markup
    )
    
    logger.info(f"Код {code} для {user.id}")

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Обработка ошибок"""
    logger.error(f"Ошибка: {context.error}")

def main():
    """Основная функция"""
    try:
        application = Application.builder().token(BOT_TOKEN).build()
        
        application.add_handler(CommandHandler("start", start))
        application.add_handler(CallbackQueryHandler(button))
        application.add_error_handler(error_handler)
        
        logger.info("✅ Ultra Simple Bot запущен")
        
        # Запуск
        application.run_polling(
            poll_interval=2.0,
            timeout=20,
            drop_pending_updates=True
        )
        
    except Exception as e:
        logger.error(f"Ошибка: {e}")

if __name__ == "__main__":
    main() 