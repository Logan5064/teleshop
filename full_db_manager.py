#!/usr/bin/env python3
"""
🛍️ Полный менеджер базы данных TeleShop Constructor
Управление всеми 40+ таблицами полной схемы БД
"""

import psycopg2
import psycopg2.extras
import json
from datetime import datetime, timedelta
import random
import string

# Конфигурация БД
DB_CONFIG = {
    'host': 'ladixoofilad.beget.app',
    'port': 5432,
    'database': 'default_db',
    'user': 'cloud_user',
    'password': 'u61e&ke&!Ty1'
}

class FullTeleShopDB:
    def __init__(self):
        self.connection = None
        self.cursor = None
        self.connect()
    
    def connect(self):
        """Подключение к БД"""
        try:
            self.connection = psycopg2.connect(**DB_CONFIG)
            self.cursor = self.connection.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            return True
        except Exception as e:
            print(f"❌ Ошибка подключения: {e}")
            return False
    
    def query(self, sql, params=None):
        """Выполнить SQL запрос"""
        try:
            self.cursor.execute(sql, params)
            if sql.strip().upper().startswith('SELECT'):
                return self.cursor.fetchall()
            else:
                self.connection.commit()
                return True
        except Exception as e:
            print(f"❌ Ошибка запроса: {e}")
            self.connection.rollback()
            return None
    
    def close(self):
        """Закрыть соединение"""
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()
    
    # ===============================
    # ПОЛЬЗОВАТЕЛИ И АВТОРИЗАЦИЯ
    # ===============================
    
    def create_user(self, telegram_id, username=None, first_name=None, email=None, subscription_plan='free'):
        """Создать нового пользователя"""
        sql = """
        INSERT INTO users (telegram_id, username, first_name, email, subscription_plan) 
        VALUES (%s, %s, %s, %s, %s) 
        ON CONFLICT (telegram_id) DO UPDATE SET
        username = EXCLUDED.username,
        first_name = EXCLUDED.first_name,
        email = EXCLUDED.email
        RETURNING id
        """
        result = self.query(sql, (telegram_id, username, first_name, email, subscription_plan))
        return result[0]['id'] if result else None
    
    def create_auth_code(self, telegram_id, username=None, first_name=None, last_name=None):
        """Создать код авторизации"""
        code = ''.join(random.choices(string.digits, k=6))
        expires_at = datetime.now() + timedelta(minutes=10)
        
        sql = """
        INSERT INTO auth_codes (code, telegram_id, telegram_username, telegram_first_name, telegram_last_name, expires_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING code
        """
        result = self.query(sql, (code, telegram_id, username, first_name, last_name, expires_at))
        return result[0]['code'] if result else None
    
    def verify_auth_code(self, code):
        """Проверить код авторизации"""
        sql = """
        UPDATE auth_codes SET 
        is_used = true, 
        used_at = NOW()
        WHERE code = %s AND NOT is_used AND expires_at > NOW()
        RETURNING telegram_id, telegram_username, telegram_first_name
        """
        result = self.query(sql, (code,))
        return result[0] if result else None
    
    def create_user_session(self, user_id, telegram_id, ip_address=None, user_agent=None):
        """Создать сессию пользователя"""
        session_token = ''.join(random.choices(string.ascii_letters + string.digits, k=64))
        expires_at = datetime.now() + timedelta(hours=12)
        
        sql = """
        INSERT INTO user_sessions (session_token, user_id, telegram_id, ip_address, user_agent, expires_at)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING session_token
        """
        result = self.query(sql, (session_token, user_id, telegram_id, ip_address, user_agent, expires_at))
        return result[0]['session_token'] if result else None
    
    # ===============================
    # МАГАЗИНЫ
    # ===============================
    
    def create_shop(self, user_id, name, description=None, domain_slug=None):
        """Создать магазин"""
        sql = """
        INSERT INTO shops (user_id, name, description, domain_slug, currency, language) 
        VALUES (%s, %s, %s, %s, 'RUB', 'ru') 
        RETURNING id
        """
        result = self.query(sql, (user_id, name, description, domain_slug))
        
        if result:
            shop_id = result[0]['id']
            # Создаем дизайн по умолчанию
            self.query("""
                INSERT INTO shop_designs (shop_id, primary_color, secondary_color, accent_color, theme_name)
                VALUES (%s, '#3b82f6', '#1e40af', '#ef4444', 'modern')
            """, (shop_id,))
            return shop_id
        return None
    
    def update_shop_bot(self, shop_id, bot_token, bot_username):
        """Обновить настройки бота магазина"""
        sql = """
        UPDATE shops SET 
        bot_token = %s, 
        bot_username = %s, 
        is_bot_active = true,
        updated_at = NOW()
        WHERE id = %s
        """
        return self.query(sql, (bot_token, bot_username, shop_id))
    
    def get_shop_full_info(self, shop_id):
        """Получить полную информацию о магазине"""
        shop_info = self.query("SELECT * FROM shops WHERE id = %s", (shop_id,))
        if not shop_info:
            return None
        
        shop = dict(shop_info[0])
        
        # Дизайн
        design = self.query("SELECT * FROM shop_designs WHERE shop_id = %s", (shop_id,))
        shop['design'] = dict(design[0]) if design else None
        
        # Категории
        categories = self.query("""
            SELECT c.*, COUNT(p.id) as products_count 
            FROM shop_categories c 
            LEFT JOIN products p ON c.id = p.category_id 
            WHERE c.shop_id = %s 
            GROUP BY c.id 
            ORDER BY c.position
        """, (shop_id,))
        shop['categories'] = [dict(c) for c in categories] if categories else []
        
        # Товары
        products = self.query("""
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN shop_categories c ON p.category_id = c.id 
            WHERE p.shop_id = %s
            ORDER BY p.created_at DESC
        """, (shop_id,))
        shop['products'] = [dict(p) for p in products] if products else []
        
        return shop
    
    # ===============================
    # ТОВАРЫ И КАТЕГОРИИ
    # ===============================
    
    def create_category(self, shop_id, name, emoji=None, description=None):
        """Создать категорию"""
        sql = """
        INSERT INTO shop_categories (shop_id, name, emoji, description, position) 
        VALUES (%s, %s, %s, %s, (SELECT COALESCE(MAX(position), 0) + 1 FROM shop_categories WHERE shop_id = %s))
        RETURNING id
        """
        result = self.query(sql, (shop_id, name, emoji, description, shop_id))
        return result[0]['id'] if result else None
    
    def create_product(self, shop_id, name, description, price, category_id=None, **kwargs):
        """Создать товар"""
        fields = ['shop_id', 'name', 'description', 'price']
        values = [shop_id, name, description, price]
        placeholders = ['%s', '%s', '%s', '%s']
        
        if category_id:
            fields.append('category_id')
            values.append(category_id)
            placeholders.append('%s')
        
        # Дополнительные поля
        extra_fields = ['old_price', 'image_url', 'is_available', 'stock_quantity', 'sku', 'weight', 'tags']
        for field in extra_fields:
            if field in kwargs:
                fields.append(field)
                values.append(kwargs[field])
                placeholders.append('%s')
        
        sql = f"""
        INSERT INTO products ({', '.join(fields)}) 
        VALUES ({', '.join(placeholders)}) 
        RETURNING id
        """
        result = self.query(sql, values)
        return result[0]['id'] if result else None
    
    def create_product_review(self, product_id, user_telegram_id, shop_id, rating, comment, order_id=None):
        """Создать отзыв на товар"""
        sql = """
        INSERT INTO product_reviews (product_id, user_telegram_id, shop_id, order_id, rating, comment)
        VALUES (%s, %s, %s, %s, %s, %s)
        RETURNING id
        """
        result = self.query(sql, (product_id, user_telegram_id, shop_id, order_id, rating, comment))
        return result[0]['id'] if result else None
    
    # ===============================
    # ЗАКАЗЫ И КОРЗИНЫ
    # ===============================
    
    def create_cart(self, shop_id, user_telegram_id):
        """Создать корзину"""
        sql = """
        INSERT INTO carts (shop_id, user_telegram_id, expires_at)
        VALUES (%s, %s, %s)
        RETURNING id
        """
        expires_at = datetime.now() + timedelta(days=7)
        result = self.query(sql, (shop_id, user_telegram_id, expires_at))
        return result[0]['id'] if result else None
    
    def add_to_cart(self, cart_id, product_id, quantity=1, variant_id=None):
        """Добавить товар в корзину"""
        # Получаем цену товара
        price_result = self.query("SELECT price FROM products WHERE id = %s", (product_id,))
        if not price_result:
            return None
        
        price = price_result[0]['price']
        total_price = price * quantity
        
        sql = """
        INSERT INTO cart_items (cart_id, product_id, variant_id, quantity, price, total_price)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON CONFLICT (cart_id, product_id, variant_id) DO UPDATE SET
        quantity = cart_items.quantity + EXCLUDED.quantity,
        total_price = cart_items.total_price + EXCLUDED.total_price
        RETURNING id
        """
        result = self.query(sql, (cart_id, product_id, variant_id, quantity, price, total_price))
        
        # Обновляем итоги корзины
        self.update_cart_totals(cart_id)
        
        return result[0]['id'] if result else None
    
    def update_cart_totals(self, cart_id):
        """Обновить итоги корзины"""
        sql = """
        UPDATE carts SET 
        total_amount = (SELECT COALESCE(SUM(total_price), 0) FROM cart_items WHERE cart_id = %s),
        items_count = (SELECT COALESCE(SUM(quantity), 0) FROM cart_items WHERE cart_id = %s),
        updated_at = NOW()
        WHERE id = %s
        """
        return self.query(sql, (cart_id, cart_id, cart_id))
    
    def create_order(self, shop_id, user_telegram_id, items, customer_name=None, customer_phone=None, **kwargs):
        """Создать заказ"""
        # Генерируем номер заказа
        order_number = f"TS{datetime.now().strftime('%Y%m%d')}{random.randint(1000, 9999)}"
        
        # Рассчитываем итоги
        total_amount = sum(item.get('total_price', 0) for item in items)
        
        sql = """
        INSERT INTO orders (shop_id, user_telegram_id, order_number, subtotal, total_amount, 
                           items, customer_name, customer_phone, currency)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'RUB')
        RETURNING id
        """
        items_json = json.dumps(items)
        result = self.query(sql, (shop_id, user_telegram_id, order_number, total_amount, 
                                total_amount, items_json, customer_name, customer_phone))
        return result[0]['id'] if result else None
    
    # ===============================
    # ПОДПИСЧИКИ БОТОВ
    # ===============================
    
    def add_bot_subscriber(self, shop_id, telegram_user_id, **kwargs):
        """Добавить подписчика бота"""
        fields = ['shop_id', 'telegram_user_id']
        values = [shop_id, telegram_user_id]
        placeholders = ['%s', '%s']
        
        # Дополнительные поля
        extra_fields = ['username', 'first_name', 'last_name', 'language_code', 'phone', 'source', 'country', 'city']
        for field in extra_fields:
            if field in kwargs:
                fields.append(field)
                values.append(kwargs[field])
                placeholders.append('%s')
        
        sql = f"""
        INSERT INTO bot_subscribers ({', '.join(fields)}, last_interaction, interaction_count) 
        VALUES ({', '.join(placeholders)}, NOW(), 1)
        ON CONFLICT (shop_id, telegram_user_id) DO UPDATE SET
        username = EXCLUDED.username,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        last_interaction = NOW(),
        interaction_count = bot_subscribers.interaction_count + 1,
        updated_at = NOW()
        RETURNING id
        """
        result = self.query(sql, values)
        return result[0]['id'] if result else None
    
    # ===============================
    # АНАЛИТИКА
    # ===============================
    
    def add_analytics_event(self, shop_id, event_type, **kwargs):
        """Добавить событие аналитики"""
        sql = """
        INSERT INTO analytics (shop_id, event_type, user_telegram_id, page, product_id, 
                              category_id, order_id, event_data, ip_address, user_agent)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        event_data = json.dumps(kwargs.get('event_data', {}))
        self.query(sql, (
            shop_id, event_type, kwargs.get('user_telegram_id'), kwargs.get('page'),
            kwargs.get('product_id'), kwargs.get('category_id'), kwargs.get('order_id'),
            event_data, kwargs.get('ip_address'), kwargs.get('user_agent')
        ))
        
        # Обновляем сводную аналитику
        self.update_shop_analytics_summary(shop_id)
    
    def update_shop_analytics_summary(self, shop_id):
        """Обновить сводную аналитику магазина"""
        # Пока простая версия - можно расширить
        sql = """
        INSERT INTO shop_analytics_summary (shop_id, total_visitors, total_orders, total_revenue, last_updated)
        VALUES (%s, 
               (SELECT COUNT(DISTINCT user_telegram_id) FROM analytics WHERE shop_id = %s),
               (SELECT COUNT(*) FROM orders WHERE shop_id = %s),
               (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE shop_id = %s AND status = 'completed'),
               NOW())
        ON CONFLICT (shop_id) DO UPDATE SET
        total_visitors = EXCLUDED.total_visitors,
        total_orders = EXCLUDED.total_orders,
        total_revenue = EXCLUDED.total_revenue,
        last_updated = NOW()
        """
        return self.query(sql, (shop_id, shop_id, shop_id, shop_id))
    
    # ===============================
    # УТИЛИТЫ
    # ===============================
    
    def get_full_database_stats(self):
        """Получить полную статистику БД"""
        tables = [
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
        
        stats = {}
        for table in tables:
            try:
                result = self.query(f"SELECT COUNT(*) as count FROM {table}")
                stats[table] = result[0]['count'] if result else 0
            except:
                stats[table] = 0
        
        return stats
    
    def cleanup_expired_data(self):
        """Очистка просроченных данных"""
        # Удаляем просроченные коды авторизации
        self.query("DELETE FROM auth_codes WHERE expires_at < NOW()")
        
        # Удаляем просроченные сессии
        self.query("DELETE FROM user_sessions WHERE expires_at < NOW()")
        
        # Удаляем старые корзины (старше 30 дней)
        self.query("DELETE FROM carts WHERE created_at < NOW() - INTERVAL '30 days'")
        
        print("🧹 Просроченные данные очищены")

if __name__ == "__main__":
    print("🛍️ TeleShop Constructor - Полный DB Manager")
    print("=" * 50)
    
    db = FullTeleShopDB()
    
    # Показываем полную статистику
    print("📊 Полная статистика БД:")
    stats = db.get_full_database_stats()
    
    categories = {
        'Пользователи': ['users', 'telegram_user_profiles', 'auth_codes', 'user_sessions'],
        'Подписки': ['subscription_plans', 'user_subscriptions', 'payments'],
        'Магазины': ['shops', 'shop_designs', 'shop_banners', 'shop_navigation'],
        'Товары': ['shop_categories', 'products', 'product_variants', 'product_reviews'],
        'Заказы': ['carts', 'cart_items', 'orders', 'order_status_history'],
        'E-commerce': ['shipping_methods', 'payment_methods', 'coupons', 'coupon_usages'],
        'Конструктор': ['templates', 'designs', 'blocks_library'],
        'Медиа': ['media_files'],
        'Боты': ['bot_subscribers'],
        'Аналитика': ['analytics', 'shop_analytics_summary'],
        'Система': ['system_settings', 'user_settings', 'shop_settings', 'activity_logs', 'error_logs']
    }
    
    for category, tables in categories.items():
        total = sum(stats.get(table, 0) for table in tables)
        print(f"\n📂 {category}: {total} записей")
        for table in tables:
            count = stats.get(table, 0)
            if count > 0:
                print(f"   📄 {table}: {count}")
    
    print(f"\n📊 Всего записей: {sum(stats.values())}")
    
    # Очистка
    db.cleanup_expired_data()
    db.close() 