#!/usr/bin/env python3
"""
🤖 TeleShop Auth Bot - PostgreSQL версия
Бот для авторизации через Telegram с прямым подключением к PostgreSQL
"""

import os
import asyncio
import logging
import random
import string
from datetime import datetime, timedelta

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
BOT_TOKEN = "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"  # @odnorazki_by_bot

# PostgreSQL конфигурация - наша полная БД
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db',
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

# Глобальные переменные
db_pool = None
auth_manager = None

class PostgreSQLAuthManager:
    """Менеджер авторизации через PostgreSQL"""
    
    def __init__(self, db_pool):
        self.db_pool = db_pool
    
    async def generate_auth_code(self, telegram_id, username=None, first_name=None, last_name=None):
        """Сгенерировать код авторизации"""
        code = ''.join(random.choices(string.digits, k=6))
        expires_at = datetime.now() + timedelta(minutes=15)
        
        async with self.db_pool.acquire() as conn:
            # Создаем/обновляем пользователя
            user_id = await conn.fetchval("""
                INSERT INTO users (telegram_id, username, first_name, last_name)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (telegram_id) DO UPDATE SET
                username = EXCLUDED.username,
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name
                RETURNING id
            """, str(telegram_id), username, first_name, last_name)
            
            # Удаляем старые коды
            await conn.execute("DELETE FROM auth_codes WHERE telegram_id = $1 AND NOT is_used", str(telegram_id))
            
            # Создаем новый код
            await conn.execute("""
                INSERT INTO auth_codes (code, telegram_id, user_id, telegram_username, 
                                      telegram_first_name, telegram_last_name, expires_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            """, code, str(telegram_id), user_id, username, first_name, last_name, expires_at)
            
            return code

async def init_database():
    """Инициализация подключения к PostgreSQL"""
    global db_pool, auth_manager
    
    try:
        # Создаем строку подключения
        dsn = f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"
        
        # Создаем пул соединений
        db_pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10)
        
        # Проверяем подключение
        async with db_pool.acquire() as conn:
            result = await conn.fetchval("SELECT COUNT(*) FROM users")
            logger.info(f"✅ PostgreSQL подключен, пользователей в БД: {result}")
        
        # Инициализируем менеджер авторизации
        auth_manager = PostgreSQLAuthManager(db_pool)
        
        return True
        
    except Exception as e:
        logger.error(f"❌ Ошибка подключения к PostgreSQL: {e}")
        return False

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    keyboard = [[InlineKeyboardButton("🔑 Получить код", callback_data="get_code")]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = f"""
🚀 **TeleShop Constructor**

Привет, {user.first_name}! 

Получи код для входа в админку:
http://localhost:3000

⏰ Код действует 15 минут
"""
    
    await update.message.reply_text(text, reply_markup=reply_markup, parse_mode='Markdown')
    
    logger.info(f"👤 Пользователь {user.id} ({user.username}) запустил бота")

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик нажатий на inline кнопки"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "get_code":
        await generate_code_for_user(query.from_user, query)

async def generate_code_for_user(user, update_or_query):
    """Генерация кода авторизации для пользователя"""
    try:
        if not auth_manager:
            await send_message(update_or_query, "❌ Система недоступна")
            return
        
        # Генерируем код через PostgreSQL
        code = await auth_manager.generate_auth_code(
            telegram_id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name
        )
        
        if not code:
            await send_message(update_or_query, "❌ Ошибка генерации кода")
            return
        
        # Создаем клавиатуру
        keyboard = [[InlineKeyboardButton("🔄 Новый код", callback_data="get_code")]]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        text = f"""
✅ **Код сгенерирован!**

🔑 Код: `{code}`

1. Откройте http://localhost:3000
2. Введите код: `{code}`
3. Нажмите "Войти"

⏰ Действует 15 минут
"""
        
        await send_message(update_or_query, text, reply_markup, parse_mode='Markdown')
        
        logger.info(f"✅ Код {code} для {user.id}")
        
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")
        await send_message(update_or_query, "❌ Ошибка генерации кода")

async def send_message(update_or_query, text, reply_markup=None, parse_mode=None):
    """Универсальная отправка сообщения"""
    try:
        if hasattr(update_or_query, 'edit_message_text'):
            await update_or_query.edit_message_text(text, reply_markup=reply_markup, parse_mode=parse_mode)
        else:
            await update_or_query.message.reply_text(text, reply_markup=reply_markup, parse_mode=parse_mode)
    except Exception as e:
        logger.error(f"❌ Ошибка отправки сообщения: {e}")

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ошибок"""
    logger.error(f"❌ Ошибка в боте: {context.error}")

async def main():
    """Главная функция"""
    logger.info("🤖 Запуск TeleShop Auth Bot (PostgreSQL)")
    
    try:
        # Инициализируем PostgreSQL
        if not await init_database():
            logger.error("❌ Не удалось подключиться к PostgreSQL")
            return
        
        # Создаем приложение
        application = Application.builder().token(BOT_TOKEN).build()
        
        # Регистрируем обработчики
        application.add_handler(CommandHandler("start", start_command))
        application.add_handler(CallbackQueryHandler(button_callback))
        application.add_error_handler(error_handler)
        
        logger.info("✅ Auth Bot запущен и подключен к PostgreSQL")
        logger.info("📊 База данных: ladixoofilad.beget.app")
        logger.info("🔗 Админка: http://localhost:3000")
        
        # Запускаем бота (блокирующая операция)
        await application.run_polling(
            poll_interval=1.0,
            timeout=10,
            drop_pending_updates=True,
            close_loop=False  # Не закрываем event loop автоматически
        )
        
    except Exception as e:
        logger.error(f"❌ Критическая ошибка: {e}")
        raise e
    finally:
        # Закрываем пул соединений
        if db_pool:
            await db_pool.close()
            logger.info("🔌 PostgreSQL соединение закрыто")

if __name__ == "__main__":
    import platform
    import sys
    
    # Создаем новый event loop принудительно
    try:
        # Закрываем существующий loop если есть
        try:
            existing_loop = asyncio.get_event_loop()
            if existing_loop.is_running():
                existing_loop.close()
        except:
            pass
        
        # Создаем полностью новый loop
        new_loop = asyncio.new_event_loop()
        asyncio.set_event_loop(new_loop)
        
        # Запускаем в новом loop
        new_loop.run_until_complete(main())
        
    except KeyboardInterrupt:
        logger.info("👋 Auth Bot остановлен пользователем")
    except Exception as e:
        logger.error(f"❌ Фатальная ошибка: {e}")
    finally:
        # Принудительно закрываем все
        try:
            loop = asyncio.get_event_loop()
            if not loop.is_closed():
                loop.close()
        except:
            pass 