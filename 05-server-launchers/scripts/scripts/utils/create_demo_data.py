import asyncio
import sys
import os
# Добавляем путь к backend папке  
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))


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

async def create_demo_data():
    print("🎯 Создание демонстрационных данных для конструктора...")
    
    async with AsyncSessionLocal() as session:
        try:
            # 1. Создаем пользователя
            user = User(
                telegram_id="123456789",
                username="demo_user",
                first_name="Демо",
                last_name="Пользователь",
                subscription_plan="pro"
            )
            session.add(user)
            await session.flush()  # Получаем ID пользователя
            
            # 2. Создаем магазин с блочной структурой
            demo_blocks_structure = {
                "blocks": [
                    {
                        "id": "header_1",
                        "type": "header",
                        "order": 0,
                        "data": {
                            "title": "Tamas Living",
                            "subtitle": "Современная мебель для вашего дома",
                            "backgroundColor": "#2c3e50",
                            "textColor": "#ffffff"
                        }
                    },
                    {
                        "id": "products_1",
                        "type": "products", 
                        "order": 1,
                        "data": {
                            "title": "Наши товары",
                            "layout": "grid",
                            "columns": 2
                        }
                    }
                ]
            }
            
            # Получаем токен из environment variables
            demo_bot_token = os.getenv("DEMO_BOT_TOKEN", "DEMO-TOKEN-CHANGE-ME")
            
            shop = Shop(
                user_id=user.id,
                name="Tamas Living - Мебель",
                description="Современная мебель для вашего дома",
                bot_token=demo_bot_token,
                bot_username="teleshop_constructor_bot",
                domain_slug="tamas-living",
                is_published=True,
                is_bot_active=True,
                blocks_structure=demo_blocks_structure
            )
            session.add(shop)
            await session.flush()
            
            # Сохраняем все изменения
            await session.commit()
            
            print("✅ Демонстрационные данные созданы успешно!")
            print(f"👤 Пользователь: {user.first_name} {user.last_name}")
            print(f"🏪 Магазин: {shop.name}")
            print(f"🤖 Бот токен: {shop.bot_token}")
            print(f"🎨 Блочная структура: {len(demo_blocks_structure['blocks'])} блоков")
            
        except Exception as e:
            await session.rollback()
            print(f"❌ Ошибка создания данных: {e}")
            raise

if __name__ == "__main__":
    asyncio.run(create_demo_data()) 