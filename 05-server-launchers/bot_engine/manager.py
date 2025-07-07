"""
🤖 BotManager - Центральный контроллер всех пользовательских ботов
Управляет жизненным циклом множественных Telegram ботов
"""

import asyncio
import logging
from typing import Dict, Optional
from telegram import Bot
from telegram.ext import Application, CommandHandler, MessageHandler, filters
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text

from .bot_instance import TelegramBotInstance
from .handlers import BotHandlers
from .database import BotDatabase

logger = logging.getLogger(__name__)

class BotManager:
    """Менеджер всех пользовательских ботов"""
    
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
        self.active_bots: Dict[int, TelegramBotInstance] = {}  # {shop_id: bot_instance}
        self.bot_database = BotDatabase(db_session)
        self.bot_handlers = BotHandlers(self)
        
        logger.info("🤖 BotManager инициализирован")
    
    async def start_bot(self, bot_token: str, shop_id: int) -> bool:
        """Запускает бота для конкретного магазина"""
        try:
            if shop_id in self.active_bots:
                logger.warning(f"⚠️ Бот {shop_id} уже запущен")
                return False
            
            # Создаем экземпляр бота
            bot_instance = TelegramBotInstance(bot_token, shop_id, self.bot_handlers)
            
            # Запускаем бота
            await bot_instance.start()
            
            # Добавляем в активные боты
            self.active_bots[shop_id] = bot_instance
            
            logger.info(f"✅ Бот {shop_id} успешно запущен")
            return True
            
        except Exception as e:
            logger.error(f"❌ Ошибка запуска бота {shop_id}: {e}")
            return False
    
    async def stop_bot(self, shop_id: int) -> bool:
        """Останавливает бота"""
        try:
            if shop_id not in self.active_bots:
                logger.warning(f"⚠️ Бот {shop_id} не найден среди активных")
                return False
            
            # Останавливаем бота
            bot_instance = self.active_bots[shop_id]
            await bot_instance.stop()
            
            # Удаляем из активных ботов
            del self.active_bots[shop_id]
            
            logger.info(f"🛑 Бот {shop_id} остановлен")
            return True
            
        except Exception as e:
            logger.error(f"❌ Ошибка остановки бота {shop_id}: {e}")
            return False
    
    async def get_shop_id_by_token(self, bot_token: str) -> Optional[int]:
        """Получает shop_id по токену бота"""
        try:
            query = text("SELECT id FROM shops WHERE bot_token = :token")
            result = await self.db_session.execute(query, {"token": bot_token})
            row = result.fetchone()
            return row[0] if row else None
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения shop_id: {e}")
            return None
    
    async def load_active_bots(self):
        """Загружает и запускает все активные боты из БД"""
        try:
            query = text("SELECT id, bot_token FROM shops WHERE is_bot_active = true")
            result = await self.db_session.execute(query)
            shops = result.fetchall()
            
            logger.info(f"📊 Найдено активных ботов в БД: {len(shops)}")
            
            for shop in shops:
                shop_id, bot_token = shop
                await self.start_bot(bot_token, shop_id)
                
        except Exception as e:
            logger.error(f"❌ Ошибка загрузки активных ботов: {e}")
    
    async def get_active_bots_count(self) -> int:
        """Возвращает количество активных ботов"""
        return len(self.active_bots)
    
    async def get_bot_info(self, shop_id: int) -> Optional[dict]:
        """Получает информацию о боте"""
        if shop_id not in self.active_bots:
            return None
            
        bot_instance = self.active_bots[shop_id]
        return {
            "shop_id": shop_id,
            "is_active": True,
            "bot_username": bot_instance.bot_username,
            "subscribers_count": await self.bot_database.get_subscribers_count(shop_id)
        }
    
    def is_bot_active(self, shop_id: int) -> bool:
        """Проверяет активен ли бот"""
        return shop_id in self.active_bots
    
    async def shutdown(self):
        """Останавливает все боты при выключении системы"""
        logger.info("🛑 Остановка всех ботов...")
        
        for shop_id in list(self.active_bots.keys()):
            await self.stop_bot(shop_id)
        
        logger.info("✅ Все боты остановлены") 