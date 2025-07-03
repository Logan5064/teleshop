from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ContextTypes
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import os
import json


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

# Функция для загрузки URL из config.json
def get_web_app_url():
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config = json.load(f)
            return config.get("web_app_url", "http://localhost:8000")
    except:
        return os.getenv("WEB_APP_URL", "http://localhost:8000")

# URL Web App - читаем из конфигурации
WEB_APP_URL = get_web_app_url()

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
    elif query.data == "back_to_main":
        await handle_back_to_main(query, user)
    elif query.data == "create_shop":
        await handle_create_shop(query, user)

async def handle_my_shop(query, user):
    """Обработка раздела 'Мой магазин'"""
    async with AsyncSessionLocal() as db:
        db_user = await get_user_by_telegram_id(db, user.id)
        if not db_user:
            await query.edit_message_text("Ошибка: пользователь не найден")
            return
        
        # Ищем активный магазин пользователя
        result = await db.execute(
            select(Shop).where(Shop.user_id == db_user.id)
        )
        shop = result.scalar_one_or_none()
        
        if shop:
            # Проверяем готовность магазина
            keyboard = []
            
            if shop.blocks_structure:
                # Если есть блочная структура - показываем кнопку открытия магазина
                keyboard.append([InlineKeyboardButton(
                    "🛍️ Открыть магазин", 
                    web_app=WebAppInfo(url=f"{WEB_APP_URL}/shop/{shop.id}")
                )])
                keyboard.append([InlineKeyboardButton(
                    "🎨 Редактировать дизайн", 
                    web_app=WebAppInfo(url=f"{WEB_APP_URL}/constructor?shop_id={shop.id}")
                )])
                
                text = f"""
🏪 Ваш магазин: {shop.name}

📝 Описание: {shop.description or 'Не указано'}
💰 Валюта: {shop.currency or 'RUB'}
📅 Создан: {shop.created_at.strftime('%d.%m.%Y')}
🔄 Обновлен: {shop.updated_at.strftime('%d.%m.%Y %H:%M') if shop.updated_at else 'не обновлялся'}

✅ Магазин готов к просмотру!
"""
            else:
                # Если блочной структуры нет - показываем кнопку создания дизайна
                keyboard.append([InlineKeyboardButton(
                    "🎨 Создать дизайн", 
                    web_app=WebAppInfo(url=f"{WEB_APP_URL}/constructor?shop_id={shop.id}")
                )])
                
                text = f"""
🏪 Ваш магазин: {shop.name}

📝 Описание: {shop.description or 'Не указано'}
📅 Создан: {shop.created_at.strftime('%d.%m.%Y')}

⚠️ Для магазина еще не создан дизайн. 
Создайте дизайн в конструкторе, чтобы ваш магазин стал доступен покупателям.
"""
            
            keyboard.append([InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")])
            reply_markup = InlineKeyboardMarkup(keyboard)
            
        else:
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
    result = await db.execute(
        select(User).where(User.telegram_id == str(telegram_user.id))
    )
    user = result.scalar_one_or_none()
    
    if not user:
        user = User(
            telegram_id=str(telegram_user.id),
            username=telegram_user.username,
            first_name=telegram_user.first_name,
            last_name=telegram_user.last_name
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    
    return user

async def get_user_by_telegram_id(db: AsyncSession, telegram_user_id: int) -> User:
    """Получает пользователя по telegram_user_id"""
    result = await db.execute(
        select(User).where(User.telegram_id == str(telegram_user_id))
    )
    return result.scalar_one_or_none()

async def handle_back_to_main(query, user):
    """Возврат к главному меню"""
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
    
    await query.edit_message_text(welcome_text, reply_markup=reply_markup)

async def handle_create_shop(query, user):
    """Обработка создания магазина"""
    keyboard = [
        [InlineKeyboardButton(
            "🏪 Создать магазин", 
            web_app=WebAppInfo(url=f"{WEB_APP_URL}/dashboard")
        )],
        [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = """
🏪 Создание нового магазина

Нажмите кнопку ниже, чтобы открыть панель управления и создать новый магазин.
После создания вы сможете настроить дизайн в конструкторе.
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup) 