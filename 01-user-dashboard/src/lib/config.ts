// TeleShop Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  CONSTRUCTOR_URL: process.env.NEXT_PUBLIC_CONSTRUCTOR_URL || 'http://localhost:3001',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3
};

export const FEATURES = {
  CONSTRUCTOR_ENABLED: true,
  ANALYTICS_ENABLED: true,
  PAYMENTS_ENABLED: false, // TODO: реализовать платежи
  NOTIFICATIONS_ENABLED: true,
  MULTI_LANGUAGE: false
};

export const TELEGRAM_CONFIG = {
  BOT_NAME: process.env.NEXT_PUBLIC_BOT_NAME || '@teleshop_constructor_bot',
  WEBAPP_URL: process.env.NEXT_PUBLIC_WEBAPP_URL || 'https://t.me/teleshop_constructor_bot/app'
};

export const UI_CONFIG = {
  THEME: 'light',
  PRIMARY_COLOR: '#3B82F6',
  SECONDARY_COLOR: '#6B7280',
  SUCCESS_COLOR: '#10B981',
  ERROR_COLOR: '#EF4444',
  WARNING_COLOR: '#F59E0B'
};
