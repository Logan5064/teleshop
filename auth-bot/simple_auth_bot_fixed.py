#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import logging
import asyncio
import asyncpg
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Конфигурация
BOT_TOKEN = "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"
WEB_APP_URL = "http://77.73.232.46:3000"

# PostgreSQL настройки
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db', 
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Стартовая команда бота"""
    user = update.effective_user
    
    logger.info(f"🚀 Пользователь {user.first_name} ({user.id}) запустил бота")
    
    try:
        # Подключение к БД
        conn = await asyncpg.connect(**DB_CONFIG)
        
        # Проверяем есть ли пользователь в БД
        user_exists = await conn.fetchval(
            "SELECT COUNT(*) FROM users WHERE telegram_id = $1", 
            str(user.id)
        )
        
        if not user_exists:
            # Создаем нового пользователя
            await conn.execute("""
                INSERT INTO users (telegram_id, username, first_name, last_name, is_active, created_at)
                VALUES ($1, $2, $3, $4, true, NOW())
                ON CONFLICT (telegram_id) DO NOTHING
            """, str(user.id), user.username or '', user.first_name or '', user.last_name or '')
            
            logger.info(f"✅ Создан новый пользователь: {user.first_name}")
        
        await conn.close()
        
    except Exception as e:
        logger.error(f"❌ Ошибка БД: {e}")
        # Продолжаем работу даже если БД недоступна
    
    # Кнопка входа в админку
    keyboard = [
        [InlineKeyboardButton("🚀 Открыть TeleShop Admin", url=WEB_APP_URL)]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🎉 Добро пожаловать в TeleShop, {user.first_name}!

🛍️ Создавайте магазины для Telegram
🎨 Используйте конструктор drag & drop  
📊 Анализируйте продажи
💰 Принимайте платежи

Нажмите кнопку ниже, чтобы начать:
"""
    
    await update.message.reply_text(
        welcome_text,
        reply_markup=reply_markup,
        parse_mode='HTML'
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Команда помощи"""
    help_text = """
📋 <b>Команды TeleShop Bot:</b>

/start - Запуск бота и вход в админку
/help - Показать эту справку
/status - Проверить статус системы

🔗 <b>Ссылки:</b>
• Админка: http://77.73.232.46:3000
• Конструктор: http://77.73.232.46:3001
• API: http://77.73.232.46:8000

❓ <b>Поддержка:</b> @support
"""
    
    await update.message.reply_text(help_text, parse_mode='HTML')

async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Проверка статуса системы"""
    try:
        # Проверяем подключение к БД
        conn = await asyncpg.connect(**DB_CONFIG)
        db_status = "✅ Подключена"
        await conn.close()
    except:
        db_status = "❌ Недоступна"
    
    status_text = f"""
📊 <b>Статус TeleShop:</b>

🤖 Бот: ✅ Работает  
🗄️ База данных: {db_status}
🌐 Админка: http://77.73.232.46:3000
🎨 Конструктор: http://77.73.232.46:3001

Обновлено: {asyncio.get_event_loop().time()}
"""
    
    await update.message.reply_text(status_text, parse_mode='HTML')

def main() -> None:
    """Запуск бота"""
    logger.info("🤖 Запуск TeleShop Auth Bot (Production)")
    
    try:
        # Создаем приложение
        application = Application.builder().token(BOT_TOKEN).build()
        
        # Регистрируем обработчики
        application.add_handler(CommandHandler("start", start))
        application.add_handler(CommandHandler("help", help_command))
        application.add_handler(CommandHandler("status", status_command))
        
        logger.info("✅ TeleShop Auth Bot успешно запущен!")
        
        # Запускаем бота
        application.run_polling(allowed_updates=Update.ALL_TYPES)
        
    except Exception as e:
        logger.error(f"❌ Ошибка запуска бота: {e}")

if __name__ == '__main__':
    main() 