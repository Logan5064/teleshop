#!/usr/bin/env python3
"""
🤖 Simple TeleShop Auth Bot - Простая версия без asyncio проблем
"""

import logging
import random
import string
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor
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

# PostgreSQL конфигурация
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db',
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

def get_db_connection():
    """Простое подключение к PostgreSQL"""
    return psycopg2.connect(**DB_CONFIG)

def generate_auth_code(telegram_id, username=None, first_name=None, last_name=None):
    """Сгенерировать код авторизации"""
    code = ''.join(random.choices(string.digits, k=6))
    expires_at = datetime.now() + timedelta(minutes=15)
    
    try:
        with get_db_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # Создаем/обновляем пользователя
                cur.execute("""
                    INSERT INTO users (telegram_id, username, first_name, last_name)
                    VALUES (%s, %s, %s, %s)
                    ON CONFLICT (telegram_id) DO UPDATE SET
                        username = EXCLUDED.username,
                        first_name = EXCLUDED.first_name,
                        last_name = EXCLUDED.last_name
                    RETURNING id
                """, (str(telegram_id), username, first_name, last_name))
                
                user_id = cur.fetchone()['id']
                
                # Удаляем старые коды
                cur.execute("DELETE FROM auth_codes WHERE telegram_id = %s AND NOT is_used", (str(telegram_id),))
                
                # Создаем новый код
                cur.execute("""
                    INSERT INTO auth_codes (code, telegram_id, user_id, telegram_username, 
                                          telegram_first_name, telegram_last_name, expires_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """, (code, str(telegram_id), user_id, username, first_name, last_name, expires_at))
                
                conn.commit()
                return code
    except Exception as e:
        logger.error(f"❌ Ошибка БД: {e}")
        return None

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
        user = query.from_user
        
        # Генерируем код
        code = generate_auth_code(
            telegram_id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name
        )
        
        if code:
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
            
            await query.edit_message_text(text, reply_markup=reply_markup, parse_mode='Markdown')
            logger.info(f"✅ Код {code} для {user.id}")
        else:
            await query.edit_message_text("❌ Ошибка генерации кода")

def main():
    """Главная функция"""
    logger.info("🤖 Запуск Simple TeleShop Auth Bot")
    
    try:
        # Проверяем подключение к PostgreSQL
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT COUNT(*) FROM users")
                count = cur.fetchone()[0]
                logger.info(f"✅ PostgreSQL подключен, пользователей в БД: {count}")
        
        # Создаем приложение
        application = Application.builder().token(BOT_TOKEN).build()
        
        # Регистрируем обработчики
        application.add_handler(CommandHandler("start", start_command))
        application.add_handler(CallbackQueryHandler(button_callback))
        
        logger.info("✅ Simple Auth Bot готов к работе")
        logger.info("📊 База данных: ladixoofilad.beget.app")
        logger.info("🔗 Админка: http://localhost:3000")
        logger.info("🤖 Telegram: @odnorazki_by_bot")
        
        # Запускаем polling
        application.run_polling(drop_pending_updates=True)
        
    except Exception as e:
        logger.error(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    main() 