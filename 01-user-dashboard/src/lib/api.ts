import axios from 'axios';
import { API_CONFIG } from './config';

// Простая версия API для билда
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Auth API
export const authApi = {
  login: async (code: string) => {
    const response = await api.post('/auth/login', { code });
    return response.data;
  },
  logout: async () => ({ success: true }),
  checkAuth: async () => ({ authenticated: false }),
  getCurrentUser: async () => ({ id: 1, name: 'User' })
};

// Shops API
export const shopsApi = {
  getAll: async () => [],
  getById: async (id: number) => ({ id, name: 'Shop', owner_id: 1, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
  create: async (shop: any) => ({ id: Date.now(), ...shop, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
  update: async (id: number, shop: any) => ({ id, name: 'Shop', owner_id: 1, is_active: shop.is_active, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), ...shop }),
  delete: async (id: number) => {}
};

// Analytics API
export const analyticsApi = {
  getDashboardStats: async () => ({
    total_revenue: 0,
    total_orders: 0,
    total_customers: 0,
    conversion_rate: 0,
    revenue_change: 0,
    orders_change: 0,
    customers_change: 0,
    conversion_change: 0
  }),
  getSalesChart: async () => [],
  getPopularProducts: async () => [],
  getRecentOrders: async () => [],
  getCustomerActivity: async () => []
};

// Bots API
export const botsApi = {
  getAll: async () => [],
  start: async (id: number) => {},
  stop: async (id: number) => {}
};

// TeleShop API для конструктора
export const teleShopAPI = {
  saveDesign: async (designData: any) => {
    return { success: true, design_id: Date.now() };
  },
  getDesigns: async () => [],
  getShopPreviewUrl: (shopId: string) => `http://localhost:3000/shop/${shopId}`
};

export default api; 