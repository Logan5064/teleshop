import os
import logging
from typing import Dict, Optional
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import json


# Добавляем путь к shared модулям
import sys
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(current_dir))))  # Возвращаемся к корню проекта
shared_path = os.path.join(project_root, "05-server-launchers", "config")
sys.path.insert(0, shared_path)

from shared.utils.database import AsyncSessionLocal
from shared.models.user import User
from shared.models.shop import Shop
from shared.schemas.user_schemas import UserCreate

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Хранилище активных ботов
active_bots: Dict[str, Application] = {}

class BotManager:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
    
    async def start_bot(self, bot_token: str, bot_id: int):
        """Запускает бот с указанным токеном"""
        if bot_token in active_bots:
            logger.info(f"Бот {bot_token[:10]}... уже запущен")
            return
        
        try:
            # Создаем приложение бота
            application = Application.builder().token(bot_token).build()
            
            # Добавляем обработчики
            application.add_handler(CommandHandler("start", self.create_start_handler(bot_id)))
            application.add_handler(CallbackQueryHandler(self.create_callback_handler(bot_id)))
            
            # Сохраняем в активные боты ПЕРЕД запуском
            active_bots[bot_token] = application
            
            # Запускаем бота
            await application.initialize()
            await application.start()
            await application.updater.start_polling(drop_pending_updates=True)
            
            logger.info(f"✅ Бот {bot_token[:10]}... успешно запущен и слушает сообщения")
            
        except Exception as e:
            logger.error(f"❌ Ошибка запуска бота {bot_token[:10]}...: {e}")
            # Удаляем из активных ботов в случае ошибки
            if bot_token in active_bots:
                del active_bots[bot_token]
            raise
    
    async def stop_bot(self, bot_token: str):
        """Останавливает бот"""
        if bot_token not in active_bots:
            return
        
        try:
            application = active_bots[bot_token]
            
            # Останавливаем polling
            if application.updater.running:
                await application.updater.stop()
            
            # Останавливаем приложение
            if application.running:
                await application.stop()
            
            # Завершаем приложение
            await application.shutdown()
            
            # Удаляем из активных ботов
            del active_bots[bot_token]
            logger.info(f"✅ Бот {bot_token[:10]}... остановлен")
            
        except Exception as e:
            logger.error(f"❌ Ошибка остановки бота {bot_token[:10]}...: {e}")
            # Принудительно удаляем из списка
            if bot_token in active_bots:
                del active_bots[bot_token]
    
    def create_start_handler(self, bot_id: int):
        """Создает обработчик команды /start для конкретного бота"""
        async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
            user = update.effective_user
            
            # Получаем информацию о боте (магазине) из базы данных
            async with AsyncSessionLocal() as db:
                result = await db.execute(
                    select(Shop).where(Shop.id == bot_id)
                )
                bot_info = result.scalar_one_or_none()
                
                if not bot_info:
                    await update.message.reply_text("❌ Магазин не найден в системе")
                    return
                
                # Создаем или получаем пользователя
                await self.create_or_get_user(db, user)
            
            # Парсим кастомные настройки из bot_settings
            custom_colors = {}
            custom_texts = {}
            
            if bot_info.bot_settings:
                try:
                    settings = bot_info.bot_settings
                    if isinstance(settings, str):
                        settings = json.loads(settings)
                    custom_colors = settings.get('colors', {})
                    custom_texts = settings.get('texts', {})
                except:
                    pass
            
            # Формируем URL веб-приложения
            webapp_url = f"{self.base_url}/webapp/{bot_id}"
            
            # Создаем клавиатуру с веб-приложением
            keyboard = [
                [InlineKeyboardButton(
                    "🛍️ Открыть магазин", 
                    web_app=WebAppInfo(url=webapp_url)
                )],
                [InlineKeyboardButton("ℹ️ О магазине", callback_data=f"info_{bot_id}")],
                [InlineKeyboardButton("📞 Поддержка", callback_data=f"support_{bot_id}")]
            ]
            reply_markup = InlineKeyboardMarkup(keyboard)
            
            # Приветственное сообщение
            welcome_text = custom_texts.get('welcome', f"""
🎉 Добро пожаловать в {bot_info.name or 'наш магазин'}, {user.first_name}!

🛍️ Здесь вы можете:
• Просматривать каталог товаров
• Оформлять заказы
• Отслеживать доставку

Нажмите кнопку ниже, чтобы открыть магазин:
""")
            
            await update.message.reply_text(welcome_text, reply_markup=reply_markup)
        
        return start_command
    
    def create_callback_handler(self, bot_id: int):
        """Создает обработчик callback кнопок для конкретного бота"""
        async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
            query = update.callback_query
            await query.answer()
            
            if query.data == f"info_{bot_id}":
                # Получаем информацию о магазине
                async with AsyncSessionLocal() as db:
                    result = await db.execute(
                        select(Shop).where(Shop.id == bot_id)
                    )
                    bot_info = result.scalar_one_or_none()
                    
                    if bot_info:
                        info_text = f"""
ℹ️ Информация о магазине

🏪 Название: {bot_info.name}
🤖 Бот: @{bot_info.bot_username or 'не указан'}
💰 Валюта: {bot_info.currency or 'RUB'}
⚡ Статус: {'Активный' if bot_info.is_bot_active else 'Неактивный'}

Powered by TeleShop 🚀
"""
                        await query.edit_message_text(info_text)
            
            elif query.data == f"support_{bot_id}":
                support_text = """
📞 Поддержка

По всем вопросам обращайтесь:
• Напишите нам в чат
• Или используйте команду /help

Мы всегда готовы помочь! 😊
"""
                await query.edit_message_text(support_text)
        
        return button_callback
    
    async def create_or_get_user(self, db: AsyncSession, telegram_user):
        """Создает или получает пользователя в базе данных"""
        result = await db.execute(
            select(User).where(User.telegram_user_id == telegram_user.id)
        )
        user = result.scalar_one_or_none()
        
        if not user:
            user = User(
                telegram_user_id=telegram_user.id,
                username=telegram_user.username,
                first_name=telegram_user.first_name,
                last_name=telegram_user.last_name,
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)
        
        return user

# Глобальный экземпляр менеджера
bot_manager = BotManager()

async def start_all_active_bots():
    """Запускает всех активных ботов из базы данных"""
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            select(Shop).where(Shop.is_bot_active == True)
        )
        active_bots_list = result.scalars().all()
        
        for bot in active_bots_list:
            try:
                await bot_manager.start_bot(bot.bot_token, bot.id)
            except Exception as e:
                logger.error(f"Не удалось запустить бота {bot.bot_username}: {e}")

async def stop_all_bots():
    """Останавливает всех ботов"""
    for bot_token in list(active_bots.keys()):
        await bot_manager.stop_bot(bot_token) 