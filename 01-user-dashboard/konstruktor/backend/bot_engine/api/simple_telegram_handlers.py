#!/usr/bin/env python3
"""
🤖 Упрощенные обработчики Telegram ботов
Работают с simple_api.py и временным хранилищем данных
"""

from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import ContextTypes
import os
import sys
import httpx

# Добавляем путь к проекту
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

# URL нашего API
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:8000/api")
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://lemon-readers-flow.loca.lt")

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Обработчик команды /start"""
    user = update.effective_user
    
    # Создаем клавиатуру с кнопками
    keyboard = [
        [InlineKeyboardButton("🏪 Мой магазин", callback_data="my_shop")],
        [InlineKeyboardButton("🛍️ Каталог", callback_data="browse_shops")],
        [InlineKeyboardButton("ℹ️ Помощь", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🎉 Добро пожаловать в TeleShop, {user.first_name}!

🏪 **Ваш магазин в Telegram** - это просто!

✨ Что вы можете делать:
• Создать красивый магазин за 5 минут
• Добавлять товары с фото и описанием  
• Принимать заказы прямо в чате
• Настраивать дизайн в конструкторе

👇 Выберите действие:
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

async def handle_my_shop(query, user):
    """Обработка раздела 'Мой магазин'"""
    try:
        # Получаем список ботов из API
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{API_BASE_URL}/bots")
            
            if response.status_code != 200:
                raise Exception(f"API Error: {response.status_code}")
            
            bots = response.json()
        
        # Ищем бота для этого пользователя (пока что берем первого)
        # В реальном приложении здесь была бы привязка к telegram_user_id
        if not bots:
            # Нет ботов - предлагаем создать
            keyboard = [
                [InlineKeyboardButton(
                    "➕ Создать магазин", 
                    web_app=WebAppInfo(url=f"{WEB_APP_URL}/dashboard")
                )],
                [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            text = """
🏪 **Создайте свой первый магазин!**

У вас еще нет магазина в нашей системе.

🚀 **Что вас ждет:**
• Современный конструктор с готовыми блоками
• Красивые темы оформления  
• Простое управление товарами
• Уведомления о заказах

👆 Нажмите кнопку выше, чтобы начать!
"""
            
            await query.edit_message_text(text, reply_markup=reply_markup)
            return
        
        # Берем первого бота (в реальном приложении - по user_id)
        shop = bots[0]
        shop_id = shop["id"]
        
        # Проверяем, есть ли дизайн у магазина
        async with httpx.AsyncClient() as client:
            design_response = await client.get(f"{API_BASE_URL}/constructor/shops/{shop_id}/active-design")
            
            has_design = design_response.status_code == 200 and design_response.json() is not None
        
        keyboard = []
        
        if has_design:
            design = design_response.json()
            # Если дизайн есть - показываем кнопку открытия магазина
            keyboard.append([InlineKeyboardButton(
                "🛍️ Открыть магазин", 
                web_app=WebAppInfo(url=f"{WEB_APP_URL}/shop/{shop_id}")
            )])
            keyboard.append([InlineKeyboardButton(
                "🎨 Редактировать дизайн", 
                web_app=WebAppInfo(url=f"{WEB_APP_URL}/constructor?shop_id={shop_id}")
            )])
            
            text = f"""
🏪 **Ваш магазин: {shop['shop_name']}**

📝 Описание: {shop.get('description', 'Добро пожаловать в наш магазин!')}
🎨 Тема: {design.get('theme_name', 'Custom')} 
🎯 Цвет: {design.get('primary_color', '#ff6b35')}
📅 Создан: {shop['created_at'][:10]}

✅ **Магазин готов к работе!**
Покупатели могут просматривать ваши товары и делать заказы.
"""
        else:
            # Если дизайна нет - показываем кнопку создания дизайна
            keyboard.append([InlineKeyboardButton(
                "🎨 Создать дизайн", 
                web_app=WebAppInfo(url=f"{WEB_APP_URL}/constructor?shop_id={shop_id}")
            )])
            
            text = f"""
🏪 **Ваш магазин: {shop['shop_name']}**

📝 Описание: {shop.get('description', 'Добро пожаловать в наш магазин!')}
📅 Создан: {shop['created_at'][:10]}

⚠️ **Дизайн не настроен**

Чтобы ваш магазин стал доступен покупателям, нужно создать дизайн в конструкторе.

🎨 **В конструкторе вы сможете:**
• Выбрать тему оформления
• Настроить цвета и шрифты
• Добавить блоки с товарами
• Настроить навигацию
"""
        
        keyboard.append([InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")])
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(text, reply_markup=reply_markup)
        
    except Exception as e:
        print(f"❌ Ошибка в handle_my_shop: {e}")
        
        keyboard = [
            [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.edit_message_text(
            "😕 Произошла ошибка при загрузке данных магазина.\n\nПопробуйте позже или обратитесь в поддержку.",
            reply_markup=reply_markup
        )

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
🛍️ **Каталог магазинов**

Здесь собраны все активные магазины нашей платформы.

🔍 **Что вы найдете:**
• Товары от проверенных продавцов
• Актуальные цены и наличие
• Быстрое оформление заказов
• Отзывы покупателей

👆 Нажмите кнопку, чтобы начать покупки!
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup)

async def handle_help(query):
    """Обработка помощи"""
    keyboard = [
        [InlineKeyboardButton("🔙 Назад", callback_data="back_to_main")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    text = """
ℹ️ **Помощь по использованию**

🏪 **Мой магазин:**
• Создайте магазин через веб-панель
• Настройте дизайн в конструкторе
• Добавляйте товары с фото и описанием
• Получайте уведомления о заказах

🛍️ **Каталог:**
• Просматривайте товары других продавцов
• Делайте заказы одним нажатием
• Отслеживайте статус заказов

🎨 **Конструктор:**
• Drag & Drop редактор
• Готовые блоки и темы
• Предпросмотр в реальном времени
• Адаптивный дизайн

📞 **Поддержка:** @teleshop_support
🌐 **Сайт:** teleshop.com
"""
    
    await query.edit_message_text(text, reply_markup=reply_markup)

async def handle_back_to_main(query, user):
    """Возврат к главному меню"""
    keyboard = [
        [InlineKeyboardButton("🏪 Мой магазин", callback_data="my_shop")],
        [InlineKeyboardButton("🛍️ Каталог", callback_data="browse_shops")],
        [InlineKeyboardButton("ℹ️ Помощь", callback_data="help")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    welcome_text = f"""
🎉 Добро пожаловать в TeleShop, {user.first_name}!

🏪 **Ваш магазин в Telegram** - это просто!

✨ Что вы можете делать:
• Создать красивый магазин за 5 минут
• Добавлять товары с фото и описанием  
• Принимать заказы прямо в чате
• Настраивать дизайн в конструкторе

👇 Выберите действие:
"""
    
    await query.edit_message_text(welcome_text, reply_markup=reply_markup) 