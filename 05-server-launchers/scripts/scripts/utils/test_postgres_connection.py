#!/usr/bin/env python3
"""
Тест подключения к PostgreSQL с данными от Beget
"""

import asyncio
import psycopg2
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from dotenv import load_dotenv
import os

# Данные подключения от Beget
DB_CONFIGS = {
    "external": {
        "host": "ladixoofilad.beget.app",
        "port": 5432,
        "database": "default_db", 
        "user": "cloud_user",
        "password": "u61e&ke&!Ty1"
    },
    "private": {
        "host": "10.16.0.1",
        "port": 5432,
        "database": "default_db", 
        "user": "cloud_user",
        "password": "u61e&ke&!Ty1"
    }
}

async def test_async_connection():
    """Тест асинхронного подключения через SQLAlchemy"""
    print("🔄 Тестируем асинхронное подключение...")
    
    # Формируем URL для asyncpg
    db_url = f"postgresql+asyncpg://{DB_CONFIGS['external']['user']}:{DB_CONFIGS['external']['password']}@{DB_CONFIGS['external']['host']}:{DB_CONFIGS['external']['port']}/{DB_CONFIGS['external']['database']}"
    
    try:
        engine = create_async_engine(db_url, echo=False)
        
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT version()"))
            version = result.fetchone()
            print(f"✅ Асинхронное подключение успешно!")
            print(f"📋 Версия PostgreSQL: {version[0]}")
            
        await engine.dispose()
        return True
        
    except Exception as e:
        print(f"❌ Ошибка асинхронного подключения: {e}")
        return False

def test_sync_connection():
    """Тест синхронного подключения через psycopg2"""
    print("\n🔄 Тестируем синхронное подключение...")
    
    try:
        conn = psycopg2.connect(
            host=DB_CONFIGS["external"]["host"],
            port=DB_CONFIGS["external"]["port"],
            database=DB_CONFIGS["external"]["database"],
            user=DB_CONFIGS["external"]["user"],
            password=DB_CONFIGS["external"]["password"]
        )
        
        cursor = conn.cursor()
        cursor.execute("SELECT version()")
        version = cursor.fetchone()
        
        print(f"✅ Синхронное подключение успешно!")
        print(f"📋 Версия PostgreSQL: {version[0]}")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Ошибка синхронного подключения: {e}")
        return False

async def test_private_connection():
    """Тест подключения через приватный IP"""
    print("\n🔄 Тестируем подключение через приватный IP...")
    
    db_url = f"postgresql+asyncpg://{DB_CONFIGS['private']['user']}:{DB_CONFIGS['private']['password']}@{DB_CONFIGS['private']['host']}:{DB_CONFIGS['private']['port']}/{DB_CONFIGS['private']['database']}"
    
    try:
        engine = create_async_engine(db_url, echo=False)
        
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT version()"))
            version = result.fetchone()
            print(f"✅ Приватное подключение успешно!")
            print(f"📋 Версия PostgreSQL: {version[0]}")
            
        await engine.dispose()
        return True
        
    except Exception as e:
        print(f"❌ Ошибка приватного подключения: {e}")
        return False

def test_private_sync_connection():
    """Тест синхронного подключения через приватный IP"""
    print("\n🔄 Тестируем синхронное подключение через приватный IP...")
    
    try:
        conn = psycopg2.connect(
            host=DB_CONFIGS["private"]["host"],
            port=DB_CONFIGS["private"]["port"],
            database=DB_CONFIGS["private"]["database"],
            user=DB_CONFIGS["private"]["user"],
            password=DB_CONFIGS["private"]["password"]
        )
        
        cursor = conn.cursor()
        cursor.execute("SELECT version()")
        version = cursor.fetchone()
        
        print(f"✅ Синхронное приватное подключение успешно!")
        print(f"📋 Версия PostgreSQL: {version[0]}")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Ошибка синхронного приватного подключения: {e}")
        return False

async def test_database_operations(config_name="external"):
    """Тест основных операций с БД"""
    print(f"\n🔄 Тестируем операции с БД ({config_name})...")
    
    config = DB_CONFIGS[config_name]
    db_url = f"postgresql+asyncpg://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"
    
    try:
        engine = create_async_engine(db_url, echo=False)
        
        async with engine.begin() as conn:
            # Тест создания таблицы
            await conn.execute(text("""
                CREATE TABLE IF NOT EXISTS test_table (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """))
            
            # Тест вставки данных
            await conn.execute(text("""
                INSERT INTO test_table (name) VALUES ('Test Connection')
                ON CONFLICT DO NOTHING
            """))
            
            # Тест выборки данных
            result = await conn.execute(text("SELECT COUNT(*) FROM test_table"))
            count = result.fetchone()
            
            print(f"✅ Операции с БД успешны!")
            print(f"📊 Записей в тестовой таблице: {count[0]}")
            
            # Удаляем тестовую таблицу
            await conn.execute(text("DROP TABLE IF EXISTS test_table"))
            
        await engine.dispose()
        return True
        
    except Exception as e:
        print(f"❌ Ошибка операций с БД: {e}")
        return False

async def main():
    print("🚀 Тестирование подключения к PostgreSQL (Beget)")
    print("=" * 60)
    
    # Показываем параметры подключения
    print("📋 ВНЕШНИЙ ХОСТ:")
    print(f"   🌐 Host: {DB_CONFIGS['external']['host']}")
    print(f"   🔌 Port: {DB_CONFIGS['external']['port']}")
    print(f"   🗄️  Database: {DB_CONFIGS['external']['database']}")
    print(f"   👤 User: {DB_CONFIGS['external']['user']}")
    
    print("\n📋 ПРИВАТНЫЙ IP:")
    print(f"   🌐 Host: {DB_CONFIGS['private']['host']}")
    print(f"   🔌 Port: {DB_CONFIGS['private']['port']}")
    print(f"   🗄️  Database: {DB_CONFIGS['private']['database']}")
    print(f"   👤 User: {DB_CONFIGS['private']['user']}")
    print("=" * 60)
    
    # Тестируем внешние подключения
    print("\n🔥 ТЕСТИРОВАНИЕ ВНЕШНЕГО ХОСТА:")
    external_sync_ok = test_sync_connection()
    external_async_ok = await test_async_connection()
    
    # Тестируем приватные подключения
    print("\n🔥 ТЕСТИРОВАНИЕ ПРИВАТНОГО IP:")
    private_sync_ok = test_private_sync_connection()
    private_async_ok = await test_private_connection()
    
    # Тестируем операции с БД на рабочем подключении
    ops_ok = False
    working_config = None
    
    if external_async_ok:
        ops_ok = await test_database_operations("external")
        working_config = "external"
    elif private_async_ok:
        ops_ok = await test_database_operations("private")
        working_config = "private"
    
    # Результат
    print("\n" + "=" * 60)
    print("📋 РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ:")
    print("\n🌐 ВНЕШНИЙ ХОСТ:")
    print(f"   Синхронное подключение: {'✅' if external_sync_ok else '❌'}")
    print(f"   Асинхронное подключение: {'✅' if external_async_ok else '❌'}")
    
    print("\n🏠 ПРИВАТНЫЙ IP:")
    print(f"   Синхронное подключение: {'✅' if private_sync_ok else '❌'}")
    print(f"   Асинхронное подключение: {'✅' if private_async_ok else '❌'}")
    
    print(f"\n🛠️  ОПЕРАЦИИ С БД: {'✅' if ops_ok else '❌'}")
    
    if working_config:
        print(f"\n🎉 Подключение работает через {working_config.upper()}!")
        print("💡 Можно обновить config.env с рабочими настройками")
        
        # Показываем правильный DATABASE_URL
        config = DB_CONFIGS[working_config]
        correct_url = f"postgresql+asyncpg://{config['user']}:{config['password']}@{config['host']}:{config['port']}/{config['database']}"
        print(f"\n🔧 Правильный DATABASE_URL для config.env:")
        print(f"DATABASE_URL={correct_url}")
        
    else:
        print("\n❌ НИ ОДНО ПОДКЛЮЧЕНИЕ НЕ РАБОТАЕТ")
        print("💡 Возможные причины:")
        print("   - Сервер PostgreSQL недоступен")
        print("   - Неправильные данные подключения")
        print("   - Блокировка firewall")
        print("   - Нужно подключаться с сервера Beget")

if __name__ == "__main__":
    asyncio.run(main()) 