import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

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

from shared.utils.database import AsyncSessionLocal
from shared.models.user import User
from shared.models.shop import Shop
from shared.schemas.user_schemas import UserCreate

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# URL Web App (должен быть настроен в переменных окружения)
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://your-domain.com")


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    # Создаем или получаем пользователя в базе данных
    async with AsyncSessionLocal() as db:
        await create_or_get_user(db, user)
    
    # Создаем клавиатуру с кнопками
    keyboard = [
        [InlineKeyboardButton("🏪 Мой магазин", callback_data="my_shop")],
        [InlineKeyboardButton("🛍️ Просмотр магазинов", callback_data="browse_shops")],
        [InlineKeyboardButton("ℹ️ Помощь", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🎉 Добро пожаловать в Telegram Shops, {user.first_name}!

Здесь вы можете:
• Создать свой собственный онлайн-магазин
• Управлять товарами и заказами
• Просматривать магазины других пользователей

Выберите действие:
"""
    
    await update.message.reply_text(welcome_text, reply_markup=reply_markup)


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик нажатий на inline кнопки"""
    query = update.callback_query
    await query.answer()
    
    user = update.effective_user
    
    if query.data == "my_shop":
        await handle_my_shop(query, user)
    elif query.data == "browse_shops":
        await handle_browse_shops(query)
    elif query.data == "help":
        await handle_help(query)
    elif query.data == "create_shop":
        await handle_create_shop(query, user)
    elif query.data == "manage_shop":
        await handle_manage_shop(query, user)


async def handle_my_shop(query, user):
    """Обработка раздела 'Мой магазин'"""
    async with AsyncSessionLocal() as db:
        # Проверяем, есть ли у пользователя магазин
        db_user = await get_user_by_telegram_id(db, user.id)
        if not db_user:
            await query.edit_message_text("Ошибка: пользователь не найден")
            return
        
        # Ищем активный магазин пользователя
        result = await db.execute(
            select(Shop).where(Shop.owner_id == db_user.id, Shop.is_active == True)
        )
        shop = result.scalar_one_or_none()
        
        if shop:
            # У пользователя есть магазин
            keyboard = [
                [InlineKeyboardButton(
                    "🛠️ Управлять магазином", 
                    web_app=WebAppInfo(url=f"{WEB_APP_URL}/shop/{shop.id}/manage")
                )],
                [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            text = f"""
🏪 Ваш магазин: {shop.name}

📝 Описание: {shop.description or 'Не указано'}
📅 Создан: {shop.created_at.strftime('%d.%m.%Y')}

Нажмите "Управлять магазином" для редактирования товаров и настроек.
"""
        else:
            # У пользователя нет магазина
            keyboard = [
                [InlineKeyboardButton("➕ Создать магазин", callback_data="create_shop")],
                [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            text = """
У вас еще нет магазина. 

Создайте свой первый магазин и начните продавать товары прямо в Telegram!
"""
        
        await query.edit_message_text(text, reply_markup=reply_markup)


async def handle_create_shop(query, user):
    """Обработка создания магазина"""
    keyboard = [
        [InlineKeyboardButton(
            "🏪 Создать магазин", 
            web_app=WebAppInfo(url=f"{WEB_APP_URL}/create-shop")
        )],
        [InlineKeyboardButton("🔙 Назад", callback_data="my_shop")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = """
🏪 Создание нового магазина

Нажмите кнопку ниже, чтобы открыть форму создания магазина. 
Вы сможете указать название, описание и добавить первые товары.
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup)


async def handle_browse_shops(query):
    """Обработка просмотра магазинов"""
    keyboard = [
        [InlineKeyboardButton(
            "🛍️ Открыть каталог", 
            web_app=WebAppInfo(url=f"{WEB_APP_URL}/catalog")
        )],
        [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = """
🛍️ Каталог магазинов

Здесь вы можете просматривать товары от других продавцов и делать заказы.
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup)


async def handle_help(query):
    """Обработка помощи"""
    keyboard = [
        [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = """
ℹ️ Помощь по использованию

🏪 Мой магазин:
- Создайте свой магазин
- Добавляйте товары с фото и описанием
- Получайте уведомления о заказах

🛍️ Просмотр магазинов:
- Просматривайте товары других продавцов
- Делайте заказы одним нажатием

📞 Поддержка: @your_support_bot
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup)


async def create_or_get_user(db: AsyncSession, telegram_user) -> User:
    """Создает или получает пользователя из базы данных"""
    # Ищем пользователя по telegram_user_id
    result = await db.execute(
        select(User).where(User.telegram_user_id == telegram_user.id)
    )
    user = result.scalar_one_or_none()
    
    if not user:
        # Создаем нового пользователя
        user_data = UserCreate(
            telegram_user_id=telegram_user.id,
            username=telegram_user.username,
            first_name=telegram_user.first_name,
            last_name=telegram_user.last_name
        )
        user = User(**user_data.dict())
        db.add(user)
        await db.commit()
        await db.refresh(user)
        logger.info(f"Created new user: {telegram_user.id}")
    
    return user


async def get_user_by_telegram_id(db: AsyncSession, telegram_user_id: int) -> User:
    """Получает пользователя по telegram_user_id"""
    result = await db.execute(
        select(User).where(User.telegram_user_id == telegram_user_id)
    )
    return result.scalar_one_or_none()


async def send_order_notification(shop_owner_telegram_id: int, order_data: dict):
    """Отправляет уведомление о новом заказе владельцу магазина"""
    # Эта функция будет вызываться из API при создании заказа
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not bot_token:
        logger.error("TELEGRAM_BOT_TOKEN not set")
        return
    
    app = Application.builder().token(bot_token).build()
    
    message = f"""
🛒 Новый заказ!

📦 Товар: {order_data['product_name']}
💰 Сумма: {order_data['total_price']} руб.
👤 Покупатель: {order_data['customer_name']}
📞 Контакт: @{order_data['customer_username']}

Свяжитесь с покупателем для уточнения деталей доставки.
"""
    
    try:
        await app.bot.send_message(
            chat_id=shop_owner_telegram_id,
            text=message
        )
    except Exception as e:
        logger.error(f"Failed to send order notification: {e}")


def create_bot_application():
    """Создает и настраивает приложение бота"""
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    if not bot_token:
        raise ValueError("TELEGRAM_BOT_TOKEN not set")
    
    application = Application.builder().token(bot_token).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    
    return application


if __name__ == "__main__":
    app = create_bot_application()
    app.run_polling() 