import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))


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

from shared.utils.database import AsyncSessionLocal, engine
from sqlalchemy import text

async def check_tables():
    print("📊 Проверка созданных таблиц...")
    
    async with AsyncSessionLocal() as session:
        # Получаем список всех таблиц
        result = await session.execute(text("SELECT tablename FROM pg_tables WHERE schemaname = 'public';"))
        tables = result.fetchall()
        
        print(f"✅ Найдено таблиц: {len(tables)}")
        print("\n📋 Список таблиц:")
        
        for table in tables:
            table_name = table[0]
            print(f"  • {table_name}")
            
            # Подсчитываем записи в каждой таблице
            try:
                count_result = await session.execute(text(f"SELECT COUNT(*) FROM {table_name}"))
                count = count_result.fetchone()[0]
                print(f"    Записей: {count}")
            except Exception as e:
                print(f"    Ошибка подсчета: {e}")
        
        print("\n🎯 Основные таблицы конструктора:")
        constructor_tables = [
            "users", "shops", "shop_designs", "shop_banners", 
            "shop_categories", "products", "shop_navigation", 
            "orders", "analytics"
        ]
        
        existing_tables = [t[0] for t in tables]
        
        for table in constructor_tables:
            status = "✅" if table in existing_tables else "❌"
            print(f"  {status} {table}")

if __name__ == "__main__":
    asyncio.run(check_tables()) 