"""
🎯 BotHandlers - Обработчики команд для всех пользовательских ботов
Общая логика для обработки команд /start, сообщений и других действий
"""

import logging
from datetime import datetime
from typing import TYPE_CHECKING
from telegram import Update
from telegram.ext import ContextTypes

if TYPE_CHECKING:
    from .manager import BotManager

logger = logging.getLogger(__name__)

class BotHandlers:
    """Обработчики команд для всех ботов"""
    
    def __init__(self, bot_manager: 'BotManager'):
        self.bot_manager = bot_manager
        self.bot_database = bot_manager.bot_database
        
        logger.info("🎯 BotHandlers инициализированы")
    
    async def handle_start(self, update: Update, context: ContextTypes.DEFAULT_TYPE, shop_id: int):
        """Обработка команды /start"""
        try:
            user = update.effective_user
            
            logger.info(f"👋 Пользователь {user.id} (@{user.username}) начал общение с ботом магазина {shop_id}")
            
            # Записываем пользователя в таблицу bot_subscribers
            await self.bot_database.create_or_update_subscriber(
                shop_id=shop_id,
                telegram_user_id=str(user.id),
                username=user.username,
                first_name=user.first_name,
                last_name=user.last_name,
                language_code=user.language_code
            )
            
            # Получаем информацию о магазине
            shop_info = await self.bot_database.get_shop_info(shop_id)
            shop_name = shop_info.get('name', 'Магазин') if shop_info else 'Магазин'
            
            # Отправляем приветственное сообщение
            welcome_message = f"""
🛍️ Добро пожаловать в {shop_name}!

Я помогу вам:
• 📱 Просмотреть каталог товаров
• 🛒 Сделать заказ
• 📞 Связаться с менеджером

Выберите действие:
/catalog - Посмотреть каталог товаров
/contact - Связаться с нами
/help - Помощь
            """
            
            await update.message.reply_text(welcome_message.strip())
            
        except Exception as e:
            logger.error(f"❌ Ошибка обработки /start для магазина {shop_id}: {e}")
            await update.message.reply_text("Добро пожаловать! Произошла ошибка, но мы уже работаем над её исправлением.")
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE, shop_id: int):
        """Обработка обычных сообщений"""
        try:
            user = update.effective_user
            message_text = update.message.text
            
            logger.info(f"💬 Пользователь {user.id} (@{user.username}) написал боту магазина {shop_id}: {message_text}")
            
            # Обновляем время последнего взаимодействия
            await self.bot_database.update_subscriber_interaction(
                shop_id=shop_id,
                telegram_user_id=str(user.id)
            )
            
            # Простые ответы на популярные вопросы
            message_lower = message_text.lower()
            
            if any(word in message_lower for word in ['каталог', 'товары', 'что есть', 'catalog']):
                await self._handle_catalog_request(update, shop_id)
            elif any(word in message_lower for word in ['контакт', 'связаться', 'менеджер', 'contact']):
                await self._handle_contact_request(update, shop_id)
            elif any(word in message_lower for word in ['помощь', 'help', 'что делать']):
                await self._handle_help_request(update, shop_id)
            else:
                # Общий ответ для неизвестных сообщений
                await update.message.reply_text(
                    "Спасибо за сообщение! 😊\n\n"
                    "Воспользуйтесь командами:\n"
                    "/catalog - Каталог товаров\n"
                    "/contact - Связаться с нами\n"
                    "/help - Помощь"
                )
                
        except Exception as e:
            logger.error(f"❌ Ошибка обработки сообщения для магазина {shop_id}: {e}")
            await update.message.reply_text("Спасибо за сообщение! Мы получили его и скоро ответим.")
    
    async def _handle_catalog_request(self, update: Update, shop_id: int):
        """Обработка запроса каталога"""
        try:
            # Получаем товары из базы данных
            products = await self.bot_database.get_shop_products(shop_id)
            
            if not products:
                await update.message.reply_text(
                    "📦 Каталог товаров пока пуст.\n\n"
                    "Мы активно работаем над его наполнением!\n"
                    "Следите за обновлениями или свяжитесь с нами: /contact"
                )
                return
            
            # Формируем сообщение с товарами
            catalog_text = "🛍️ Каталог товаров:\n\n"
            
            for product in products[:10]:  # Показываем первые 10 товаров
                catalog_text += f"📱 {product['name']}\n"
                if product['price']:
                    catalog_text += f"💰 Цена: {product['price']} руб.\n"
                if product['description']:
                    catalog_text += f"📝 {product['description'][:100]}...\n"
                catalog_text += "\n"
            
            if len(products) > 10:
                catalog_text += f"... и ещё {len(products) - 10} товаров\n\n"
            
            catalog_text += "📞 Для заказа свяжитесь с нами: /contact"
            
            await update.message.reply_text(catalog_text)
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения каталога для магазина {shop_id}: {e}")
            await update.message.reply_text("Каталог временно недоступен. Попробуйте позже.")
    
    async def _handle_contact_request(self, update: Update, shop_id: int):
        """Обработка запроса контактов"""
        try:
            shop_info = await self.bot_database.get_shop_info(shop_id)
            
            contact_text = "📞 Контакты:\n\n"
            
            if shop_info:
                contact_text += f"🏪 {shop_info.get('name', 'Наш магазин')}\n\n"
                
                if shop_info.get('description'):
                    contact_text += f"📝 {shop_info['description']}\n\n"
            
            contact_text += "✉️ Для связи с менеджером:\n"
            contact_text += "• Напишите нам прямо здесь\n"
            contact_text += "• Мы ответим в ближайшее время\n\n"
            contact_text += "⏰ Время работы: пн-пт 9:00-18:00"
            
            await update.message.reply_text(contact_text)
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения контактов для магазина {shop_id}: {e}")
            await update.message.reply_text("Контактная информация временно недоступна.")
    
    async def _handle_help_request(self, update: Update, shop_id: int):
        """Обработка запроса помощи"""
        help_text = """
🤖 Помощь по боту:

📍 Доступные команды:
/start - Главное меню
/catalog - Каталог товаров
/contact - Связаться с нами
/help - Эта справка

💬 Вы также можете:
• Писать нам обычные сообщения
• Задавать вопросы о товарах
• Оформлять заказы

📞 Нужна помощь? Пишите нам!
        """
        
        await update.message.reply_text(help_text.strip()) 