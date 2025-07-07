"""
🤖 TelegramBotInstance - Класс для управления отдельным Telegram ботом
Инкапсулирует логику работы с одним ботом клиента
"""

import logging
from typing import Optional
from telegram import Bot
from telegram.ext import Application, CommandHandler, MessageHandler, filters

logger = logging.getLogger(__name__)

class TelegramBotInstance:
    """Экземпляр отдельного Telegram бота"""
    
    def __init__(self, bot_token: str, shop_id: int, handlers):
        self.bot_token = bot_token
        self.shop_id = shop_id
        self.handlers = handlers
        self.bot: Optional[Bot] = None
        self.application: Optional[Application] = None
        self.bot_username: Optional[str] = None
        self.is_running = False
        
        logger.info(f"🤖 Создан экземпляр бота для магазина {shop_id}")
    
    async def start(self):
        """Запускает бота"""
        try:
            # Создаем бота
            self.bot = Bot(token=self.bot_token)
            
            # Получаем информацию о боте
            bot_info = await self.bot.get_me()
            self.bot_username = bot_info.username
            
            # Создаем приложение
            self.application = Application.builder().token(self.bot_token).build()
            
            # Добавляем обработчики команд
            self.application.add_handler(
                CommandHandler("start", self._handle_start)
            )
            self.application.add_handler(
                MessageHandler(filters.TEXT & ~filters.COMMAND, self._handle_message)
            )
            
            # Инициализируем и запускаем приложение
            await self.application.initialize()
            await self.application.start()
            await self.application.updater.start_polling()
            
            self.is_running = True
            logger.info(f"✅ Бот @{self.bot_username} (магазин {self.shop_id}) запущен")
            
        except Exception as e:
            logger.error(f"❌ Ошибка запуска бота {self.shop_id}: {e}")
            raise
    
    async def stop(self):
        """Останавливает бота"""
        try:
            if self.application and self.is_running:
                await self.application.updater.stop()
                await self.application.stop()
                await self.application.shutdown()
            
            self.is_running = False
            logger.info(f"🛑 Бот @{self.bot_username} (магазин {self.shop_id}) остановлен")
            
        except Exception as e:
            logger.error(f"❌ Ошибка остановки бота {self.shop_id}: {e}")
            raise
    
    async def _handle_start(self, update, context):
        """Обработчик команды /start"""
        try:
            await self.handlers.handle_start(update, context, self.shop_id)
        except Exception as e:
            logger.error(f"❌ Ошибка обработки /start для бота {self.shop_id}: {e}")
            await update.message.reply_text("Произошла ошибка. Попробуйте позже.")
    
    async def _handle_message(self, update, context):
        """Обработчик обычных сообщений"""
        try:
            await self.handlers.handle_message(update, context, self.shop_id)
        except Exception as e:
            logger.error(f"❌ Ошибка обработки сообщения для бота {self.shop_id}: {e}")
            await update.message.reply_text("Произошла ошибка. Попробуйте позже.")
    
    async def send_message(self, chat_id: int, text: str):
        """Отправляет сообщение от имени бота"""
        try:
            if self.bot:
                await self.bot.send_message(chat_id=chat_id, text=text)
        except Exception as e:
            logger.error(f"❌ Ошибка отправки сообщения ботом {self.shop_id}: {e}")
            raise
    
    def get_status(self) -> dict:
        """Возвращает статус бота"""
        return {
            "shop_id": self.shop_id,
            "bot_username": self.bot_username,
            "is_running": self.is_running,
            "bot_token": self.bot_token[:8] + "..." if self.bot_token else None
        } 