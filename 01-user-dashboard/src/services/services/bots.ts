import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Включаем cookies для авторизации
  headers: {
    'Content-Type': 'application/json',
  },
})

// Добавляем интерцептор для автоматического добавления токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Добавляем интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    if (error.response?.status === 401) {
      // Токен истек или недействителен - очищаем токены, НО НЕ ДЕЛАЕМ РЕДИРЕКТ
      localStorage.removeItem('admin_token')
      // Пусть middleware отвечает за редиректы
      console.log('401 error - clearing tokens, middleware will handle redirect')
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
