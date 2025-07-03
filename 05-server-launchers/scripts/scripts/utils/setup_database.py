#!/usr/bin/env python3
"""
Скрипт настройки базы данных для разработки и продакшена
"""

import asyncio
import os
import sys
from dotenv import load_dotenv

# Добавляем корневую директорию в путь
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

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

from shared.utils.database import create_tables, check_database_connection

async def setup_development():
    """Настройка для разработки (SQLite)"""
    print("🔧 Настройка базы данных для РАЗРАБОТКИ")
    print("=" * 50)
    
    # Загружаем переменные окружения
    load_dotenv("shared/config/config.env")
    
    database_url = os.getenv("DATABASE_URL")
    print(f"📂 База данных: {database_url}")
    
    # Проверяем подключение
    print("\n🔄 Проверяем подключение...")
    connection_ok = await check_database_connection()
    
    if connection_ok:
        print("✅ Подключение к базе данных успешно!")
        
        # Создаем таблицы
        print("\n🔄 Создаем таблицы...")
        try:
            await create_tables()
            print("✅ Таблицы созданы успешно!")
            
            print("\n🎉 База данных готова для разработки!")
            print("💡 Можно запускать приложение: python main.py")
            
        except Exception as e:
            print(f"❌ Ошибка создания таблиц: {e}")
            import traceback
            traceback.print_exc()
            
    else:
        print("❌ Не удалось подключиться к базе данных")

async def setup_production():
    """Настройка для продакшена (PostgreSQL)"""
    print("🚀 Настройка базы данных для ПРОДАКШЕНА")
    print("=" * 50)
    
    # Загружаем переменные окружения
    load_dotenv("shared/config/config.env")
    
    database_url = os.getenv("DATABASE_URL")
    print(f"🗄️  База данных: {database_url}")
    
    # Проверяем подключение
    print("\n🔄 Проверяем подключение к PostgreSQL...")
    connection_ok = await check_database_connection()
    
    if connection_ok:
        print("✅ Подключение к PostgreSQL успешно!")
        
        # Создаем таблицы
        print("\n🔄 Создаем таблицы...")
        try:
            await create_tables()
            print("✅ Таблицы созданы успешно!")
            
            print("\n🎉 База данных готова для продакшена!")
            print("💡 Можно запускать приложение: python main.py")
            
        except Exception as e:
            print(f"❌ Ошибка создания таблиц: {e}")
            import traceback
            traceback.print_exc()
            
    else:
        print("❌ Не удалось подключиться к PostgreSQL")
        print("💡 Убедитесь, что IP добавлен в белый список")

async def main():
    print("🏪 TeleShop Constructor - Настройка базы данных")
    print("=" * 60)
    
    while True:
        print("\nВыберите режим:")
        print("1. 🔧 Разработка/Продакшен (PostgreSQL)")
        print("2. ❌ Выход")
        
        choice = input("\nВаш выбор (1-2): ").strip()
        
        if choice == "1":
            await setup_production()
            break
        elif choice == "2":
            print("👋 До свидания!")
            break
        else:
            print("❌ Неверный выбор, попробуйте снова")

if __name__ == "__main__":
    asyncio.run(main()) 