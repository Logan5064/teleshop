#!/usr/bin/env python3
"""
Проверка созданных таблиц в PostgreSQL
"""

import asyncio
import sys
import os
from dotenv import load_dotenv

# Добавляем корневую директорию в путь
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

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
from sqlalchemy import text

async def check_tables():
    print("🗄️  ПРОВЕРКА ТАБЛИЦ В POSTGRESQL")
    print("=" * 60)
    
    async with AsyncSessionLocal() as session:
        # Получаем список таблиц
        result = await session.execute(text("""
            SELECT table_name
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name
        """))
        
        tables = [row[0] for row in result]
        print(f"📊 Найдено таблиц: {len(tables)}")
        print()
        
        for table in tables:
            print(f"📋 {table.upper()}:")
            # Получаем структуру каждой таблицы
            result = await session.execute(text(f"""
                SELECT column_name, data_type, is_nullable, column_default
                FROM information_schema.columns 
                WHERE table_schema = 'public' AND table_name = '{table}'
                ORDER BY ordinal_position
            """))
            
            for row in result:
                col_name, data_type, nullable, default = row
                nullable_mark = "✓" if nullable == "YES" else "✗"
                default_str = f" DEFAULT: {default}" if default else ""
                print(f"   • {col_name} ({data_type}) - NULL: {nullable_mark}{default_str}")
            print()

async def check_needed_tables():
    """Проверяем, какие таблицы нужны для работы проекта"""
    print("🔍 НУЖНЫЕ ТАБЛИЦЫ ДЛЯ ПРОЕКТА:")
    print("=" * 40)
    
    needed_tables = {
        "users": "✅ Пользователи Telegram",
        "shops": "✅ Магазины пользователей", 
        "shop_designs": "✅ Дизайны магазинов",
        "shop_banners": "✅ Баннеры магазинов",
        "shop_navigation": "✅ Навигация магазинов",
        # Таблицы, которые пока не созданы:
        "shop_categories": "❌ Категории товаров (platform)",
        "products": "❌ Товары (platform)", 
        "orders": "❌ Заказы (bot_engine)",
        "analytics": "❌ Аналитика (bot_engine)"
    }
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("""
            SELECT table_name
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name
        """))
        
        existing_tables = {row[0] for row in result}
        
        for table, description in needed_tables.items():
            if table in existing_tables:
                print(f"✅ {table} - {description}")
            else:
                print(f"❌ {table} - {description}")
    
    print()
    print("💡 Вывод:")
    print("   Созданы базовые таблицы для пользователей и дизайна")
    print("   Нужно добавить таблицы для товаров и заказов")

async def main():
    load_dotenv("shared/config/config.env")
    await check_tables()
    await check_needed_tables()

if __name__ == "__main__":
    asyncio.run(main()) 