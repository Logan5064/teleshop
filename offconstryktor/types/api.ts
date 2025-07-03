// API типы для TeleShop Constructor

import { BlockData } from './blocks'
import { Template } from './constructor'

// Базовый API ответ
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
  timestamp: string
}

// Пользователь
export interface User {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

// Магазин
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

// Товар
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

// Заказ
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

// Статистика дашборда
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

// Данные графика продаж
export interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

// Популярный товар
export interface PopularProduct {
  id: number;
  name: string;
  total_orders: number;
  total_revenue: number;
  shop_name: string;
}

// Недавний заказ
export interface RecentOrder {
  id: number;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

// Активность клиента
export interface CustomerActivity {
  telegram_id: number;
  customer_name: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

// Сохранение проекта
export interface SaveProjectRequest {
  name: string
  description?: string
  blocks: BlockData[]
  settings: Record<string, unknown>
}

export interface SaveProjectResponse {
  id: string
  url: string
  createdAt: string
}

// Загрузка проекта
export interface LoadProjectResponse {
  id: string
  name: string
  description?: string
  blocks: BlockData[]
  settings: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

// Шаблоны
export interface GetTemplatesResponse {
  templates: Template[]
  categories: string[]
}

export interface CreateTemplateRequest {
  name: string
  description: string
  category: string
  blocks: BlockData[]
  preview?: string
}

// Публикация магазина
export interface PublishShopRequest {
  name: string
  description?: string
  blocks: BlockData[]
  settings: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
    theme: string
  }
}

export interface PublishShopResponse {
  shopId: string
  botToken: string
  shopUrl: string
  telegramBotUrl: string
}

// Аналитика
export interface AnalyticsData {
  views: number
  clicks: number
  conversions: number
  revenue: number
  date: string
}

export interface GetAnalyticsResponse {
  data: AnalyticsData[]
  summary: {
    totalViews: number
    totalClicks: number
    totalConversions: number
    totalRevenue: number
    conversionRate: number
  }
}

// Пользователь
export interface User {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  created_at: string;
  updated_at: string;
}

// Магазин
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

// Товар
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

// Заказ
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

// Статистика дашборда
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

// Данные графика продаж
export interface SalesChartData {
  date: string;
  revenue: number;
  orders: number;
}

// Популярный товар
export interface PopularProduct {
  id: number;
  name: string;
  total_orders: number;
  total_revenue: number;
  shop_name: string;
}

// Недавний заказ
export interface RecentOrder {
  id: number;
  customer_name: string;
  product_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

// Активность клиента
export interface CustomerActivity {
  telegram_id: number;
  customer_name: string;
  total_orders: number;
  total_spent: number;
  last_order_date: string;
}

// Ошибки API
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
} 