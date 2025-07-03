// Simple API for Constructor

// Типы для исправления билда
interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  conversion_rate: number;
  revenue_change: number;
  orders_change: number;
  customers_change: number;
  conversion_change: number;
}

interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

interface PopularProduct {
  id: number;
  name: string;
  total_orders: number;
  total_revenue: number;
  shop_name: string;
}

interface RecentOrder {
  id: number;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

interface CustomerActivity {
  telegram_id: number;
  customer_name: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available: boolean;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  customer_telegram_id: number;
  customer_name?: string;
  customer_username?: string;
  shop_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// TeleShop API
export const teleShopAPI = {
  getDesigns: async () => {
    const response = await fetch(`${API_BASE}/designs`);
    return response.json();
  },
  
  saveDesign: async (design: any) => {
    const response = await fetch(`${API_BASE}/designs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(design),
    });
    return response.json();
  }
};

// Auth API
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  
  verify: async (token: string) => {
    const response = await fetch(`${API_BASE}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return response.json();
  }
};

// Shops API
export const shopsApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE}/shops`);
    return response.json();
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_BASE}/shops/${id}`);
    return response.json();
  },
  
  create: async (shopData: any) => {
    const response = await fetch(`${API_BASE}/shops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shopData),
    });
    return response.json();
  }
};

// Analytics API (PostgreSQL данные)
export const analyticsApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    try {
      // Получаем данные из PostgreSQL
      const [designsRes, shopsRes] = await Promise.all([
        fetch(`${API_BASE}/designs`),
        fetch(`${API_BASE}/shops`)
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
      const response = await fetch(`${API_BASE}/secure/analytics/users`);
      return response.json();
    } catch (error) {
      // Если не работает, возвращаем пустой массив
      return Promise.resolve([]);
    }
  },

  getById: async (id: number): Promise<User> => {
    throw new Error('Users API еще не реализован в secure версии');
  },
};

// Designs API (для конструктора)
export const designsApi = {
  getAll: async (): Promise<any[]> => {
    const response = await fetch(`${API_BASE}/designs`);
    return response.json();
  },

  getById: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/designs/${id}`);
    return response.json();
  },

  create: async (design: { name: string; description?: string; design_data: any }): Promise<any> => {
    const response = await fetch(`${API_BASE}/designs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(design),
    });
    return response.json();
  },

  update: async (id: number, design: { name?: string; description?: string; design_data?: any }): Promise<any> => {
    const response = await fetch(`${API_BASE}/designs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(design),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE}/designs/${id}`, { method: 'DELETE' });
  }
};

// Templates API (для конструктора)
export const templatesApi = {
  getAll: async (category?: string): Promise<any[]> => {
    const url = category 
      ? `${API_BASE}/templates?category=${encodeURIComponent(category)}`
      : `${API_BASE}/templates`;
    const response = await fetch(url);
    return response.json();
  },

  getById: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/templates/${id}`);
    return response.json();
  }
};

export default API_BASE; 