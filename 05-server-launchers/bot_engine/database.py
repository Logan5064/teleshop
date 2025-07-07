"""
🗃️ BotDatabase - Операции с базой данных для пользовательских ботов
Работа с таблицами bot_subscribers, shops, products и другими
"""

import logging
from datetime import datetime
from typing import List, Dict, Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

logger = logging.getLogger(__name__)

class BotDatabase:
    """Класс для работы с базой данных ботов"""
    
    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
        
        logger.info("🗃️ BotDatabase инициализирован")
    
    async def create_or_update_subscriber(
        self, 
        shop_id: int, 
        telegram_user_id: str, 
        username: Optional[str] = None,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        language_code: Optional[str] = None
    ) -> bool:
        """Создает или обновляет подписчика бота"""
        try:
            # Проверяем, существует ли уже подписчик
            check_query = text("""
                SELECT id FROM bot_subscribers 
                WHERE shop_id = :shop_id AND telegram_user_id = :telegram_user_id
            """)
            
            result = await self.db_session.execute(check_query, {
                "shop_id": shop_id,
                "telegram_user_id": telegram_user_id
            })
            
            existing_subscriber = result.fetchone()
            
            if existing_subscriber:
                # Обновляем существующего подписчика
                update_query = text("""
                    UPDATE bot_subscribers 
                    SET username = :username,
                        first_name = :first_name,
                        last_name = :last_name,
                        language_code = :language_code,
                        last_interaction = :last_interaction,
                        is_active = true,
                        updated_at = :updated_at
                    WHERE shop_id = :shop_id AND telegram_user_id = :telegram_user_id
                """)
                
                await self.db_session.execute(update_query, {
                    "shop_id": shop_id,
                    "telegram_user_id": telegram_user_id,
                    "username": username,
                    "first_name": first_name,
                    "last_name": last_name,
                    "language_code": language_code,
                    "last_interaction": datetime.now(),
                    "updated_at": datetime.now()
                })
                
                logger.info(f"📝 Обновлен подписчик {telegram_user_id} для магазина {shop_id}")
                
            else:
                # Создаем нового подписчика
                insert_query = text("""
                    INSERT INTO bot_subscribers (
                        shop_id, telegram_user_id, username, first_name, last_name,
                        language_code, is_active, is_blocked, first_seen, last_interaction, updated_at
                    ) VALUES (
                        :shop_id, :telegram_user_id, :username, :first_name, :last_name,
                        :language_code, true, false, :first_seen, :last_interaction, :updated_at
                    )
                """)
                
                await self.db_session.execute(insert_query, {
                    "shop_id": shop_id,
                    "telegram_user_id": telegram_user_id,
                    "username": username,
                    "first_name": first_name,
                    "last_name": last_name,
                    "language_code": language_code,
                    "first_seen": datetime.now(),
                    "last_interaction": datetime.now(),
                    "updated_at": datetime.now()
                })
                
                logger.info(f"➕ Создан новый подписчик {telegram_user_id} для магазина {shop_id}")
            
            await self.db_session.commit()
            return True
            
        except Exception as e:
            logger.error(f"❌ Ошибка создания/обновления подписчика: {e}")
            await self.db_session.rollback()
            return False
    
    async def update_subscriber_interaction(self, shop_id: int, telegram_user_id: str) -> bool:
        """Обновляет время последнего взаимодействия подписчика"""
        try:
            update_query = text("""
                UPDATE bot_subscribers 
                SET last_interaction = :last_interaction,
                    updated_at = :updated_at
                WHERE shop_id = :shop_id AND telegram_user_id = :telegram_user_id
            """)
            
            await self.db_session.execute(update_query, {
                "shop_id": shop_id,
                "telegram_user_id": telegram_user_id,
                "last_interaction": datetime.now(),
                "updated_at": datetime.now()
            })
            
            await self.db_session.commit()
            return True
            
        except Exception as e:
            logger.error(f"❌ Ошибка обновления времени взаимодействия: {e}")
            await self.db_session.rollback()
            return False
    
    async def get_subscribers_count(self, shop_id: int) -> int:
        """Получает количество подписчиков бота"""
        try:
            count_query = text("""
                SELECT COUNT(*) FROM bot_subscribers 
                WHERE shop_id = :shop_id AND is_active = true
            """)
            
            result = await self.db_session.execute(count_query, {"shop_id": shop_id})
            count = result.fetchone()[0]
            
            return count or 0
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения количества подписчиков: {e}")
            return 0
    
    async def get_shop_info(self, shop_id: int) -> Optional[Dict[str, Any]]:
        """Получает информацию о магазине"""
        try:
            shop_query = text("""
                SELECT id, name, description, bot_username, created_at, updated_at
                FROM shops 
                WHERE id = :shop_id
            """)
            
            result = await self.db_session.execute(shop_query, {"shop_id": shop_id})
            shop = result.fetchone()
            
            if shop:
                return {
                    "id": shop.id,
                    "name": shop.name,
                    "description": shop.description,
                    "bot_username": shop.bot_username,
                    "created_at": shop.created_at,
                    "updated_at": shop.updated_at
                }
            
            return None
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения информации о магазине: {e}")
            return None
    
    async def get_shop_products(self, shop_id: int) -> List[Dict[str, Any]]:
        """Получает товары магазина"""
        try:
            products_query = text("""
                SELECT id, name, description, price, image_url, category_id, is_active
                FROM products 
                WHERE shop_id = :shop_id AND is_active = true
                ORDER BY created_at DESC
                LIMIT 50
            """)
            
            result = await self.db_session.execute(products_query, {"shop_id": shop_id})
            products = result.fetchall()
            
            return [
                {
                    "id": product.id,
                    "name": product.name,
                    "description": product.description,
                    "price": product.price,
                    "image_url": product.image_url,
                    "category_id": product.category_id,
                    "is_active": product.is_active
                }
                for product in products
            ]
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения товаров магазина: {e}")
            return []
    
    async def get_shop_categories(self, shop_id: int) -> List[Dict[str, Any]]:
        """Получает категории магазина"""
        try:
            categories_query = text("""
                SELECT id, name, description, is_active
                FROM categories 
                WHERE shop_id = :shop_id AND is_active = true
                ORDER BY name
            """)
            
            result = await self.db_session.execute(categories_query, {"shop_id": shop_id})
            categories = result.fetchall()
            
            return [
                {
                    "id": category.id,
                    "name": category.name,
                    "description": category.description,
                    "is_active": category.is_active
                }
                for category in categories
            ]
            
        except Exception as e:
            logger.error(f"❌ Ошибка получения категорий магазина: {e}")
            return []
    
    async def create_order(self, shop_id: int, telegram_user_id: str, items: List[Dict]) -> Optional[int]:
        """Создает заказ в магазине"""
        try:
            # Получаем ID подписчика
            subscriber_query = text("""
                SELECT id FROM bot_subscribers 
                WHERE shop_id = :shop_id AND telegram_user_id = :telegram_user_id
            """)
            
            result = await self.db_session.execute(subscriber_query, {
                "shop_id": shop_id,
                "telegram_user_id": telegram_user_id
            })
            
            subscriber = result.fetchone()
            if not subscriber:
                logger.error(f"❌ Подписчик {telegram_user_id} не найден для магазина {shop_id}")
                return None
            
            # Создаем заказ
            order_query = text("""
                INSERT INTO orders (shop_id, customer_id, status, total_amount, created_at, updated_at)
                VALUES (:shop_id, :customer_id, 'pending', :total_amount, :created_at, :updated_at)
                RETURNING id
            """)
            
            total_amount = sum(item.get('price', 0) * item.get('quantity', 1) for item in items)
            
            result = await self.db_session.execute(order_query, {
                "shop_id": shop_id,
                "customer_id": subscriber.id,
                "total_amount": total_amount,
                "created_at": datetime.now(),
                "updated_at": datetime.now()
            })
            
            order_id = result.fetchone()[0]
            
            # Добавляем товары в заказ
            for item in items:
                order_item_query = text("""
                    INSERT INTO order_items (order_id, product_id, quantity, price)
                    VALUES (:order_id, :product_id, :quantity, :price)
                """)
                
                await self.db_session.execute(order_item_query, {
                    "order_id": order_id,
                    "product_id": item.get('product_id'),
                    "quantity": item.get('quantity', 1),
                    "price": item.get('price', 0)
                })
            
            await self.db_session.commit()
            logger.info(f"✅ Создан заказ {order_id} для магазина {shop_id}")
            
            return order_id
            
        except Exception as e:
            logger.error(f"❌ Ошибка создания заказа: {e}")
            await self.db_session.rollback()
            return None 