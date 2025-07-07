import axios from 'axios';
import type { User, TelegramProfile } from '@/types';

// Создаем инстанс axios с базовыми настройками
const api = axios.create({
  baseURL: '', // Используем относительные пути для Next.js API роутов
  withCredentials: true, // Важно для работы с сессиями
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик для добавления токена авторизации
api.interceptors.request.use(
  (config) => {
    // Добавляем токен из localStorage если он есть
    const adminToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Очищаем токены при ошибке авторизации
      if (typeof window !== 'undefined') {
        localStorage.removeItem('admin_token');
      }
      // Редирект на страницу логина при истечении сессии
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface UserSettings {
  id: number;
  user_id: number;
  theme: 'light' | 'dark';
  language: string;
  notifications_enabled: boolean;
  email_notifications: boolean;
}

// Типы данных магазина
export interface Shop {
  id: number;
  user_id: number;
  name: string;
  description: string;
  status: string;
  created_at: string;
  settings: ShopSettings;
}

export interface ShopSettings {
  id: number;
  shop_id: number;
  theme: string;
  currency: string;
  contact_info: {
    phone: string;
    email: string;
    address: string;
  };
  payment_methods: string[];
  delivery_methods: string[];
}

export interface Category {
  id: number;
  shop_id: number;
  name: string;
  description: string;
  products_count: number;
  is_active: boolean;
  color: string;
  icon: string;
  created_at: string;
}

export interface Product {
  id: number;
  shop_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  old_price: number | null;
  quantity: number;
  status: string;
  image_url: string;
  is_new: boolean;
  is_popular: boolean;
  sales: number;
  views: number;
  created_at: string;
}

export interface Order {
  id: number;
  shop_id: number;
  customer: {
    telegram_id: string;
    name: string;
    phone: string;
  };
  items: Array<{
    product_id: number;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment_method: string;
  delivery_address: string;
  created_at: string;
}

export const authApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  getTelegramProfile: async (): Promise<TelegramProfile> => {
    const response = await api.get('/api/auth/telegram-profile');
    return response.data;
  },

  logout: async (): Promise<void> => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  }
};

// API клиент
export const apiClient = {
  // Данные пользователя
  auth: {
    me: () => api.get<User>('/auth/me'),
    logout: () => api.post('/auth/logout'),
    telegramProfile: () => api.get('/auth/telegram-profile'),
  },

  // Профиль и настройки пользователя
  profile: {
    get: () => api.get<User>('/profile'),
    update: (data: Partial<User>) => api.put<User>('/profile', data),
    settings: {
      get: () => api.get<UserSettings>('/profile/settings'),
      update: (data: Partial<UserSettings>) => api.put<UserSettings>('/profile/settings', data),
    }
  },

  // Управление магазинами пользователя
  shops: {
    list: () => api.get<Shop[]>('/shops'),
    get: (id: number) => api.get<Shop>(`/shops/${id}`),
    create: (data: Partial<Shop>) => api.post<Shop>('/shops', data),
    update: (id: number, data: Partial<Shop>) => api.put<Shop>(`/shops/${id}`, data),
    delete: (id: number) => api.delete(`/shops/${id}`),
    settings: {
      get: (shopId: number) => api.get<ShopSettings>(`/shops/${shopId}/settings`),
      update: (shopId: number, data: Partial<ShopSettings>) => 
        api.put<ShopSettings>(`/shops/${shopId}/settings`, data),
    }
  },

  // Данные конкретного магазина
  shop: {
    // Категории
    categories: {
      list: (shopId: number) => api.get<Category[]>(`/shops/${shopId}/categories`),
      get: (shopId: number, id: number) => api.get<Category>(`/shops/${shopId}/categories/${id}`),
      create: (shopId: number, data: Partial<Category>) => 
        api.post<Category>(`/shops/${shopId}/categories`, data),
      update: (shopId: number, id: number, data: Partial<Category>) => 
        api.put<Category>(`/shops/${shopId}/categories/${id}`, data),
      delete: (shopId: number, id: number) => 
        api.delete(`/shops/${shopId}/categories/${id}`),
    },

    // Товары
    products: {
      list: (shopId: number) => api.get<Product[]>(`/shops/${shopId}/products`),
      get: (shopId: number, id: number) => api.get<Product>(`/shops/${shopId}/products/${id}`),
      create: (shopId: number, data: Partial<Product>) => 
        api.post<Product>(`/shops/${shopId}/products`, data),
      update: (shopId: number, id: number, data: Partial<Product>) => 
        api.put<Product>(`/shops/${shopId}/products/${id}`, data),
      delete: (shopId: number, id: number) => 
        api.delete(`/shops/${shopId}/products/${id}`),
    },

    // Заказы
    orders: {
      list: (shopId: number) => api.get<Order[]>(`/shops/${shopId}/orders`),
      get: (shopId: number, id: number) => api.get<Order>(`/shops/${shopId}/orders/${id}`),
      update: (shopId: number, id: number, data: Partial<Order>) => 
        api.put<Order>(`/shops/${shopId}/orders/${id}`, data),
    },

    // Конструктор
    constructor: {
      getTemplate: (shopId: number) => api.get(`/shops/${shopId}/constructor/template`),
      saveTemplate: (shopId: number, data: any) => 
        api.post(`/shops/${shopId}/constructor/template`, data),
      preview: (shopId: number) => api.get(`/shops/${shopId}/constructor/preview`),
    },

    // Аналитика
    analytics: {
      dashboard: (shopId: number) => api.get(`/shops/${shopId}/analytics/dashboard`),
      sales: (shopId: number, period: string) => 
        api.get(`/shops/${shopId}/analytics/sales?period=${period}`),
      products: (shopId: number) => api.get(`/shops/${shopId}/analytics/products`),
      customers: (shopId: number) => api.get(`/shops/${shopId}/analytics/customers`),
    },

    // Пользователи магазина (покупатели)
    customers: {
      list: (shopId: number) => api.get(`/shops/${shopId}/customers`),
      get: (shopId: number, customerId: string) => 
        api.get(`/shops/${shopId}/customers/${customerId}`),
      stats: (shopId: number) => api.get(`/shops/${shopId}/customers/stats`),
    }
  }
};

// Алиасы для обратной совместимости
export const shopsApi = apiClient.shops;
export const teleShopAPI = apiClient;

export default apiClient; 