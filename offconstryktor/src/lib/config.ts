/**
 * 🔧 TeleShop Unified Configuration
 * Единая конфигурация для всего приложения (основная платформа + конструктор)
 */

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Tunnel URL support for public access
const TUNNEL_URL = process.env.NEXT_PUBLIC_TUNNEL_URL;

// API Configuration
export const API_CONFIG = {
  // Backend API (Python FastAPI) - ВСЕГДА localhost для server-side запросов
  BACKEND_URL: isDevelopment ? 'http://localhost:8000' : '',
  BACKEND_API_URL: isDevelopment ? 'http://localhost:8000/api' : '/api',
  
  // Frontend URLs - используем туннель если доступен для внешнего доступа
  FRONTEND_URL: TUNNEL_URL || (isDevelopment ? 'http://localhost:3000' : ''),
  
  // WebSocket URLs - используем туннель если доступен  
  WS_URL: TUNNEL_URL ? TUNNEL_URL.replace('https:', 'wss:').replace('http:', 'ws:') : 
          (isDevelopment ? 'ws://localhost:3000' : ''),
  
  // Auth specific - ВСЕГДА localhost для API запросов
  PYTHON_API_BASE: isDevelopment ? 'http://localhost:8000' : '',
  
  // Tunnel info
  IS_TUNNELED: !!TUNNEL_URL,
  TUNNEL_URL: TUNNEL_URL || null,
} as const;

// Application Ports (for development)
export const PORTS = {
  FRONTEND: 3000,          // ✅ Единый фронтенд (объединенный)
  BACKEND: 8000,           // ✅ Python API
  // REMOVED: CONSTRUCTOR: 3001  // ❌ Удален отдельный порт
} as const;

// Routes Configuration
export const ROUTES = {
  // Main app routes
  DASHBOARD: '/',
  CONSTRUCTOR: '/constructor',  // ✅ Встроенный роут
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
  CONSTRUCTOR_INTEGRATED: true,    // ✅ Интегрированный конструктор
  SEPARATE_CONSTRUCTOR: false,     // ❌ Отдельный конструктор отключен
  DRAG_AND_DROP: true,
  AUTO_SAVE: true,
  TEMPLATES: true,
  TUNNEL_MODE: API_CONFIG.IS_TUNNELED,  // ✅ Режим туннеля
} as const;

// Default exports for backward compatibility
export const API_BASE_URL = API_CONFIG.BACKEND_API_URL;
export const BACKEND_URL = API_CONFIG.BACKEND_URL;
export const FRONTEND_URL = API_CONFIG.FRONTEND_URL; 