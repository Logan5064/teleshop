// Simple API for Constructor
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
    const params = category ? { category } : {};
    const response = await fetch(`${API_BASE}/templates`, { params });
    return response.json();
  },

  getById: async (id: number): Promise<any> => {
    const response = await fetch(`${API_BASE}/templates/${id}`);
    return response.json();
  }
};

export default API_BASE; 