-- Создание недостающих таблиц для TeleShop Constructor

-- 1. Категории товаров
CREATE TABLE IF NOT EXISTS shop_categories (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id),
    name VARCHAR NOT NULL,
    description TEXT,
    emoji VARCHAR,
    image_url VARCHAR,
    position INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_shop_categories_shop_id ON shop_categories(shop_id);

-- 2. Товары
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id),
    category_id INTEGER REFERENCES shop_categories(id),
    name VARCHAR NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    currency VARCHAR DEFAULT 'RUB',
    image_url VARCHAR,
    images JSON,
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER,
    sku VARCHAR,
    slug VARCHAR,
    tags JSON,
    specifications JSON,
    views_count INTEGER DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_products_shop_id ON products(shop_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);

-- 3. Заказы
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id),
    user_telegram_id VARCHAR NOT NULL,
    total_amount FLOAT NOT NULL,
    status VARCHAR DEFAULT 'pending',
    items JSON NOT NULL,
    customer_name VARCHAR,
    customer_phone VARCHAR,
    delivery_address TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_orders_shop_id ON orders(shop_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_telegram_id ON orders(user_telegram_id);

-- 4. Аналитика
CREATE TABLE IF NOT EXISTS analytics (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id),
    event_type VARCHAR NOT NULL,
    user_telegram_id VARCHAR,
    page VARCHAR,
    data JSON,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_shop_id ON analytics(shop_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);

-- 5. Подписчики ботов
CREATE TABLE IF NOT EXISTS bot_subscribers (
    id SERIAL PRIMARY KEY,
    shop_id INTEGER NOT NULL REFERENCES shops(id),
    telegram_user_id VARCHAR NOT NULL,
    username VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    language_code VARCHAR,
    is_active BOOLEAN DEFAULT TRUE,
    is_blocked BOOLEAN DEFAULT FALSE,
    last_interaction TIMESTAMP WITH TIME ZONE,
    interaction_count INTEGER DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    total_spent INTEGER DEFAULT 0,
    source VARCHAR,
    metadata JSON,
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_bot_subscribers_shop_id ON bot_subscribers(shop_id);
CREATE INDEX IF NOT EXISTS idx_bot_subscribers_telegram_user_id ON bot_subscribers(telegram_user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_bot_subscribers_unique ON bot_subscribers(shop_id, telegram_user_id);

-- Добавляем комментарии к таблицам
COMMENT ON TABLE shop_categories IS 'Категории товаров в магазинах';
COMMENT ON TABLE products IS 'Товары в магазинах';
COMMENT ON TABLE orders IS 'Заказы пользователей';
COMMENT ON TABLE analytics IS 'Аналитика взаимодействий';
COMMENT ON TABLE bot_subscribers IS 'Подписчики Telegram ботов'; 