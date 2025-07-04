#!/usr/bin/env python3
"""
🤖 Основной бот TeleShop Constructor для авторизации пользователей
Генерирует временные коды для входа в систему
"""

import os
import asyncio
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from sqlalchemy.ext.asyncio import AsyncSession
from dotenv import load_dotenv

# Импорты (исправленные пути)
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))

# Определяем путь к конфигурации более надежно
# Сначала пробуем найти через main_launcher.py
project_root = current_dir
while project_root != os.path.dirname(project_root):  # До корня диска
    if os.path.exists(os.path.join(project_root, "main_launcher.py")):
        break
    project_root = os.path.dirname(project_root)
else:
    # Если main_launcher.py не найден, используем стандартную структуру папок
    # current_dir = /var/www/teleshop/05-server-launchers/bots
    # нужно получить /var/www/teleshop
    project_root = os.path.dirname(os.path.dirname(current_dir))

config_path = os.path.join(project_root, "05-server-launchers", "config")

# Альтернативный поиск если стандартная структура не найдена
if not os.path.exists(config_path):
    # Попробуем относительный путь
    config_path = os.path.join(current_dir, "..", "config")
    if not os.path.exists(config_path):
        # Последняя попытка - абсолютный путь на сервере
        config_path = "/var/www/teleshop/05-server-launchers/config"
config_env_path = os.path.join(config_path, "shared", "config", "config.env")

# Настройка логирования (СНАЧАЛА)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Проверяем существование конфигурационных файлов
if not os.path.exists(config_env_path):
    logger.warning(f"⚠️ Конфигурационный файл не найден: {config_env_path}")
    # Попробуем альтернативный путь
    alt_config_path = os.path.join(config_path, "shared", "config", "auth_config.env")
    if os.path.exists(alt_config_path):
        config_env_path = alt_config_path
        logger.info(f"✅ Использую альтернативный конфиг: {alt_config_path}")

logger.info(f"📁 Загружаю конфигурацию: {config_env_path}")
load_dotenv(config_env_path)

# Добавляем путь к shared модулям
if os.path.exists(config_path):
    sys.path.insert(0, config_path)
    logger.info(f"✅ Путь к shared модулям добавлен: {config_path}")
else:
    logger.warning(f"⚠️ Путь к shared модулям не найден: {config_path}")

from shared.auth.db_code_auth import DatabaseCodeAuth
from shared.utils.database import AsyncSessionLocal

# Конфигурация
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN") or os.getenv("PLATFORM_BOT_TOKEN") or "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"

if not BOT_TOKEN or BOT_TOKEN == "your-bot-token-here":
    logger.error("❌ TELEGRAM_BOT_TOKEN не найден в конфигурации")
    logger.error("💡 Использую токен по умолчанию")
    BOT_TOKEN = "7503005367:AAF2rrpRUr0TXSKWJZsnlPwtuU-RidYLYos"

class TeleShopAuthBot:
    """Основной бот для авторизации пользователей"""
    
    def __init__(self):
        self.application = Application.builder().token(BOT_TOKEN).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        """Настройка обработчиков команд"""
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(CommandHandler("login", self.login_command))
        self.application.add_handler(CommandHandler("help", self.help_command))
        self.application.add_handler(CallbackQueryHandler(self.button_callback))
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик нажатий на кнопки"""
        query = update.callback_query
        await query.answer()
        
        if query.data == "get_login_code":
            # Вызываем функцию генерации кода
            await self.login_command(update, context)
        elif query.data == "help":
            # Вызываем функцию помощи
            await self.help_command(update, context)

    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик команды /start"""
        user = update.effective_user
        
        welcome_text = f"""
🎉 **Добро пожаловать в TeleShop Constructor!**

Привет, {user.first_name}! 👋

TeleShop Constructor — это SaaS-платформа для создания Telegram магазинов с помощью drag & drop конструктора.

**Что вы можете сделать:**
• 🏪 Создать свой Telegram магазин за 5 минут
• 🎨 Настроить дизайн с помощью конструктора
• 🤖 Подключить своего бота к магазину
• 📊 Отслеживать аналитику и заказы

**Для входа в систему используйте команду /login**
"""
        
        # Создаем клавиатуру (без localhost кнопки)
        keyboard = [
            [InlineKeyboardButton("🔑 Получить код для входа", callback_data="get_login_code")],
            [InlineKeyboardButton("ℹ️ Помощь", callback_data="help")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(
            welcome_text, 
            reply_markup=reply_markup,
            parse_mode='Markdown'
        )
        
        logger.info(f"👤 Пользователь {user.id} ({user.username}) запустил бота")
    
    async def login_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик команды /login - генерация временного кода"""
        # Определяем откуда пришел запрос (сообщение или callback)
        if update.callback_query:
            user = update.callback_query.from_user
            send_method = update.callback_query.edit_message_text
        else:
            user = update.effective_user
            send_method = update.message.reply_text
        
        try:
            # Подготавливаем данные пользователя
            telegram_data = {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
            
            # Создаем временный код в БД
            async with AsyncSessionLocal() as db:
                temp_code = await DatabaseCodeAuth.create_temp_code(
                    telegram_id=str(user.id),
                    telegram_data=telegram_data,
                    db=db
                )
            
            # Отправляем код пользователю
            code_text = f"""
🔑 **Ваш временный код для входа:**

`{temp_code}`

**Важно:**
• Код действует **15 минут**
• Используйте его на странице входа админ-панели
• После входа сессия будет активна **24 часа**
• Никому не передавайте этот код!

_Код автоматически удалится после использования_
"""
            
            await send_method(
                code_text,
                parse_mode='Markdown'
            )
            
            logger.info(f"🔑 Сгенерирован код {temp_code} для пользователя {user.id}")
            
        except Exception as e:
            logger.error(f"❌ Ошибка генерации кода для {user.id}: {e}")
            error_text = "❌ Произошла ошибка при генерации кода. Попробуйте позже."
            await send_method(error_text)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик команды /help"""
        # Определяем откуда пришел запрос
        if update.callback_query:
            send_method = update.callback_query.edit_message_text
        else:
            send_method = update.message.reply_text
            
        help_text = """
📖 **Помощь по TeleShop Constructor**

**Команды:**
• `/start` - Начать работу с ботом
• `/login` - Получить код для входа в систему
• `/help` - Показать эту справку

**Как войти в систему:**
1. Используйте команду `/login` или кнопку выше
2. Скопируйте полученный код
3. Перейдите на страницу входа в админ-панель
4. Введите код на странице входа
5. Готово! Вы в системе на 24 часа

**Поддержка:**
Если у вас есть вопросы, свяжитесь с нашей поддержкой.

**О проекте:**
TeleShop Constructor - это современная SaaS-платформа для создания Telegram магазинов без программирования.
"""
        
        await send_method(help_text, parse_mode='Markdown')
    
    async def test_db_connection(self):
        """Тестирование подключения к БД"""
        try:
            async with AsyncSessionLocal() as db:
                # Простой тест подключения
                result = await db.execute("SELECT 1")
                if result:
                    logger.info("✅ Подключение к БД PostgreSQL работает")
                    return True
        except Exception as e:
            logger.error(f"❌ Ошибка подключения к БД: {e}")
            return False
        return False

    def start_polling(self):
        """Запуск бота в режиме polling"""
        logger.info("🚀 Запуск TeleShop Auth Bot...")
        logger.info("✅ Bot token загружен")
        
        try:
            logger.info("✅ Бот успешно запущен и ожидает сообщения")
            
            # run_polling блокирует выполнение и управляет event loop
            self.application.run_polling(
                poll_interval=1.0,
                timeout=10,
                drop_pending_updates=True
            )
            
        except Exception as e:
            logger.error(f"❌ Ошибка запуска бота: {e}")
            raise
    
    def stop(self):
        """Остановка бота"""
        logger.info("🛑 Остановка бота...")
        if self.application:
            self.application.stop()

# Глобальный экземпляр бота
auth_bot = None

def start_auth_bot():
    """Запуск основного бота для авторизации"""
    global auth_bot
    
    if auth_bot is None:
        auth_bot = TeleShopAuthBot()
    
    auth_bot.start_polling()

def stop_auth_bot():
    """Остановка основного бота"""
    global auth_bot
    
    if auth_bot:
        auth_bot.stop()
        auth_bot = None

if __name__ == "__main__":
    bot = TeleShopAuthBot()
    
    try:
        # Запускаем бота - run_polling сам управляет event loop
        bot.start_polling()
        
    except KeyboardInterrupt:
        logger.info("👋 Бот остановлен пользователем (Ctrl+C)")
    except Exception as e:
        logger.error(f"❌ Фатальная ошибка при запуске: {e}")
    finally:
        logger.info("🏁 Бот завершил работу") 