import axios from 'axios'

// Unified API configuration
import { API_CONFIG } from '@/lib/config';
const API_BASE_URL = API_CONFIG.BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface BotUser {
  id: number
  telegram_user_id: number
  shop_id: number
  username?: string
  first_name?: string
  last_name?: string
  phone?: string
  created_at: string
  last_activity: string
}

export interface BotSession {
  id: number
  user_id: number
  ip_address: string
  user_agent?: string
  device_type?: string
  country?: string
  city?: string
  latitude?: number
  longitude?: number
  started_at: string
  ended_at?: string
}

export interface BotActivity {
  id: number
  user_id: number
  shop_id: number
  activity_type: string
  description?: string
  data?: any
  created_at: string
}

export interface ShopAnalytics {
  id: number
  shop_id: number
  date: string
  unique_users: number
  total_sessions: number
  messages_sent: number
  orders_count: number
  created_at: string
}

export interface AnalyticsStats {
  total_users: number
  active_users_today: number
  total_sessions: number
  countries: Array<{ country: string; count: number }>
  top_users: Array<BotUser & { activity_count: number }>
}

export interface GeographyData {
  country: string
  city: string
  count: number
}

export interface DeviceData {
  device_type: string
  count: number
}

export const analyticsApi = {
  // Отслеживание пользователя
  trackUser: async (data: {
    telegram_user_id: number
    shop_id: number
    username?: string
    first_name?: string
    last_name?: string
    phone?: string
    ip_address: string
    user_agent?: string
  }) => {
    const response = await api.post('/secure/analytics/track-user', data)
    return response.data
  },

  // Отслеживание активности
  trackActivity: async (data: {
    user_id: number
    shop_id: number
    activity_type: string
    description?: string
    data?: any
  }) => {
    const response = await api.post('/secure/analytics/track-activity', data)
    return response.data
  },

  // Получить статистику магазина
  getShopStats: async (shopId: number): Promise<AnalyticsStats> => {
    const response = await api.get<AnalyticsStats>(`/secure/analytics/stats/${shopId}`)
    return response.data
  },

  // Получить пользователей бота
  getBotUsers: async (shopId: number, page: number = 1, limit: number = 50): Promise<BotUser[]> => {
    const response = await api.get<BotUser[]>(`/secure/analytics/users/${shopId}?page=${page}&limit=${limit}`)
    return response.data
  },

  // Получить сессии пользователя
  getUserSessions: async (userId: number): Promise<BotSession[]> => {
    const response = await api.get<BotSession[]>(`/secure/analytics/sessions/${userId}`)
    return response.data
  },

  // Получить активность пользователя
  getUserActivity: async (userId: number, page: number = 1, limit: number = 100): Promise<BotActivity[]> => {
    const response = await api.get<BotActivity[]>(`/secure/analytics/activity/${userId}?page=${page}&limit=${limit}`)
    return response.data
  },

  // Получить общую статистику
  getAllStats: async (): Promise<AnalyticsStats[]> => {
    const response = await api.get<AnalyticsStats[]>('/secure/analytics/stats')
    return response.data
  },

  // Получить географию пользователей
  getGeography: async (shopId?: number): Promise<GeographyData[]> => {
    const endpoint = shopId 
      ? `/secure/analytics/geography/${shopId}`
      : '/secure/analytics/geography'
    const response = await api.get<GeographyData[]>(endpoint)
    return response.data
  },

  // Получить устройства пользователей
  getDevices: async (shopId?: number): Promise<DeviceData[]> => {
    const endpoint = shopId 
      ? `/secure/analytics/devices/${shopId}`
      : '/secure/analytics/devices'
    const response = await api.get<DeviceData[]>(endpoint)
    return response.data
  }
} 