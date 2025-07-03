/**
 * 🔗 SSO Integration for Main Platform
 * Упрощенная интеграция SSO для основной платформы (порт 3000)
 */

// Локальная конфигурация SSO
export const SSO_CONFIG = {
  PLATFORMS: {
    MAIN: {
      name: 'Main Platform',
      url: 'http://localhost:3000',
      port: 3000
    },
    CONSTRUCTOR: {
      name: 'Constructor',
      url: 'http://localhost:3001', 
      port: 3001
    },
    API: {
      name: 'API Server',
      url: 'http://localhost:8000',
      port: 8000
    }
  }
}

// Типы
export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  isAdmin: boolean
  user: User | null
  tokens: Record<string, string>
  error: string | null
  lastCheck: Date
}

export interface User {
  id: number
  telegram_id: string
  username?: string
  first_name: string
  last_name: string
  is_active: boolean
}

// Локальная конфигурация для основной платформы
export const MAIN_PLATFORM_CONFIG = {
  ...SSO_CONFIG,
  CURRENT_PLATFORM: 'main' as const,
  DEFAULT_REDIRECT: '/dashboard',
  LOGIN_PAGE: '/login',
  
  // Настройки для основной платформы
  FEATURES: {
    ADMIN_ACCESS: true,
    USER_MANAGEMENT: true,
    BOT_CREATION: true,
    ANALYTICS: true
  }
}

/**
 * 🔑 Auth Service для основной платформы
 */
export class MainPlatformAuth {
  /**
   * 🚀 Инициализация авторизации для основной платформы
   */
  static async initialize(): Promise<AuthState | null> {
    try {
      console.log('🚀 Initializing Main Platform Auth...')
      
      // Проверяем доступность API
      const isApiAvailable = await this.isServerAvailable()
      if (!isApiAvailable) {
        console.warn('⚠️ Auth API server not available')
        return null
      }

      // Проверяем текущую авторизацию
      const authResponse = await this.checkAuth()
      
      if (authResponse?.authenticated) {
        console.log('✅ User authenticated on main platform')
        
        return {
          isAuthenticated: true,
          isLoading: false,
          isAdmin: false,
          user: {
            id: authResponse.user_id || 0,
            telegram_id: authResponse.telegram_id || '',
            username: authResponse.username,
            first_name: '',
            last_name: '',
            is_active: true
          },
          tokens: {},
          error: null,
          lastCheck: new Date()
        }
      }

      return null

    } catch (error) {
      console.error('❌ Main Platform Auth initialization failed:', error)
      return null
    }
  }

  /**
   * 🔄 Редирект в конструктор с передачей авторизации
   */
  static redirectToConstructor(path = '/constructor') {
    const constructorUrl = `${SSO_CONFIG.PLATFORMS.CONSTRUCTOR.url}${path}`
    
    console.log('🔄 Redirecting to Constructor:', constructorUrl)
    
    // Открываем конструктор в том же окне
    window.location.href = constructorUrl
  }

  /**
   * 🌐 Проверить доступность API сервера
   */
  private static async isServerAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/check`, {
        method: 'GET',
        credentials: 'include'
      })
      return response.status !== 0
    } catch {
      return false
    }
  }

  /**
   * 🔍 Проверить авторизацию
   */
  private static async checkAuth(): Promise<{ authenticated: boolean; user_id?: number; telegram_id?: string; username?: string } | null> {
    try {
      const response = await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/check`, {
        method: 'GET',
        credentials: 'include'
      })
      
      if (response.ok) {
        return await response.json()
      }
      
      return null
    } catch (error) {
      console.error('Auth check failed:', error)
      return null
    }
  }

  /**
   * 📊 Получить статистику пользователя
   */
  static async getUserStats(): Promise<Record<string, unknown>> {
    try {
      const response = await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/stats`, {
        method: 'GET',
        credentials: 'include'
      })
      
      if (response.ok) {
        return await response.json()
      }
      
      throw new Error('Failed to get stats')
    } catch (error) {
      console.error('Failed to get user stats:', error)
      throw error
    }
  }

  /**
   * 🏷️ Получить роль пользователя
   */
  static async getUserRole(): Promise<'user' | 'admin' | 'unknown'> {
    try {
      const authResponse = await this.checkAuth()
      
      if (!authResponse?.authenticated) {
        return 'unknown'
      }

      // Проверяем админские права через API
      try {
        await this.getUserStats() // Только админы могут получить статистику
        return 'admin'
      } catch {
        return 'user'
      }

    } catch {
      return 'unknown'
    }
  }
}

/**
 * 🛠️ Utility функции для основной платформы
 */
export const mainPlatformUtils = {
  /**
   * Проверить, авторизован ли пользователь
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/check`, {
        credentials: 'include'
      })
      const data = await response.json()
      return data.authenticated || false
    } catch {
      return false
    }
  },

  /**
   * Получить информацию о пользователе
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/check`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.authenticated) {
          return {
            id: data.user_id || 0,
            telegram_id: data.telegram_id || '',
            username: data.username,
            first_name: '',
            last_name: '',
            is_active: true
          }
        }
      }

      return null
    } catch {
      return null
    }
  },

  /**
   * Логаут с редиректом
   */
  async logout(redirectTo = '/login'): Promise<void> {
    try {
      await fetch(`${SSO_CONFIG.PLATFORMS.API.url}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      window.location.href = redirectTo
    }
  }
}

// Экспорт для удобства
export default MainPlatformAuth 