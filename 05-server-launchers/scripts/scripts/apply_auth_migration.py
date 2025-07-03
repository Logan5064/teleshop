#!/usr/bin/env python3
"""
🗄️ Применение миграций для системы авторизации
Создает таблицы: auth_codes, user_sessions, telegram_user_profiles
"""

import asyncio
import os
import sys
from sqlalchemy import text

# Добавляем путь к модулям
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

from shared.utils.database import engine, AsyncSessionLocal
from shared.models.auth_models import AuthCode, UserSession, TelegramUserProfile
from shared.utils.database import Base

async def create_auth_tables():
    """Создает таблицы для авторизации"""
    print("🗄️ Создание таблиц для системы авторизации...")
    
    try:
        # Создаем таблицы через SQLAlchemy
        async with engine.begin() as conn:
            # Создаем только новые таблицы
            await conn.run_sync(Base.metadata.create_all, tables=[
                AuthCode.__table__,
                UserSession.__table__, 
                TelegramUserProfile.__table__
            ])
        
        print("✅ Таблицы авторизации созданы успешно")
        
        # Проверяем что таблицы созданы
        await check_tables()
        
    except Exception as e:
        print(f"❌ Ошибка создания таблиц: {e}")
        return False
    
    return True

async def check_tables():
    """Проверяет наличие созданных таблиц"""
    print("\n📋 Проверка созданных таблиц...")
    
    async with AsyncSessionLocal() as db:
        try:
            # Проверяем auth_codes
            result = await db.execute(text("""
                SELECT table_name, column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'auth_codes'
                ORDER BY ordinal_position
            """))
            auth_codes_columns = result.fetchall()
            
            if auth_codes_columns:
                print("✅ Таблица auth_codes:")
                for row in auth_codes_columns:
                    print(f"   • {row.column_name} ({row.data_type})")
            
            # Проверяем user_sessions
            result = await db.execute(text("""
                SELECT table_name, column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'user_sessions'
                ORDER BY ordinal_position
            """))
            sessions_columns = result.fetchall()
            
            if sessions_columns:
                print("✅ Таблица user_sessions:")
                for row in sessions_columns:
                    print(f"   • {row.column_name} ({row.data_type})")
            
            # Проверяем telegram_user_profiles
            result = await db.execute(text("""
                SELECT table_name, column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'telegram_user_profiles'
                ORDER BY ordinal_position
            """))
            profiles_columns = result.fetchall()
            
            if profiles_columns:
                print("✅ Таблица telegram_user_profiles:")
                for row in profiles_columns:
                    print(f"   • {row.column_name} ({row.data_type})")
            
            print(f"\n🎯 Всего создано таблиц: {len([auth_codes_columns, sessions_columns, profiles_columns])}")
            
        except Exception as e:
            print(f"❌ Ошибка проверки таблиц: {e}")

async def test_auth_system():
    """Тестирует работу системы авторизации"""
    print("\n🧪 Тестирование системы авторизации...")
    
    try:
        from shared.auth.db_code_auth import DatabaseCodeAuth
        
        async with AsyncSessionLocal() as db:
            # Тест создания кода
            test_telegram_id = "123456789"
            test_data = {
                'username': 'test_user',
                'first_name': 'Test',
                'last_name': 'User'
            }
            
            code = await DatabaseCodeAuth.create_temp_code(test_telegram_id, test_data, db)
            print(f"✅ Создан тестовый код: {code}")
            
            # Тест проверки кода
            session_token = await DatabaseCodeAuth.verify_code_and_create_session(
                code, db, ip_address="127.0.0.1", user_agent="Test"
            )
            print(f"✅ Создана тестовая сессия: {session_token[:16]}...")
            
            # Тест проверки сессии
            session_data = await DatabaseCodeAuth.verify_session(session_token, db)
            if session_data:
                print(f"✅ Сессия валидна для пользователя: {session_data['telegram_id']}")
            
            # Очистка тестовых данных
            await DatabaseCodeAuth.logout_session(session_token, db)
            print("✅ Тестовые данные очищены")
            
    except Exception as e:
        print(f"❌ Ошибка тестирования: {e}")

async def main():
    """Главная функция"""
    print("🔐 Настройка системы авторизации TeleShop Constructor")
    print("=" * 60)
    
    # Создаем таблицы
    success = await create_auth_tables()
    
    if success:
        # Тестируем систему
        await test_auth_system()
        
        print("\n" + "=" * 60)
        print("🎉 Система авторизации настроена!")
        print("📋 Следующие шаги:")
        print("   1. Установите токен бота в shared/config/auth_config.env")
        print("   2. Запустите: python main_secure.py")
        print("   3. Запустите: python auth_bot.py")
        print("   4. Протестируйте авторизацию")
        print("=" * 60)
    else:
        print("\n❌ Не удалось настроить систему авторизации")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(main()) 