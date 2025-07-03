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

// Ошибки API
export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
} 