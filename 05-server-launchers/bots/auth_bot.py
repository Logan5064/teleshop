import os
import asyncio
import logging
from datetime import datetime, timedelta, timezone
from random import randint
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select, Column, Integer, String, DateTime, Boolean
from sqlalchemy.orm import declarative_base

# --- Загрузка переменных окружения ---
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(current_dir))

auth_config_path = os.path.join(project_root, "05-server-launchers", "config", "shared", "config", "auth_config.env")
db_config_path = os.path.join(project_root, "05-server-launchers", "config", "shared", "config", "database.env")

load_dotenv(auth_config_path)
load_dotenv(db_config_path)

# --- Конфигурация ---
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
raw_url = os.getenv("DATABASE_URL")
# Заменяем postgresql на postgresql+asyncpg и экранируем специальные символы в пароле
DATABASE_URL = raw_url.replace("postgresql://", "postgresql+asyncpg://").replace("&", "%26")
CODE_TTL_MINUTES = int(os.getenv("AUTH_CODE_LIFETIME_MINUTES", 30))

# --- Логирование ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- База данных ---
Base = declarative_base()

class AuthCode(Base):
    __tablename__ = "auth_codes"

    id = Column(Integer, primary_key=True)
    code = Column(String, unique=True, nullable=False)
    telegram_id = Column(String, nullable=False)
    telegram_username = Column(String)
    telegram_first_name = Column(String)
    telegram_last_name = Column(String)
    created_at = Column(DateTime(timezone=True), nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    is_used = Column(Boolean, default=False)

# --- SQLAlchemy Async Engine ---
engine = create_async_engine(DATABASE_URL, echo=False, future=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

# --- Генерация кода ---
def generate_code() -> str:
    return f"{randint(100000, 999999)}"

# --- Создание кода в БД ---
async def create_temp_code(telegram_id: str, telegram_data: dict) -> str:
    code = generate_code()
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=CODE_TTL_MINUTES)
    async with AsyncSessionLocal() as session:
        # Проверяем уникальность кода
        while await session.scalar(select(AuthCode).where(AuthCode.code == code)):
            code = generate_code()
        auth_code = AuthCode(
            code=code,
            telegram_id=telegram_id,
            telegram_username=telegram_data.get('username'),
            telegram_first_name=telegram_data.get('first_name'),
            telegram_last_name=telegram_data.get('last_name'),
            created_at=datetime.now(timezone.utc),
            expires_at=expires_at,
            is_used=False
        )
        session.add(auth_code)
        await session.commit()
    logger.info(f"🔑 Сгенерирован код {code} для пользователя {telegram_id}")
    return code

# --- Telegram Bot Handlers ---
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    welcome_text = f"""🎉 **Добро пожаловать в TeleShop Constructor!**\n\nПривет, {user.first_name}! 👋\n\nTeleShop Constructor — это SaaS-платформа для создания Telegram магазинов с помощью drag & drop конструктора.\n\n**Для входа в систему используйте команду /login**"""
    keyboard = [
        [InlineKeyboardButton("🔑 Получить код для входа", callback_data="get_login_code")],
        [InlineKeyboardButton("ℹ️ Помощь", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(welcome_text, reply_markup=reply_markup, parse_mode='Markdown')
    logger.info(f"👤 Пользователь {user.id} ({user.username}) запустил бота")

async def login_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.callback_query:
        user = update.callback_query.from_user
        send_method = update.callback_query.edit_message_text
    else:
        user = update.effective_user
        send_method = update.message.reply_text
    telegram_data = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name
    }
    try:
        code = await create_temp_code(str(user.id), telegram_data)
        code_text = f"""🔑 **Ваш временный код для входа:**\n\n`{code}`\n\n**Важно:**\n• Код действует **{CODE_TTL_MINUTES} минут**\n• Используйте его на странице входа админ-панели\n• После входа сессия будет активна **24 часа**\n• Никому не передавайте этот код!\n\n_Код автоматически удалится после использования_"""
        await send_method(code_text, parse_mode='Markdown')
    except Exception as e:
        logger.error(f"❌ Ошибка генерации кода для {user.id}: {e}")
        await send_method("❌ Произошла ошибка при генерации кода. Попробуйте позже.")

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if update.callback_query:
        send_method = update.callback_query.edit_message_text
    else:
        send_method = update.message.reply_text
    help_text = """📖 **Помощь по TeleShop Constructor**\n\n**Команды:**\n• `/start` - Начать работу с ботом\n• `/login` - Получить код для входа в систему\n• `/help` - Показать эту справку\n\n**Как войти в систему:**\n1. Используйте команду `/login` или кнопку выше\n2. Скопируйте полученный код\n3. Перейдите на страницу входа в админ-панель\n4. Введите код на странице входа\n5. Готово! Вы в системе на 24 часа\n\n**О проекте:**\nTeleShop Constructor - это современная SaaS-платформа для создания Telegram магазинов без программирования."""
    await send_method(help_text, parse_mode='Markdown')

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    if query.data == "get_login_code":
        await login_command(update, context)
    elif query.data == "help":
        await help_command(update, context)

# --- Main ---
def main():
    application = Application.builder().token(BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("login", login_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    logger.info("🚀 Запуск TeleShop Auth Bot (современная версия)...")
    application.run_polling()

if __name__ == "__main__":
    main() 