#!/usr/bin/env python3
"""
Расширенная диагностика подключения к PostgreSQL
"""

import asyncio
import socket
import os
from dotenv import load_dotenv

async def test_network_connection():
    """Тестируем сетевое подключение"""
    
    host = "ladixoofilad.beget.app"
    port = 5432
    
    print(f"🌐 Тестируем сетевое подключение к {host}:{port}")
    
    try:
        # Создаем сокет
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(10)  # 10 секунд таймаут
        
        # Пытаемся подключиться
        result = sock.connect_ex((host, port))
        sock.close()
        
        if result == 0:
            print("✅ Сетевое подключение работает!")
            return True
        else:
            print(f"❌ Сетевое подключение не работает (код: {result})")
            return False
            
    except Exception as e:
        print(f"❌ Ошибка сетевого подключения: {e}")
        return False

async def test_different_urls():
    """Тестируем разные варианты URL"""
    
    load_dotenv("config.env")
    
    # Разные варианты URL
    urls = [
        "postgresql+asyncpg://cloud_user:u61e&ke&!Ty1@ladixoofilad.beget.app:5432/default_db",
        "postgresql://cloud_user:u61e&ke&!Ty1@ladixoofilad.beget.app:5432/default_db",
        "postgresql+asyncpg://cloud_user:u61e%26ke%26%21Ty1@ladixoofilad.beget.app:5432/default_db",
    ]
    
    from sqlalchemy.ext.asyncio import create_async_engine
    from sqlalchemy import text
    
    for i, url in enumerate(urls, 1):
        print(f"\n🔄 Тест {i}: {url.split('@')[0]}@***")
        
        try:
            engine = create_async_engine(url, echo=False, pool_size=1, max_overflow=0)
            
            async with engine.begin() as conn:
                result = await conn.execute(text("SELECT 1"))
                result.fetchone()
                print(f"✅ URL {i} работает!")
                await engine.dispose()
                return url
                
        except Exception as e:
            print(f"❌ URL {i} не работает: {e}")
            try:
                await engine.dispose()
            except:
                pass
    
    return None

async def test_with_private_ip():
    """Тестируем с приватным IP"""
    
    print(f"\n🔄 Тестируем с приватным IP: 10.16.0.1:5432")
    
    try:
        from sqlalchemy.ext.asyncio import create_async_engine
        from sqlalchemy import text
        
        url = "postgresql+asyncpg://cloud_user:u61e&ke&!Ty1@10.16.0.1:5432/default_db"
        engine = create_async_engine(url, echo=False, pool_size=1, max_overflow=0)
        
        async with engine.begin() as conn:
            result = await conn.execute(text("SELECT 1"))
            result.fetchone()
            print(f"✅ Приватный IP работает!")
            await engine.dispose()
            return True
            
    except Exception as e:
        print(f"❌ Приватный IP не работает: {e}")
        return False

async def main():
    print("🚀 Расширенная диагностика PostgreSQL подключения...")
    
    # 1. Тестируем сеть
    network_ok = await test_network_connection()
    
    if not network_ok:
        print("\n💡 Возможные проблемы:")
        print("   - Хостинг блокирует внешние подключения к БД")
        print("   - Нужно добавить ваш IP в whitelist")
        print("   - Порт 5432 заблокирован firewall")
        return
    
    # 2. Тестируем разные URL
    working_url = await test_different_urls()
    
    if working_url:
        print(f"\n✅ Рабочий URL найден!")
        print(f"🔧 Обновите config.env:")
        print(f"DATABASE_URL={working_url}")
        return
    
    # 3. Тестируем приватный IP
    private_ok = await test_with_private_ip()
    
    if private_ok:
        print(f"\n✅ Приватный IP работает!")
        print(f"🔧 Используйте приватный IP в config.env")
        return
    
    print("\n❌ Все варианты не работают")
    print("💡 Рекомендации:")
    print("   1. Свяжитесь с поддержкой хостинга")
    print("   2. Узнайте как подключаться к БД извне")
    print("   3. Возможно нужен VPN или белый список IP")

if __name__ == "__main__":
    asyncio.run(main()) 