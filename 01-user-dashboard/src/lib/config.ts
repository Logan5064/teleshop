// TeleShop Configuration
const isProd = process.env.NODE_ENV === 'production';
const prodHost = '178.236.17.93'; // Production server IP

export const API_CONFIG = {
  BASE_URL: isProd ? `http://${prodHost}:8000` : 'http://localhost:8000',
  AUTH_URL: isProd ? `http://${prodHost}:8000/auth` : 'http://localhost:8000/auth',
  SECURE_URL: isProd ? `http://${prodHost}:8000/secure` : 'http://localhost:8000/secure',
  CONSTRUCTOR_URL: isProd ? `http://${prodHost}:8000/constructor` : 'http://localhost:8000/constructor',
  TIMEOUT: 10000,
  VERSION: '2.0.0',
  RETRY_ATTEMPTS: 3,
  // Локальные туннели используются только в dev режиме
  IS_TUNNELED: isProd 
    ? false 
    : process.env.NEXT_PUBLIC_IS_TUNNELED === 'true',
  TUNNEL_URL: isProd 
    ? undefined 
    : process.env.NEXT_PUBLIC_TUNNEL_URL || undefined
};

export const FEATURES = {
  CONSTRUCTOR_ENABLED: true,
  ANALYTICS_ENABLED: true,
  PAYMENTS_ENABLED: false, // TODO: реализовать платежи
  NOTIFICATIONS_ENABLED: true,
  MULTI_LANGUAGE: false
};

export const TELEGRAM_CONFIG = {
  BOT_NAME: process.env.NEXT_PUBLIC_BOT_NAME || '@odnorazki_by_bot',
  WEBAPP_URL: isProd 
    ? `http://${prodHost}:3000`
    : process.env.NEXT_PUBLIC_WEBAPP_URL || 'http://localhost:3000'
};

export const UI_CONFIG = {
  THEME: 'light',
  PRIMARY_COLOR: '#3B82F6',
  SECONDARY_COLOR: '#6B7280',
  SUCCESS_COLOR: '#10B981',
  ERROR_COLOR: '#EF4444',
  WARNING_COLOR: '#F59E0B'
};
