#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
🤖 TeleShop Auth Bot - ИСПРАВЛЕННАЯ ВЕРСИЯ
Бот для авторизации пользователей через Telegram
"""

import os
import sys
import asyncio
import logging
import signal
from datetime import datetime, timedelta
from pathlib import Path

# Добавляем путь к shared модулям
sys.path.append(str(Path(__file__).parent))

import asyncpg
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from telegram.error import Conflict, NetworkError, TimedOut

# Импорты для работы с БД

# Добавляем путь к shared модулям
import sys
import os

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

from shared.utils.database import ASYNC_DATABASE_URL
from shared.models.auth_models import AuthCode
from shared.auth.db_code_auth import DatabaseCodeAuth

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Конфигурация
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")

# Если токен не найден в переменных окружения, загружаем из конфига
if not BOT_TOKEN or BOT_TOKEN == "your-bot-token-here":
    try:
        # Загружаем токен из auth_config.env
        config_path = os.path.join(project_root, "05-server-launchers", "config", "shared", "config", "auth_config.env")
        if os.path.exists(config_path):
            with open(config_path, 'r', encoding='utf-8') as f:
                for line in f:
                    if line.startswith('TELEGRAM_BOT_TOKEN='):
                        BOT_TOKEN = line.split('=', 1)[1].strip()
                        break
            logger.info("✅ Токен загружен из auth_config.env")
        else:
            logger.error(f"❌ Конфиг не найден: {config_path}")
    except Exception as e:
        logger.error(f"❌ Ошибка загрузки конфига: {e}")

if not BOT_TOKEN or BOT_TOKEN == "your-bot-token-here":
    logger.error("❌ TELEGRAM_BOT_TOKEN не найден ни в переменных окружения, ни в конфиге")
    logger.error("💡 Добавьте TELEGRAM_BOT_TOKEN в 05-server-launchers/config/shared/config/auth_config.env")
    sys.exit(1)

# Исправляем URL для asyncpg (убираем +asyncpg)
DATABASE_URL = ASYNC_DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

# Глобальные переменные
db_auth = None
db_pool = None
application = None

class SingletonBot:
    """Защита от множественного запуска"""
    _instance = None
    _lock_file = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def acquire_lock(self):
        """Захватываем блокировку для предотвращения множественного запуска"""
        try:
            lock_path = Path(__file__).parent / "bot.lock"
            self._lock_file = open(lock_path, 'w')
            self._lock_file.write(str(os.getpid()))
            self._lock_file.flush()
            return True
        except Exception as e:
            logger.error(f"❌ Не удалось захватить блокировку: {e}")
            return False
    
    def release_lock(self):
        """Освобождаем блокировку"""
        if self._lock_file:
            try:
                self._lock_file.close()
                lock_path = Path(__file__).parent / "bot.lock"
                if lock_path.exists():
                    lock_path.unlink()
            except Exception as e:
                logger.error(f"❌ Ошибка освобождения блокировки: {e}")

# Создаем singleton
bot_instance = SingletonBot()

async def init_database():
    """Инициализация подключения к БД"""
    global db_auth, db_pool
    
    try:
        # Создаем пул соединений
        db_pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=5)
        
        # Инициализируем авторизацию
        db_auth = DatabaseCodeAuth()
        
        logger.info("✅ База данных инициализирована")
        return True
        
    except Exception as e:
        logger.error(f"❌ Ошибка подключения к БД: {e}")
        return False

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    # Создаем inline клавиатуру
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
• Нажми кнопку "Получить код"
• Получишь 6-значный код
• Введи его на сайте: http://localhost:3000

⏰ **Код действует 15 минут**
🔒 **Сессия длится 24 часа**
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

🚀 **Как войти в админку:**
1. Отправь `/login` или нажми кнопку "Получить код"
2. Получи 6-значный код
3. Перейди на http://localhost:3000
4. Введи код в форму входа

⚡ **Особенности:**
• Код действует 15 минут
• Сессия длится 24 часа
• Один пользователь = один аккаунт
• Безопасная изоляция данных

🆘 **Проблемы?**
Напиши разработчику: @max_5064
"""
    
    await update.message.reply_text(help_text, parse_mode='Markdown')

async def login_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /login - быстрое получение кода"""
    await generate_code_for_user(update.effective_user, update)

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик нажатий на inline кнопки"""
    query = update.callback_query
    await query.answer()
    
    user = query.from_user
    
    if query.data == "get_code":
        await generate_code_for_user(user, query)
    elif query.data == "help":
        await help_command(update, context)

async def generate_code_for_user(user, update_or_query):
    """Генерация кода авторизации для пользователя"""
    try:
        if not db_auth:
            error_msg = "❌ База данных недоступна. Попробуйте позже."
            if hasattr(update_or_query, 'edit_message_text'):
                await update_or_query.edit_message_text(error_msg)
            else:
                await update_or_query.message.reply_text(error_msg)
            return
        
        # Генерируем код через DatabaseCodeAuth
        code_result = await db_auth.generate_code(
            telegram_id=str(user.id),
            telegram_username=user.username,
            telegram_first_name=user.first_name,
            telegram_last_name=user.last_name
        )
        
        if not code_result or 'code' not in code_result:
            error_msg = "❌ Произошла ошибка при генерации кода. Попробуйте позже."
            if hasattr(update_or_query, 'edit_message_text'):
                await update_or_query.edit_message_text(error_msg)
            else:
                await update_or_query.message.reply_text(error_msg)
            return
        
        code = code_result['code']
        
        # Создаем новую клавиатуру для повторного получения кода
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
🔒 **После входа сессия длится 24 часа**

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
        logger.error(f"❌ Ошибка генерации кода для {user.id}: {e}")
        
        error_msg = "❌ Произошла ошибка при генерации кода. Попробуйте позже."
        try:
            if hasattr(update_or_query, 'edit_message_text'):
                await update_or_query.edit_message_text(error_msg)
            else:
                await update_or_query.message.reply_text(error_msg)
        except Exception as reply_error:
            logger.error(f"❌ Ошибка отправки сообщения об ошибке: {reply_error}")

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик ошибок"""
    logger.error(f"❌ Ошибка обновления: {context.error}")
    
    if isinstance(context.error, (NetworkError, TimedOut)):
        logger.warning("⚠️ Сетевая ошибка, переподключение...")
        await asyncio.sleep(5)

def signal_handler(signum, frame):
    """Обработчик сигналов для graceful shutdown"""
    logger.info(f"📡 Получен сигнал {signum}, завершение работы...")
    bot_instance.release_lock()
    sys.exit(0)

async def main():
    """Главная функция запуска бота"""
    global application
    
    # Проверяем блокировку
    if not bot_instance.acquire_lock():
        logger.error("❌ Бот уже запущен! Завершение.")
        return
    
    # Настраиваем обработчики сигналов
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)
    
    try:
        # Инициализируем БД
        if not await init_database():
            logger.error("❌ Не удалось инициализировать БД")
            return
        
        # Создаем приложение
        application = Application.builder().token(BOT_TOKEN).build()
        
        # Регистрируем обработчики
        application.add_handler(CommandHandler("start", start_command))
        application.add_handler(CommandHandler("help", help_command))
        application.add_handler(CommandHandler("login", login_command))
        application.add_handler(CallbackQueryHandler(button_callback))
        application.add_error_handler(error_handler)
        
        logger.info("✅ Бот успешно запущен и ожидает сообщения")
        
        # Запускаем бота
        await application.run_polling(
            poll_interval=1.0,
            timeout=10,
            bootstrap_retries=3,
            drop_pending_updates=True,
            close_loop=False
        )
        
    except Conflict as e:
        logger.error(f"❌ Конфликт: {e}")
        logger.error("❌ Другая копия бота уже запущена! Остановите её перед запуском новой.")
    except Exception as e:
        logger.error(f"❌ Критическая ошибка: {e}")
    finally:
        # Очистка ресурсов
        if db_pool:
            await db_pool.close()
        bot_instance.release_lock()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("👋 Бот остановлен пользователем")
    except Exception as e:
        logger.error(f"❌ Фатальная ошибка: {e}")
    finally:
        bot_instance.release_lock() 