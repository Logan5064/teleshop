#!/usr/bin/env python3
"""
🔍 Проверка всех таблиц в PostgreSQL базе данных TeleShop
"""

import psycopg2
import psycopg2.extras

# Конфигурация БД
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db',
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

def check_all_tables():
    connection = None
    cursor = None
    
    try:
        print("🔌 Подключаюсь к PostgreSQL...")
        connection = psycopg2.connect(**DB_CONFIG)
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        print("✅ Подключение успешно!")
        
        # Получаем все таблицы
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        """)
        tables = cursor.fetchall()
        
        print(f"\n📊 Найдено таблиц: {len(tables)}")
        print("=" * 50)
        
        total_records = 0
        
        for table in tables:
            table_name = table['table_name']
            
            # Считаем записи
            cursor.execute(f"SELECT COUNT(*) as count FROM {table_name}")
            count = cursor.fetchone()['count']
            total_records += count
            
            # Получаем структуру таблицы (первые 3 колонки)
            cursor.execute(f"""
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_schema = 'public' AND table_name = '{table_name}'
                ORDER BY ordinal_position
                LIMIT 3
            """)
            columns = cursor.fetchall()
            col_info = ", ".join([f"{col['column_name']}({col['data_type']})" for col in columns])
            
            print(f"📄 {table_name}: {count} записей")
            print(f"   Колонки: {col_info}...")
            print()
        
        print("=" * 50)
        print(f"📊 Всего таблиц: {len(tables)}")
        print(f"📊 Всего записей: {total_records}")
        
        # Проверяем какие таблицы из полной схемы отсутствуют
        expected_tables = [
            'users', 'telegram_user_profiles', 'auth_codes', 'user_sessions',
            'subscription_plans', 'user_subscriptions', 'payments',
            'shops', 'shop_designs', 'shop_banners', 'shop_navigation', 
            'shop_categories', 'products', 'product_variants', 'product_reviews',
            'carts', 'cart_items', 'orders', 'order_status_history',
            'shipping_methods', 'payment_methods', 'coupons', 'coupon_usages',
            'templates', 'designs', 'blocks_library', 'media_files',
            'bot_subscribers', 'analytics', 'shop_analytics_summary',
            'notification_templates', 'notifications', 'api_keys', 'webhooks', 'webhook_logs',
            'system_settings', 'user_settings', 'shop_settings',
            'activity_logs', 'error_logs'
        ]
        
        existing_tables = [t['table_name'] for t in tables]
        missing_tables = [t for t in expected_tables if t not in existing_tables]
        
        if missing_tables:
            print(f"\n❌ Отсутствующие таблицы ({len(missing_tables)}):")
            for table in missing_tables:
                print(f"   • {table}")
        else:
            print("\n✅ Все ожидаемые таблицы созданы!")
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        return False
        
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        print("\n🔌 Отключился от базы данных")

if __name__ == "__main__":
    print("🔍 TeleShop Constructor - Проверка таблиц БД")
    print("=" * 50)
    check_all_tables() 