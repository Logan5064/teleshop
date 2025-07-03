#!/usr/bin/env python3
"""
Скрипт для обновления базы данных - добавление полей для Telegram ботов
"""

import asyncio
# Removed SQLite import - using PostgreSQL only
import sys
import os
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

from shared.utils.database import engine, Base, get_database
from shared.models.shop import Shop
from sqlalchemy import text

async def update_database():
    """Обновление структуры БД для поддержки ботов"""
    
    print("🔄 Обновление базы данных для поддержки Telegram ботов...")
    
    try:
        # Подключаемся к БД
        async with engine.begin() as conn:
            
            # Проверяем какие поля уже есть
            result = await conn.execute(text("PRAGMA table_info(shops)"))
            existing_columns = [row[1] for row in result.fetchall()]
            
            print(f"📋 Существующие поля: {existing_columns}")
            
            # Добавляем новые поля если их нет
            new_fields = [
                ("bot_webhook_url", "VARCHAR"),
                ("is_bot_active", "BOOLEAN DEFAULT 0"),
                ("bot_settings", "JSON")
            ]
            
            for field_name, field_type in new_fields:
                if field_name not in existing_columns:
                    try:
                        query = f"ALTER TABLE shops ADD COLUMN {field_name} {field_type}"
                        await conn.execute(text(query))
                        print(f"✅ Добавлено поле: {field_name}")
                    except Exception as e:
                        print(f"⚠️ Поле {field_name} уже существует или ошибка: {e}")
                else:
                    print(f"⏭️ Поле {field_name} уже существует")
            
            # Создаем индексы для быстрого поиска
            indexes = [
                "CREATE INDEX IF NOT EXISTS idx_shops_bot_token ON shops(bot_token)",
                "CREATE INDEX IF NOT EXISTS idx_shops_bot_username ON shops(bot_username)", 
                "CREATE INDEX IF NOT EXISTS idx_shops_is_bot_active ON shops(is_bot_active)",
                "CREATE INDEX IF NOT EXISTS idx_shops_domain_slug ON shops(domain_slug)"
            ]
            
            for index_query in indexes:
                try:
                    await conn.execute(text(index_query))
                    print(f"✅ Создан индекс")
                except Exception as e:
                    print(f"⚠️ Индекс уже существует: {e}")
            
        print("✅ База данных успешно обновлена!")
        
        # Проверяем финальную структуру
        async with engine.begin() as conn:
            result = await conn.execute(text("PRAGMA table_info(shops)"))
            final_columns = [row[1] for row in result.fetchall()]
            print(f"📋 Финальная структура таблицы shops:")
            for col in final_columns:
                print(f"   - {col}")
                
    except Exception as e:
        print(f"❌ Ошибка обновления БД: {e}")
        raise

async def create_test_data():
    """Создание тестовых данных для разработки"""
    
    print("\n🧪 Создание тестовых данных...")
    
    try:
        async with engine.begin() as conn:
            
            # Создаем тестового пользователя если его нет
            user_check = await conn.execute(text("SELECT id FROM users WHERE telegram_id = 'test_user_123'"))
            if not user_check.fetchone():
                await conn.execute(text("""
                    INSERT INTO users (telegram_id, username, first_name, subscription_plan)
                    VALUES ('test_user_123', 'testuser', 'Test User', 'free')
                """))
                print("✅ Создан тестовый пользователь")
            
            # Получаем ID пользователя
            user_result = await conn.execute(text("SELECT id FROM users WHERE telegram_id = 'test_user_123'"))
            user_id = user_result.fetchone()[0]
            
            # Создаем тестовый магазин если его нет
            shop_check = await conn.execute(text("SELECT id FROM shops WHERE user_id = ? AND name = 'Тестовый магазин'"), (user_id,))
            if not shop_check.fetchone():
                await conn.execute(text("""
                    INSERT INTO shops (
                        user_id, name, description, currency, language,
                        is_published, is_bot_active
                    ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """), (
                    user_id,
                    'Тестовый магазин',
                    'Магазин для тестирования блочной системы',
                    'RUB',
                    'ru',
                    True,
                    False
                ))
                print("✅ Создан тестовый магазин")
                
                # Получаем ID созданного магазина
                shop_result = await conn.execute(text("SELECT id FROM shops WHERE user_id = ? AND name = 'Тестовый магазин'"), (user_id,))
                shop_id = shop_result.fetchone()[0]
                
                # Добавляем тестовую блочную структуру
                test_blocks = {
                    "blocks": [
                        {
                            "id": "block_header_1",
                            "type": "header",
                            "position": 0,
                            "properties": {
                                "title": "Тестовый магазин",
                                "subtitle": "Добро пожаловать в наш магазин!",
                                "primaryColor": "#3182ce",
                                "secondaryColor": "#805ad5"
                            },
                            "created_at": "2024-01-01T00:00:00Z"
                        },
                        {
                            "id": "block_categories_1", 
                            "type": "categories",
                            "position": 1,
                            "properties": {
                                "title": "Категории товаров"
                            },
                            "created_at": "2024-01-01T00:00:00Z"
                        },
                        {
                            "id": "block_products_1",
                            "type": "products", 
                            "position": 2,
                            "properties": {
                                "title": "Наши товары",
                                "columns": 2
                            },
                            "created_at": "2024-01-01T00:00:00Z"
                        }
                    ],
                    "menu": {
                        "style": "modern",
                        "buttons": ["home", "catalog", "cart", "profile"],
                        "color": "#ffffff",
                        "activeColor": "#3182ce"
                    },
                    "updated_at": "2024-01-01T00:00:00Z"
                }
                
                import json
                await conn.execute(text("""
                    UPDATE shops SET blocks_structure = ? WHERE id = ?
                """), (json.dumps(test_blocks), shop_id))
                
                print("✅ Добавлена тестовая блочная структура")
            
        print("✅ Тестовые данные готовы!")
        print(f"🔗 Тестовый магазин: http://localhost:8000/shop/1")
        print(f"🔗 Конструктор: http://localhost:8000/block-constructor/1")
        
    except Exception as e:
        print(f"❌ Ошибка создания тестовых данных: {e}")

async def main():
    """Главная функция"""
    print("🚀 Начинаем обновление базы данных...")
    
    await update_database()
    await create_test_data()
    
    print("\n🎉 Обновление завершено!")
    print("\n📋 Следующие шаги:")
    print("1. Запустите сервер: python -m uvicorn app.main:app --reload")
    print("2. Откройте конструктор: http://localhost:8000/block-constructor/1")
    print("3. Соберите магазин и сохраните")
    print("4. Проверьте результат: http://localhost:8000/shop/1")

if __name__ == "__main__":
    asyncio.run(main()) 