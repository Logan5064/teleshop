/**
 * 🔧 TeleShop Unified Configuration
 * Единая конфигурация для всего приложения (основная платформа + конструктор)
 */

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Production server IP
const PROD_HOST = '77.73.232.46';

// API Configuration
export const API_CONFIG = {
  // Backend API (Python FastAPI)
  BACKEND_URL: isProduction 
    ? `http://${PROD_HOST}:8000`
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    
  BACKEND_API_URL: isProduction 
    ? `http://${PROD_HOST}:8000/secure`
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // Frontend URLs
  FRONTEND_URL: isProduction 
    ? `http://${PROD_HOST}:3000`
    : process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    
  CONSTRUCTOR_URL: isProduction 
    ? `http://${PROD_HOST}:3001`
    : process.env.NEXT_PUBLIC_CONSTRUCTOR_URL || 'http://localhost:3001',
  
  // WebSocket URLs  
  WS_URL: isProduction 
    ? `ws://${PROD_HOST}:3000`
    : process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000',
  
  // Tunnel info (for development)
  TUNNEL_URL: process.env.NEXT_PUBLIC_TUNNEL_URL || null,
  IS_TUNNELED: !!process.env.NEXT_PUBLIC_TUNNEL_URL,
} as const;

// Application Ports (for development)
export const PORTS = {
  FRONTEND: 3000,          
  CONSTRUCTOR: 3001,       
  BACKEND: 8000,           
} as const;

// Routes Configuration
export const ROUTES = {
  // Main app routes
  DASHBOARD: '/',
  CONSTRUCTOR: '/constructor',  
  ANALYTICS: '/analytics',
  BOTS: '/bots',
  PRODUCTS: '/products',
  SHOPS: '/shops',
  
  // API routes
  API: {
    AUTH: '/api/auth',
    BOTS: '/api/bots',
    ANALYTICS: '/api/analytics',
    CONSTRUCTOR: '/api/constructor',
  }
} as const;

// Feature flags
export const FEATURES = {
  CONSTRUCTOR_ENABLED: true,    
  DRAG_AND_DROP: true,
  AUTO_SAVE: true,
  TEMPLATES: true,
  PRODUCTION_MODE: isProduction,
} as const;

// Default exports for backward compatibility
export const API_BASE_URL = API_CONFIG.BACKEND_API_URL;
export const BACKEND_URL = API_CONFIG.BACKEND_URL;
export const FRONTEND_URL = API_CONFIG.FRONTEND_URL; 