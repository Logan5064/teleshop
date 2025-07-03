-- ========================================
-- 🛍️ TeleShop Constructor - ПОЛНАЯ СХЕМА БД
-- ========================================
-- Максимально полная архитектура для всех компонентов проекта

-- ===============================
-- 1. ОСНОВНЫЕ ПОЛЬЗОВАТЕЛИ И АВТОРИЗАЦИЯ
-- ===============================

-- Пользователи платформы (создатели магазинов)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    subscription_plan VARCHAR(20) DEFAULT 'free',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Профили пользователей из Telegram (расширенная информация)
CREATE TABLE IF NOT EXISTS telegram_user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telegram_id VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    language_code VARCHAR(10),
    is_premium BOOLEAN DEFAULT FALSE,
    photo_url TEXT,
    bio TEXT,
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_logins INTEGER DEFAULT 1
);

-- Коды авторизации
CREATE TABLE IF NOT EXISTS auth_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(6) UNIQUE NOT NULL,
    telegram_id VARCHAR(50) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    telegram_username VARCHAR(100),
    telegram_first_name VARCHAR(100),
    telegram_last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    is_used BOOLEAN DEFAULT FALSE
);

-- Сессии пользователей
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    session_token VARCHAR(64) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telegram_id VARCHAR(50) NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    device_info JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- ===============================
-- 2. ПОДПИСКИ И ПЛАТЕЖИ
-- ===============================

-- Планы подписок
CREATE TABLE IF NOT EXISTS subscription_plans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RUB',
    duration_days INTEGER NOT NULL,
    features JSON,
    max_shops INTEGER,
    max_products INTEGER,
    max_orders INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Подписки пользователей
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES subscription_plans(id),
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    auto_renew BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Платежи
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscription_id INTEGER REFERENCES user_subscriptions(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RUB',
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_system_id VARCHAR(100),
    payment_data JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- ===============================
-- 3. МАГАЗИНЫ И ДИЗАЙН
-- ===============================

-- Магазины
CREATE TABLE IF NOT EXISTS shops (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    
    -- Bot настройки
    bot_token VARCHAR(100),
    bot_username VARCHAR(100),
    bot_webhook_url VARCHAR(500),
    is_bot_active BOOLEAN DEFAULT FALSE,
    bot_settings JSON,
    
    -- Основные настройки
    domain_slug VARCHAR(100) UNIQUE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    currency VARCHAR(10) DEFAULT 'RUB',
    language VARCHAR(10) DEFAULT 'ru',
    timezone VARCHAR(50) DEFAULT 'Europe/Moscow',
    
    -- SEO и интеграции
    seo_settings JSON,
    integrations JSON,
    blocks_structure JSON,
    
    -- Бизнес настройки
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    address TEXT,
    working_hours JSON,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Дизайны магазинов
CREATE TABLE IF NOT EXISTS shop_designs (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER UNIQUE NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    primary_color VARCHAR(7) DEFAULT '#3b82f6',
    secondary_color VARCHAR(7) DEFAULT '#1e40af',
    accent_color VARCHAR(7) DEFAULT '#ef4444',
    background_color VARCHAR(7) DEFAULT '#ffffff',
    text_color VARCHAR(7) DEFAULT '#1f2937',
    font_family VARCHAR(100) DEFAULT 'Inter',
    theme_name VARCHAR(50) DEFAULT 'modern',
    custom_css TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Баннеры магазинов
CREATE TABLE IF NOT EXISTS shop_banners (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500),
    background_color VARCHAR(7),
    text_color VARCHAR(7),
    button_text VARCHAR(100),
    button_url VARCHAR(500),
    button_action VARCHAR(100),
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Навигация магазинов
CREATE TABLE IF NOT EXISTS shop_navigation (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES shop_navigation(id),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500),
    icon VARCHAR(100),
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 4. ТОВАРЫ И КАТЕГОРИИ
-- ===============================

-- Категории товаров
CREATE TABLE IF NOT EXISTS shop_categories (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES shop_categories(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    emoji VARCHAR(10),
    image_url VARCHAR(500),
    slug VARCHAR(255),
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Товары
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES shop_categories(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    cost_price DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'RUB',
    
    -- Изображения и медиа
    image_url VARCHAR(500),
    images JSON,
    video_url VARCHAR(500),
    
    -- Инвентарь
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER,
    track_stock BOOLEAN DEFAULT FALSE,
    min_quantity INTEGER DEFAULT 1,
    max_quantity INTEGER,
    
    -- Атрибуты
    sku VARCHAR(100),
    barcode VARCHAR(100),
    slug VARCHAR(255),
    weight DECIMAL(8,2),
    dimensions JSON,
    tags JSON,
    specifications JSON,
    variants JSON,
    
    -- SEO
    seo_title VARCHAR(255),
    seo_description TEXT,
    
    -- Статистика
    views_count INTEGER DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    
    -- Статусы
    is_featured BOOLEAN DEFAULT FALSE,
    is_digital BOOLEAN DEFAULT FALSE,
    requires_shipping BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Варианты товаров (размеры, цвета и т.д.)
CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    price_modifier DECIMAL(10,2) DEFAULT 0,
    stock_quantity INTEGER,
    sku VARCHAR(100),
    image_url VARCHAR(500),
    is_default BOOLEAN DEFAULT FALSE,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Отзывы на товары
CREATE TABLE IF NOT EXISTS product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_telegram_id VARCHAR(50) NOT NULL,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    pros TEXT,
    cons TEXT,
    images JSON,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 5. ЗАКАЗЫ И КОРЗИНЫ
-- ===============================

-- Корзины покупок
CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    user_telegram_id VARCHAR(50) NOT NULL,
    session_id VARCHAR(100),
    total_amount DECIMAL(10,2) DEFAULT 0,
    items_count INTEGER DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'RUB',
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Товары в корзинах
CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id INTEGER REFERENCES product_variants(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    options JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Заказы
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    user_telegram_id VARCHAR(50) NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Суммы
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RUB',
    
    -- Статус
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    fulfillment_status VARCHAR(50) DEFAULT 'pending',
    
    -- Состав заказа
    items JSON NOT NULL,
    
    -- Контактная информация
    customer_name VARCHAR(255),
    customer_phone VARCHAR(50),
    customer_email VARCHAR(255),
    
    -- Доставка
    shipping_method_id INTEGER REFERENCES shipping_methods(id),
    delivery_address TEXT,
    delivery_date DATE,
    delivery_time_slot VARCHAR(50),
    
    -- Оплата
    payment_method_id INTEGER REFERENCES payment_methods(id),
    
    -- Дополнительно
    notes TEXT,
    admin_notes TEXT,
    coupon_code VARCHAR(50),
    
    -- Временные метки
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- История статусов заказов
CREATE TABLE IF NOT EXISTS order_status_history (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    comment TEXT,
    created_by VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 6. СПОСОБЫ ДОСТАВКИ И ОПЛАТЫ
-- ===============================

-- Способы доставки
CREATE TABLE IF NOT EXISTS shipping_methods (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    free_shipping_threshold DECIMAL(10,2),
    delivery_time VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    position INTEGER DEFAULT 0,
    settings JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Способы оплаты
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT,
    settings JSON,
    is_active BOOLEAN DEFAULT TRUE,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Купоны и промокоды
CREATE TABLE IF NOT EXISTS coupons (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    description TEXT,
    type VARCHAR(50) NOT NULL, -- percentage, fixed, free_shipping
    value DECIMAL(10,2) NOT NULL,
    minimum_amount DECIMAL(10,2),
    maximum_discount DECIMAL(10,2),
    usage_limit INTEGER,
    usage_count INTEGER DEFAULT 0,
    user_usage_limit INTEGER,
    starts_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Использование купонов
CREATE TABLE IF NOT EXISTS coupon_usages (
    id SERIAL PRIMARY KEY,
    coupon_id INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_telegram_id VARCHAR(50) NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 7. КОНСТРУКТОР И ШАБЛОНЫ
-- ===============================

-- Шаблоны конструктора
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    preview_image VARCHAR(500),
    blocks_data JSON NOT NULL,
    metadata JSON,
    is_public BOOLEAN DEFAULT TRUE,
    is_premium BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Дизайны конструктора (сохраненные дизайны пользователей)
CREATE TABLE IF NOT EXISTS designs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    design_data JSON NOT NULL,
    preview_image VARCHAR(500),
    is_template BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    tags JSON,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Библиотека блоков
CREATE TABLE IF NOT EXISTS blocks_library (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    preview_image VARCHAR(500),
    block_data JSON NOT NULL,
    default_props JSON,
    is_premium BOOLEAN DEFAULT FALSE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 8. ФАЙЛЫ И МЕДИА
-- ===============================

-- Загруженные файлы
CREATE TABLE IF NOT EXISTS media_files (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    alt_text VARCHAR(255),
    description TEXT,
    folder VARCHAR(255),
    is_public BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 9. ПОДПИСЧИКИ БОТОВ
-- ===============================

-- Подписчики ботов (покупатели в Telegram)
CREATE TABLE IF NOT EXISTS bot_subscribers (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    telegram_user_id VARCHAR(50) NOT NULL,
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    language_code VARCHAR(10),
    phone VARCHAR(50),
    
    -- Статус
    is_active BOOLEAN DEFAULT TRUE,
    is_blocked BOOLEAN DEFAULT FALSE,
    is_vip BOOLEAN DEFAULT FALSE,
    
    -- Активность
    last_interaction TIMESTAMP WITH TIME ZONE,
    interaction_count INTEGER DEFAULT 0,
    message_count INTEGER DEFAULT 0,
    
    -- Покупки
    orders_count INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    
    -- Источники и метрики
    source VARCHAR(100),
    utm_source VARCHAR(100),
    utm_campaign VARCHAR(100),
    referrer_id VARCHAR(50),
    
    -- Геолокация
    country VARCHAR(100),
    city VARCHAR(100),
    timezone VARCHAR(50),
    
    -- Дополнительные данные
    metadata JSON,
    preferences JSON,
    tags JSON,
    
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- ===============================
-- 10. АНАЛИТИКА И СТАТИСТИКА
-- ===============================

-- Аналитика событий
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    user_telegram_id VARCHAR(50),
    subscriber_id INTEGER REFERENCES bot_subscribers(id),
    session_id VARCHAR(100),
    
    -- Контекст события
    page VARCHAR(255),
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES shop_categories(id) ON DELETE SET NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
    
    -- Данные события
    event_data JSON,
    user_agent TEXT,
    ip_address VARCHAR(50),
    referrer VARCHAR(500),
    
    -- Геолокация
    country VARCHAR(100),
    city VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Сводная аналитика магазинов (кэш для быстрого доступа)
CREATE TABLE IF NOT EXISTS shop_analytics_summary (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER UNIQUE NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    
    -- Пользователи
    total_visitors INTEGER DEFAULT 0,
    unique_visitors_today INTEGER DEFAULT 0,
    unique_visitors_week INTEGER DEFAULT 0,
    unique_visitors_month INTEGER DEFAULT 0,
    
    -- Заказы
    total_orders INTEGER DEFAULT 0,
    orders_today INTEGER DEFAULT 0,
    orders_week INTEGER DEFAULT 0,
    orders_month INTEGER DEFAULT 0,
    
    -- Выручка
    total_revenue DECIMAL(12,2) DEFAULT 0,
    revenue_today DECIMAL(12,2) DEFAULT 0,
    revenue_week DECIMAL(12,2) DEFAULT 0,
    revenue_month DECIMAL(12,2) DEFAULT 0,
    
    -- Конверсии
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    
    -- Товары
    total_products INTEGER DEFAULT 0,
    out_of_stock_products INTEGER DEFAULT 0,
    
    -- Обновление
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 11. УВЕДОМЛЕНИЯ
-- ===============================

-- Шаблоны уведомлений
CREATE TABLE IF NOT EXISTS notification_templates (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    message TEXT NOT NULL,
    variables JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Уведомления пользователей
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    data JSON,
    is_read BOOLEAN DEFAULT FALSE,
    is_sent BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 12. ИНТЕГРАЦИИ И API
-- ===============================

-- API ключи пользователей
CREATE TABLE IF NOT EXISTS api_keys (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL,
    permissions JSON,
    last_used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Webhooks
CREATE TABLE IF NOT EXISTS webhooks (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    events JSON NOT NULL,
    secret VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    last_triggered_at TIMESTAMP WITH TIME ZONE,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Логи webhook-ов
CREATE TABLE IF NOT EXISTS webhook_logs (
    id SERIAL PRIMARY KEY,
    webhook_id INTEGER NOT NULL REFERENCES webhooks(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    response_status INTEGER,
    response_body TEXT,
    error_message TEXT,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- 13. НАСТРОЙКИ И КОНФИГУРАЦИЯ
-- ===============================

-- Глобальные настройки системы
CREATE TABLE IF NOT EXISTS system_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Настройки пользователей
CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    key VARCHAR(255) NOT NULL,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, key)
);

-- Настройки магазинов
CREATE TABLE IF NOT EXISTS shop_settings (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
    category VARCHAR(100) NOT NULL,
    key VARCHAR(255) NOT NULL,
    value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(shop_id, category, key)
);

-- ===============================
-- 14. ЛОГИ И АУДИТ
-- ===============================

-- Логи активности
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    shop_id INTEGER REFERENCES shops(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100),
    entity_id INTEGER,
    description TEXT,
    ip_address VARCHAR(50),
    user_agent TEXT,
    data JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Логи ошибок
CREATE TABLE IF NOT EXISTS error_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    shop_id INTEGER REFERENCES shops(id) ON DELETE SET NULL,
    error_type VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    url VARCHAR(500),
    ip_address VARCHAR(50),
    user_agent TEXT,
    data JSON,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================
-- ИНДЕКСЫ ДЛЯ ПРОИЗВОДИТЕЛЬНОСТИ
-- ===============================

-- Основные индексы
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan);
CREATE INDEX IF NOT EXISTS idx_telegram_profiles_telegram_id ON telegram_user_profiles(telegram_id);
CREATE INDEX IF NOT EXISTS idx_auth_codes_code ON auth_codes(code);
CREATE INDEX IF NOT EXISTS idx_auth_codes_expires_at ON auth_codes(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_shops_user_id ON shops(user_id);
CREATE INDEX IF NOT EXISTS idx_shops_domain_slug ON shops(domain_slug);
CREATE INDEX IF NOT EXISTS idx_shops_is_published ON shops(is_published);

CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_available ON products(is_available);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(shop_id, slug);

CREATE INDEX IF NOT EXISTS idx_orders_shop_id ON orders(shop_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_telegram_id ON orders(user_telegram_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

CREATE INDEX IF NOT EXISTS idx_bot_subscribers_shop_id ON bot_subscribers(shop_id);
CREATE INDEX IF NOT EXISTS idx_bot_subscribers_telegram_user_id ON bot_subscribers(telegram_user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_bot_subscribers_unique ON bot_subscribers(shop_id, telegram_user_id);

CREATE INDEX IF NOT EXISTS idx_analytics_shop_id ON analytics(shop_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

CREATE INDEX IF NOT EXISTS idx_media_files_user_id ON media_files(user_id);
CREATE INDEX IF NOT EXISTS idx_media_files_shop_id ON media_files(shop_id);

-- ===============================
-- ТЕСТОВЫЕ ДАННЫЕ
-- ===============================

-- Планы подписок
INSERT INTO subscription_plans (name, description, price, duration_days, features, max_shops, max_products, max_orders) VALUES
('Free', 'Бесплатный план', 0.00, 365, '["Базовый конструктор", "1 магазин", "До 10 товаров"]', 1, 10, 50),
('Pro', 'Профессиональный план', 990.00, 30, '["Полный конструктор", "5 магазинов", "Неограниченно товаров", "Аналитика"]', 5, -1, -1),
('Enterprise', 'Корпоративный план', 2990.00, 30, '["Все функции", "Неограниченно магазинов", "Приоритетная поддержка", "API доступ"]', -1, -1, -1)
ON CONFLICT DO NOTHING;

-- Тестовый пользователь
INSERT INTO users (telegram_id, username, first_name, subscription_plan) VALUES 
('123456789', 'testuser', 'Test User', 'pro') 
ON CONFLICT (telegram_id) DO NOTHING;

-- Остальные тестовые данные создаются автоматически через внешние ключи

-- ===============================
-- КОММЕНТАРИИ К ТАБЛИЦАМ
-- ===============================

-- COMMENT ON DATABASE - комментарий к базе данных
-- TeleShop Constructor - Полная база данных для многопользовательской SaaS платформы создания Telegram магазинов

-- Готово! Полная схема базы данных создана.
-- Включает 40+ таблиц для всех аспектов TeleShop Constructor 