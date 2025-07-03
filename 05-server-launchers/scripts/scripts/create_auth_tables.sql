-- Создание таблиц для системы авторизации TeleShop Constructor
-- Временные коды и сессии пользователей

-- 🔑 Таблица временных кодов авторизации
CREATE TABLE IF NOT EXISTS auth_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(6) UNIQUE NOT NULL,
    telegram_id VARCHAR(50) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    
    -- Данные пользователя из Telegram
    telegram_username VARCHAR(100),
    telegram_first_name VARCHAR(100),
    telegram_last_name VARCHAR(100),
    
    -- Временные метки
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    is_used BOOLEAN DEFAULT FALSE
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_auth_codes_code ON auth_codes(code);
CREATE INDEX IF NOT EXISTS idx_auth_codes_telegram_id ON auth_codes(telegram_id);
CREATE INDEX IF NOT EXISTS idx_auth_codes_expires_at ON auth_codes(expires_at);

-- 🎫 Таблица активных сессий пользователей  
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    session_token VARCHAR(64) UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telegram_id VARCHAR(50) NOT NULL,
    
    -- IP и User-Agent для безопасности
    ip_address VARCHAR(50),
    user_agent TEXT,
    
    -- Временные метки
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_telegram_id ON user_sessions(telegram_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

-- 👤 Таблица профилей пользователей из Telegram
CREATE TABLE IF NOT EXISTS telegram_user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    telegram_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Данные профиля Telegram
    username VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    language_code VARCHAR(10),
    is_premium BOOLEAN DEFAULT FALSE,
    
    -- Дополнительные данные
    photo_url TEXT,
    bio TEXT,
    
    -- Статистика
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    total_logins INTEGER DEFAULT 1 NOT NULL
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_telegram_profiles_user_id ON telegram_user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_telegram_profiles_telegram_id ON telegram_user_profiles(telegram_id);

-- Комментарии к таблицам
COMMENT ON TABLE auth_codes IS 'Временные коды авторизации (действуют 30 минут)';
COMMENT ON TABLE user_sessions IS 'Активные сессии пользователей (действуют 12 часов)';
COMMENT ON TABLE telegram_user_profiles IS 'Профили пользователей из Telegram с детальной информацией';

-- Проверим что таблицы созданы
SELECT 
    table_name,
    table_comment
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('auth_codes', 'user_sessions', 'telegram_user_profiles')
ORDER BY table_name; 