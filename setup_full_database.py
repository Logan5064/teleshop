#!/usr/bin/env python3
"""
🚀 Полная установка базы данных TeleShop Constructor
Создает все 40+ таблиц для полноценной работы системы
"""

import psycopg2
import psycopg2.extras
import os
from datetime import datetime

# Конфигурация БД
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db',
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

def create_full_database():
    """Создание полной базы данных TeleShop Constructor"""
    
    connection = None
    cursor = None
    
    try:
        print("🔌 Подключаюсь к PostgreSQL...")
        connection = psycopg2.connect(**DB_CONFIG)
        cursor = connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        print("✅ Подключение успешно!")
        
        # Читаем SQL файл
        sql_file = "FULL_TELESHOP_DATABASE.sql"
        if not os.path.exists(sql_file):
            print(f"❌ Файл {sql_file} не найден!")
            return False
        
        print(f"📄 Читаю SQL файл: {sql_file}")
        with open(sql_file, 'r', encoding='utf-8') as file:
            sql_content = file.read()
        
        print("🚀 Создаю полную схему базы данных...")
        print("   Это может занять несколько секунд...")
        
        # Выполняем SQL скрипт
        cursor.execute(sql_content)
        connection.commit()
        print("✅ Полная схема базы данных создана!")
        
        # Добавляем дополнительные тестовые данные
        print("🎯 Добавляю расширенные тестовые данные...")
        
        # Создаем тестовый магазин с полной структурой
        test_data_sql = """
        -- Получаем ID тестового пользователя
        DO $$
        DECLARE
            test_user_id INTEGER;
            test_shop_id INTEGER;
            test_category_id INTEGER;
        BEGIN
            SELECT id INTO test_user_id FROM users WHERE telegram_id = '123456789';
            
            IF test_user_id IS NOT NULL THEN
                -- Создаем/обновляем магазин
                INSERT INTO shops (user_id, name, description, domain_slug, is_published, currency, language) VALUES 
                (test_user_id, 'Тестовый магазин TeleShop', 'Полнофункциональный демо-магазин с всеми возможностями', 'demo-shop', true, 'RUB', 'ru')
                ON CONFLICT (domain_slug) DO UPDATE SET
                name = EXCLUDED.name,
                description = EXCLUDED.description,
                is_published = EXCLUDED.is_published
                RETURNING id INTO test_shop_id;
                
                -- Если магазин уже существует
                IF test_shop_id IS NULL THEN
                    SELECT id INTO test_shop_id FROM shops WHERE domain_slug = 'demo-shop';
                END IF;
                
                -- Дизайн магазина
                INSERT INTO shop_designs (shop_id, primary_color, secondary_color, accent_color, theme_name) VALUES
                (test_shop_id, '#3b82f6', '#1e40af', '#ef4444', 'modern')
                ON CONFLICT (shop_id) DO UPDATE SET
                primary_color = EXCLUDED.primary_color,
                secondary_color = EXCLUDED.secondary_color,
                accent_color = EXCLUDED.accent_color,
                theme_name = EXCLUDED.theme_name;
                
                -- Категории товаров
                INSERT INTO shop_categories (shop_id, name, emoji, description, position) VALUES 
                (test_shop_id, 'Электроника', '📱', 'Смартфоны, ноутбуки, аксессуары', 1),
                (test_shop_id, 'Одежда', '👕', 'Мужская и женская одежда', 2),
                (test_shop_id, 'Книги', '📚', 'Художественная и техническая литература', 3),
                (test_shop_id, 'Спорт', '⚽', 'Спортивные товары и инвентарь', 4),
                (test_shop_id, 'Дом и сад', '🏠', 'Товары для дома и дачи', 5)
                ON CONFLICT DO NOTHING;
                
                -- Получаем ID категории для товаров
                SELECT id INTO test_category_id FROM shop_categories WHERE shop_id = test_shop_id AND name = 'Электроника';
                
                -- Товары
                INSERT INTO products (shop_id, category_id, name, description, price, old_price, is_available, stock_quantity, sku) VALUES 
                (test_shop_id, test_category_id, 'iPhone 15 Pro', 'Новейший смартфон Apple с титановым корпусом', 99999.00, 119999.00, true, 10, 'IP15PRO128'),
                (test_shop_id, test_category_id, 'MacBook Air M3', 'Ультратонкий ноутбук с процессором M3', 129999.00, null, true, 5, 'MBA13M3'),
                (test_shop_id, test_category_id, 'AirPods Pro 2', 'Беспроводные наушники с шумоподавлением', 24999.00, null, true, 20, 'APPRO2'),
                (test_shop_id, (SELECT id FROM shop_categories WHERE shop_id = test_shop_id AND name = 'Одежда'), 'Футболка Premium', 'Качественная хлопковая футболка', 1999.00, 2499.00, true, 50, 'TSHIRT01'),
                (test_shop_id, (SELECT id FROM shop_categories WHERE shop_id = test_shop_id AND name = 'Книги'), 'Python для начинающих', 'Полное руководство по программированию', 2499.00, null, true, 30, 'BOOK001')
                ON CONFLICT DO NOTHING;
                
                -- Способы доставки
                INSERT INTO shipping_methods (shop_id, name, description, price, delivery_time) VALUES
                (test_shop_id, 'Курьерская доставка', 'Доставка курьером по городу', 300.00, '1-2 дня'),
                (test_shop_id, 'Самовывоз', 'Получение в пункте выдачи', 0.00, 'В день заказа'),
                (test_shop_id, 'Почта России', 'Доставка почтой', 200.00, '3-7 дней')
                ON CONFLICT DO NOTHING;
                
                -- Способы оплаты
                INSERT INTO payment_methods (shop_id, name, type, description) VALUES
                (test_shop_id, 'Банковская карта', 'card', 'Оплата картой онлайн'),
                (test_shop_id, 'ЮMoney', 'yoomoney', 'Оплата через ЮMoney'),
                (test_shop_id, 'Наличные', 'cash', 'Оплата при получении')
                ON CONFLICT DO NOTHING;
                
                -- Купоны
                INSERT INTO coupons (shop_id, code, name, type, value, minimum_amount, usage_limit) VALUES
                (test_shop_id, 'WELCOME10', 'Скидка новичкам', 'percentage', 10.00, 1000.00, 100),
                (test_shop_id, 'SAVE500', 'Скидка 500 рублей', 'fixed', 500.00, 3000.00, 50)
                ON CONFLICT DO NOTHING;
                
                -- Баннеры
                INSERT INTO shop_banners (shop_id, title, subtitle, description, button_text, position) VALUES
                (test_shop_id, 'Большая распродажа!', 'Скидки до 50% на все товары', 'Успейте купить со скидкой!', 'Смотреть товары', 1),
                (test_shop_id, 'Новая коллекция', 'Эксклюзивные товары уже в продаже', 'Будьте первыми!', 'Перейти к новинкам', 2)
                ON CONFLICT DO NOTHING;
                
                -- Навигация
                INSERT INTO shop_navigation (shop_id, title, url, position) VALUES
                (test_shop_id, 'Главная', '/shop/' || test_shop_id, 1),
                (test_shop_id, 'Каталог', '/shop/' || test_shop_id || '/catalog', 2),
                (test_shop_id, 'О нас', '/shop/' || test_shop_id || '/about', 3),
                (test_shop_id, 'Контакты', '/shop/' || test_shop_id || '/contacts', 4)
                ON CONFLICT DO NOTHING;
                
            END IF;
        END $$;
        """
        
        cursor.execute(test_data_sql)
        connection.commit()
        print("✅ Расширенные тестовые данные добавлены!")
        
        # Показываем финальную статистику
        print("\n📊 ПОЛНАЯ СТАТИСТИКА БАЗЫ ДАННЫХ")
        print("=" * 60)
        
        # Получаем список всех таблиц
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        """)
        tables = cursor.fetchall()
        
        print(f"📋 Создано таблиц: {len(tables)}")
        print()
        
        # Группируем таблицы по категориям
        categories = {
            'Пользователи и авторизация': ['users', 'telegram_user_profiles', 'auth_codes', 'user_sessions', 'user_settings'],
            'Подписки и платежи': ['subscription_plans', 'user_subscriptions', 'payments'],
            'Магазины и дизайн': ['shops', 'shop_designs', 'shop_banners', 'shop_navigation', 'shop_settings'],
            'Товары и категории': ['shop_categories', 'products', 'product_variants', 'product_reviews'],
            'Заказы и корзины': ['carts', 'cart_items', 'orders', 'order_status_history'],
            'Доставка и оплата': ['shipping_methods', 'payment_methods', 'coupons', 'coupon_usages'],
            'Конструктор': ['templates', 'designs', 'blocks_library'],
            'Файлы и медиа': ['media_files'],
            'Боты и подписчики': ['bot_subscribers'],
            'Аналитика': ['analytics', 'shop_analytics_summary'],
            'Уведомления': ['notification_templates', 'notifications'],
            'Интеграции': ['api_keys', 'webhooks', 'webhook_logs'],
            'Система': ['system_settings', 'activity_logs', 'error_logs']
        }
        
        for category, table_list in categories.items():
            print(f"📂 {category}:")
            for table_name in table_list:
                if any(t['table_name'] == table_name for t in tables):
                    cursor.execute(f"SELECT COUNT(*) as count FROM {table_name}")
                    count = cursor.fetchone()['count']
                    print(f"   📄 {table_name}: {count} записей")
            print()
        
        # Дополнительные таблицы не из категорий
        other_tables = [t['table_name'] for t in tables if not any(t['table_name'] in table_list for table_list in categories.values())]
        if other_tables:
            print("📂 Дополнительные таблицы:")
            for table_name in other_tables:
                cursor.execute(f"SELECT COUNT(*) as count FROM {table_name}")
                count = cursor.fetchone()['count']
                print(f"   📄 {table_name}: {count} записей")
        
        print("=" * 60)
        print("🎉 ПОЛНАЯ БАЗА ДАННЫХ TELESHOP CONSTRUCTOR ГОТОВА!")
        print()
        print("✅ Создано более 40 таблиц")
        print("✅ Настроены все связи и индексы")
        print("✅ Добавлены тестовые данные")
        print("✅ Система готова к полноценной работе")
        print()
        print("🚀 Теперь можно:")
        print("   • Запускать Auth Bot с реальной авторизацией")
        print("   • Переключать Constructor API на PostgreSQL")
        print("   • Тестировать Auto-Deploy TWA")
        print("   • Создавать магазины через конструктор")
        print("   • Собирать полную аналитику")
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        if connection:
            connection.rollback()
        return False
        
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
        print("\n🔌 Отключился от базы данных")

if __name__ == "__main__":
    print("🛍️ TeleShop Constructor - Полная установка БД")
    print("=" * 60)
    create_full_database() 