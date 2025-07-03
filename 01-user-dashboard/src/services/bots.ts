import axios from 'axios'
import { logger } from '@/lib/logger'

// Unified API configuration
import { API_CONFIG } from '@/lib/config';
const API_BASE_URL = API_CONFIG.BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Включаем cookies для авторизации
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем интерцептор для автоматического добавления токена
api.interceptors.request.use((config) => {
  logger.apiRequest(config.url || '', config.method || '', 'BotsService')
  
  // СНАЧАЛА проверяем session_token из cookies (для обычных пользователей)
  const allCookies = document.cookie.split('; ').filter(c => c.length > 0)
  const sessionCookie = allCookies.find(row => row.startsWith('session_token='))
  logger.debug(`Session cookie check`, { found: !!sessionCookie, count: allCookies.length }, 'BotsService')
  
  const sessionToken = sessionCookie?.split('=')[1]
  
  if (sessionToken && sessionToken.length > 10) {
    // НЕ устанавливаем Cookie заголовок вручную - браузер сделает это автоматически через withCredentials
    logger.debug(`Using session token authentication`, { tokenLength: sessionToken.length }, 'BotsService')
    return config
  }
  
  // ТОЛЬКО если нет session_token, проверяем admin_token в localStorage
  const adminToken = localStorage.getItem('admin_token')
  
  // Очищаем некорректные admin_token (они должны начинаться с "admin_")
  if (adminToken && !adminToken.startsWith('admin_')) {
    logger.warn(`Removing invalid admin token format`, undefined, 'BotsService')
    localStorage.removeItem('admin_token')
  } else if (adminToken && adminToken.startsWith('admin_')) {
    config.headers.Authorization = `Bearer ${adminToken}`
    logger.debug(`Using admin token authentication`, undefined, 'BotsService')
    return config
  }
  
  // Если вообще ничего нет
  logger.warn(`No valid authentication tokens found`, {
    sessionToken: sessionToken ? 'found_but_invalid' : 'not_found',
    adminToken: adminToken ? 'found_but_invalid_format' : 'not_found'
  }, 'BotsService')
  
  return config
})

// Добавляем интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    logger.apiError('Request failed', error.response?.data || error.message, 'BotsService')
    if (error.response?.status === 401) {
      // Токен истек или недействителен - очищаем токены, НО НЕ ДЕЛАЕМ РЕДИРЕКТ
      localStorage.removeItem('admin_token')
      // Пусть middleware отвечает за редиректы
      logger.info('401 error - clearing tokens, middleware will handle redirect', undefined, 'BotsService')
    }
    return Promise.reject(error)
  }
)

export interface Bot {
  id: number
  shop_name: string
  description?: string
  bot_token: string
  bot_username?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateBotRequest {
  bot_token: string
  shop_name: string
  description?: string
  bot_username?: string
}

export const botsApi = {
  // Получить все боты пользователя
  getAll: async (): Promise<Bot[]> => {
    const response = await api.get<Bot[]>('/secure/bots')
    return response.data
  },

  // Создать нового бота
  create: async (botData: CreateBotRequest): Promise<Bot> => {
    const response = await api.post<Bot>('/secure/bots', botData)
    return response.data
  },

  // Получить бота по ID
  getById: async (id: number): Promise<Bot> => {
    const response = await api.get<Bot>(`/secure/bots/${id}`)
    return response.data
  },

  // Запустить бота
  start: async (id: number): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/secure/bots/${id}/start`)
    return response.data
  },

  // Остановить бота
  stop: async (id: number): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>(`/secure/bots/${id}/stop`)
    return response.data
  },

  // Удалить бота
  delete: async (id: number): Promise<void> => {
    await api.delete(`/secure/bots/${id}`)
  },

  // Обновить бота
  update: async (id: number, botData: Partial<CreateBotRequest>): Promise<Bot> => {
    const response = await api.put<Bot>(`/secure/bots/${id}`, botData)
    return response.data
  }
} 
