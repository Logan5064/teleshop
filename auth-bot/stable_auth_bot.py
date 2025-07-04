#!/usr/bin/env python3
"""
🤖 TeleShop Stable Auth Bot - Максимально простая версия
"""

import logging
import random
import string
import time
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

# Простое хранилище кодов в памяти
auth_codes = {}

def generate_code():
    """Генерация 6-значного кода"""
    return ''.join(random.choices(string.digits, k=6))

def cleanup_expired_codes():
    """Очистка истекших кодов"""
    current_time = time.time()
    expired_codes = [code for code, data in auth_codes.items() 
                     if current_time - data['created_at'] > 900]  # 15 минут
    for code in expired_codes:
        del auth_codes[code]

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    keyboard = [[InlineKeyboardButton("🔑 Получить код", callback_data="get_code")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = f"""
🚀 **TeleShop Constructor**

Привет, {user.first_name}! 

Получи код для входа в админку:
• http://77.73.232.46:3000

⏰ Код действует 15 минут
"""
    
    await update.message.reply_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    logger.info(f"👤 Пользователь {user.id} запустил бота")

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик нажатий на inline кнопки"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "get_code":
        await generate_code_for_user(query.from_user, query)

async def generate_code_for_user(user, update_or_query):
    """Генерация кода авторизации для пользователя"""
    try:
        # Очистка истекших кодов
        cleanup_expired_codes()
        
        # Генерация кода
        code = generate_code()
        
        # Сохранение в памяти
        auth_codes[code] = {
            'user_id': user.id,
            'username': user.username,
            'first_name': user.first_name,
            'created_at': time.time()
        }
        
        # Клавиатура
        keyboard = [[InlineKeyboardButton("🔄 Новый код", callback_data="get_code")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        text = f"""
✅ **Код сгенерирован!**

🔑 Код: `{code}`

1. Откройте http://77.73.232.46:3000
2. Введите код: `{code}`
3. Нажмите "Войти"

⏰ Действует 15 минут
"""
        
        await update_or_query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
        logger.info(f"✅ Код {code} для {user.id}")
        
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")
        await update_or_query.edit_message_text("❌ Ошибка генерации кода")

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ошибок"""
    logger.error(f"❌ Ошибка в боте: {context.error}")

async def main():
    """Главная функция"""
    logger.info("🤖 Запуск Stable Auth Bot")
    
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    application.add_error_handler(error_handler)
    
    logger.info("✅ Stable Auth Bot запущен")
    
    # Запускаем бота
    await application.run_polling(poll_interval=1.0, timeout=10)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main()) 