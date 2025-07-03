export interface User {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Shop {
  id: number;
  name: string;
  description?: string;
  owner_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  owner?: User;
  products?: Product[];
  orders?: Order[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available: boolean;
  shop_id: number;
  created_at: string;
  updated_at: string;
  shop?: Shop;
}

export interface Order {
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
  shop?: Shop;
  product?: Product;
}

export interface DashboardStats {
  total_revenue: number;
  total_orders: number;
  total_customers: number;
  conversion_rate: number;
  revenue_change: number;
  orders_change: number;
  customers_change: number;
  conversion_change: number;
}

export interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

export interface PopularProduct {
  id: number;
  name: string;
  total_orders: number;
  total_revenue: number;
  shop_name: string;
}

export interface RecentOrder {
  id: number;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

export interface CustomerActivity {
  telegram_id: number;
  customer_name: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
} 