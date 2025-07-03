import axios from 'axios';
import type {
  DashboardStats,
  SalesChartData,
  PopularProduct,
  RecentOrder,
  CustomerActivity,
  Shop,
  Product,
  Order,
  User,
  ApiResponse
} from '@/types';

// PostgreSQL API configuration
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен авторизации к каждому запросу
api.interceptors.request.use((config) => {
  // Пробуем получить токен из localStorage, если не получается - из sessionStorage
  let token = null;
  try {
    token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  } catch (e) {
    console.warn('Storage access blocked, trying sessionStorage');
    token = sessionStorage.getItem('auth_token');
  }
  
  if (token) {
    // Добавляем Bearer префикс если его нет
    const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    config.headers.Authorization = authHeader;
  }
  return config;
});

// Обрабатываем ошибки авторизации
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Удаляем токены из всех хранилищ
      try {
        localStorage.removeItem('auth_token');
      } catch (e) {
        console.warn('localStorage not available');
      }
      try {
        sessionStorage.removeItem('auth_token');
      } catch (e) {
        console.warn('sessionStorage not available');
      }
      // Пусть middleware отвечает за все редиректы
      console.log('401 error - clearing tokens, middleware will handle redirect')
    }
    return Promise.reject(error);
  }
);

// Утилитарная функция для сохранения токена
function saveToken(token: string) {
  console.log('💾 SAVING TOKEN:', token.substring(0, 20) + '...');
  
  // Пробуем сохранить в localStorage
  try {
    localStorage.setItem('auth_token', token);
    console.log('✅ TOKEN SAVED TO localStorage');
  } catch (e) {
    console.warn('❌ localStorage blocked, trying sessionStorage');
    try {
      sessionStorage.setItem('auth_token', token);
      console.log('✅ TOKEN SAVED TO sessionStorage');
    } catch (e2) {
      console.error('❌ Both localStorage and sessionStorage blocked!');
      throw new Error('Storage не доступен в режиме инкогнито');
    }
  }
  
  // ПРИНУДИТЕЛЬНО устанавливаем cookie через JavaScript
  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // 24 часа
    document.cookie = `session_token=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    console.log('🍪 COOKIE FORCE SET via document.cookie');
  } catch (e) {
    console.warn('❌ Cookie setting failed:', e);
  }
}

// Утилитарная функция для получения токена
function getToken(): string | null {
  try {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  } catch (e) {
    console.warn('Storage access blocked');
    try {
      return sessionStorage.getItem('auth_token');
    } catch (e2) {
      return null;
    }
  }
}

// Analytics API (PostgreSQL данные)
export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      // Получаем данные из PostgreSQL
      const [designsRes, shopsRes] = await Promise.all([
        api.get('/designs'),
        api.get('/shops')
      ]);

      return {
        total_revenue: 0, // TODO: считать из заказов
        total_orders: 0,  // TODO: считать из заказов
        total_customers: 0, // TODO: считать из подписчиков ботов
        conversion_rate: 0, // TODO: считать конверсию
        revenue_change: 0,
        orders_change: 0,
        customers_change: 0,
        conversion_change: 0
      };
    } catch (error) {
      // Возвращаем заглушку
      return {
        total_revenue: 0,
        total_orders: 0,
        total_customers: 0,
        conversion_rate: 0,
        revenue_change: 0,
        orders_change: 0,
        customers_change: 0,
        conversion_change: 0
      };
    }
  },

  getSalesChart: async (days: number = 30): Promise<SalesChartData[]> => {
    // Заглушка - генерируем данные
    const data: SalesChartData[] = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 10000),
        orders: Math.floor(Math.random() * 100)
      });
    }
    
    return data;
  },

  getPopularProducts: async (limit: number = 10): Promise<PopularProduct[]> => {
    // TODO: реализовать через PostgreSQL
    return [];
  },

  getRecentOrders: async (limit: number = 10): Promise<RecentOrder[]> => {
    // TODO: реализовать через PostgreSQL
    return [];
  },

  getCustomerActivity: async (limit: number = 10): Promise<CustomerActivity[]> => {
    // TODO: реализовать через PostgreSQL
    return [];
  }
};

// Shops API (PostgreSQL)
export const shopsApi = {
  getAll: async (): Promise<Shop[]> => {
    try {
      const response = await api.get<Shop[]>('/shops');
      return response.data;
    } catch (error) {
      console.warn('Shops API недоступен, возвращаем пустой массив');
      return [];
    }
  },

  getById: async (id: number): Promise<Shop> => {
    const response = await api.get<Shop>(`/shops/${id}`);
    return response.data;
  },

  create: async (shop: Omit<Shop, 'id' | 'created_at' | 'updated_at'>): Promise<Shop> => {
    const response = await api.post<Shop>('/shops', shop);
    return response.data;
  },

  update: async (id: number, shop: Partial<Shop>): Promise<Shop> => {
    const response = await api.put<Shop>(`/shops/${id}`, shop);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/shops/${id}`);
  },
};

// Products API (ВРЕМЕННО: заглушки, пока не реализованы в secure API)
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    // Временная заглушка - возвращаем пустой массив
    return Promise.resolve([]);
  },

  getByShop: async (shopId: number): Promise<Product[]> => {
    // Временная заглушка - возвращаем пустой массив
    return Promise.resolve([]);
  },

  getById: async (id: number): Promise<Product> => {
    throw new Error('Products API еще не реализован в secure версии');
  },

  create: async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> => {
    throw new Error('Products API еще не реализован в secure версии');
  },

  update: async (id: number, product: Partial<Product>): Promise<Product> => {
    throw new Error('Products API еще не реализован в secure версии');
  },

  delete: async (id: number): Promise<void> => {
    throw new Error('Products API еще не реализован в secure версии');
  },
};

// Orders API (ВРЕМЕННО: заглушки, пока не реализованы в secure API)
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    // Временная заглушка - возвращаем пустой массив
    return Promise.resolve([]);
  },

  getByShop: async (shopId: number): Promise<Order[]> => {
    // Временная заглушка - возвращаем пустой массив
    return Promise.resolve([]);
  },

  getById: async (id: number): Promise<Order> => {
    throw new Error('Orders API еще не реализован в secure версии');
  },

  updateStatus: async (id: number, status: Order['status']): Promise<Order> => {
    throw new Error('Orders API еще не реализован в secure версии');
  },
};

// Users API (ВРЕМЕННО: заглушки, пока не реализованы в secure API)
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    // Используем аналитический endpoint для получения пользователей ботов
    try {
      const response = await api.get<User[]>('/secure/analytics/users');
    return response.data;
    } catch (error) {
      // Если не работает, возвращаем пустой массив
      return Promise.resolve([]);
    }
  },

  getById: async (id: number): Promise<User> => {
    throw new Error('Users API еще не реализован в secure версии');
  },
};

// Auth API (PostgreSQL авторизация через Telegram)
export const authApi = {
  login: async (code: string): Promise<{ success: boolean; message?: string; session_token?: string; user_id?: number }> => {
    try {
      const response = await api.post('/auth/login', { code }, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('✅ AUTH API RESPONSE:', response.data);
      
      if (response.data.success && response.data.session_token) {
        // Сохраняем токен
        saveToken(response.data.session_token);
        return response.data;
      }
      
      return response.data;
    } catch (error: any) {
      // Правильно обрабатываем ошибки FastAPI
      let errorMessage = 'Ошибка авторизации';
      
      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        
        // Если detail это массив (валидационные ошибки)
        if (Array.isArray(detail)) {
          errorMessage = detail.map(err => err.msg || 'Ошибка валидации').join(', ');
        } 
        // Если detail это строка
        else if (typeof detail === 'string') {
          errorMessage = detail;
        }
        // Если detail это объект с msg
        else if (detail.msg) {
          errorMessage = detail.msg;
        }
      }
      
      return { 
        success: false, 
        message: errorMessage
      };
    }
  },

  logout: async (): Promise<{ success: boolean }> => {
    try {
      localStorage.removeItem('auth_token');
    } catch (e) {
      console.warn('localStorage not available');
    }
    try {
      sessionStorage.removeItem('auth_token');
    } catch (e) {
      console.warn('sessionStorage not available');  
    }
    return { success: true };
  },

  checkAuth: async (): Promise<{ authenticated: boolean; user?: any }> => {
    const token = getToken();
    if (!token) {
      return { authenticated: false };
    }
    
    try {
      // Проверяем токен через специальный endpoint /auth/check
      const response = await api.get('/auth/check');
      return { authenticated: true, user: response.data };
    } catch (error) {
      // Удаляем токены из всех хранилищ
      try {
        localStorage.removeItem('auth_token');
      } catch (e) {
        console.warn('localStorage not available');
      }
      try {
        sessionStorage.removeItem('auth_token');
      } catch (e) {
        console.warn('sessionStorage not available');
      }
      return { authenticated: false };
    }
  },

  getCurrentUser: async (): Promise<any> => {
    // Пока нет отдельного endpoint для получения данных пользователя
    return { id: 1, name: 'User' };
  }
};

// Designs API (для конструктора)
export const designsApi = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/designs');
    return response.data;
  },

  getById: async (id: number): Promise<any> => {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  },

  create: async (design: { name: string; description?: string; design_data: any }): Promise<any> => {
    const response = await api.post('/designs', design);
    return response.data;
  },

  update: async (id: number, design: { name?: string; description?: string; design_data?: any }): Promise<any> => {
    const response = await api.put(`/designs/${id}`, design);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/designs/${id}`);
  }
};

// Templates API (для конструктора)
export const templatesApi = {
  getAll: async (category?: string): Promise<any[]> => {
    const params = category ? { category } : {};
    const response = await api.get('/templates', { params });
    return response.data;
  },

  getById: async (id: number): Promise<any> => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  }
};

export default api; 