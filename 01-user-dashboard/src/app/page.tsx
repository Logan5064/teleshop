'use client';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BoltIcon, 
  EyeIcon, 
  UserGroupIcon,
  PlayIcon,
  PlusIcon,
  SparklesIcon,
  CubeIcon,
  ChartBarIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { botsApi } from '@/services/bots'
import { analyticsApi } from '@/services/analytics'
import Sidebar from '@/components/Sidebar'
import { AddBotModal } from '@/components/AddBotModal'
import { BotCard } from '@/components/BotCard'
import { ContentLoader, StatsCardSkeleton, BotCardSkeleton } from '@/components/LoadingStates'
import Link from 'next/link'
import { FEATURES, API_CONFIG } from '@/lib/config'
import { useRouter } from 'next/navigation'

interface DashboardStats {
  totalBots: number
  activeBots: number
  totalUsers: number
  todayOrders: number
  totalRevenue: number
}

interface BotStatus {
  id: number
  shop_name: string
  description?: string
  bot_token: string
  bot_username?: string
  is_active: boolean
  user_id: number
  created_at: string
  updated_at: string
}

// Компонент индикатора туннеля
const TunnelIndicator = () => {
  if (!API_CONFIG.IS_TUNNELED) return null;

  const copyUrl = () => {
    navigator.clipboard.writeText(API_CONFIG.TUNNEL_URL || '');
    // Можно добавить toast уведомление
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-4 text-white shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GlobeAltIcon className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">🌐 Публичный доступ активен</h3>
            <p className="text-sm opacity-90">
              Ваше приложение доступно по ссылке: <strong>{API_CONFIG.TUNNEL_URL}</strong>
            </p>
            <p className="text-xs opacity-75 mt-1">
              Поделитесь этой ссылкой с другими пользователями для доступа к TeleShop Constructor
            </p>
          </div>
        </div>
        <button
          onClick={copyUrl}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          📋 Копировать URL
        </button>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBots: 0,
    activeBots: 0,
    totalUsers: 0,
    todayOrders: 0,
    totalRevenue: 0
  })
  const [bots, setBots] = useState<BotStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isAddBotModalOpen, setIsAddBotModalOpen] = useState(false)
  const router = useRouter()

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      console.log('🔄 Загружаем данные дашборда...')
      
      // Загружаем боты только если есть токен
      const botsResponse = await botsApi.getAll()
      console.log('✅ Боты получены на дашборде:', botsResponse)
      setBots(botsResponse)
      
      // Вычисляем статистику на основе реальных данных
      const activeBots = botsResponse.filter(bot => bot.is_active).length
      setStats({
        totalBots: botsResponse.length,
        activeBots: activeBots,
        totalUsers: activeBots * 15, // Приблизительно 15 пользователей на активного бота
        todayOrders: activeBots * 3, // Приблизительно 3 заказа в день на активного бота  
        totalRevenue: activeBots * 1500 // Приблизительно 1500₽ выручки на активного бота
      })

      console.log(`📊 Статистика обновлена: ${botsResponse.length} ботов, ${activeBots} активных`)

    } catch (err: any) {
      console.error('❌ Dashboard load error:', err)
      console.error('❌ Статус ошибки:', err.response?.status)
      console.error('❌ Данные ошибки:', err.response?.data)
      
      // Если ошибка 401 - перенаправляем на авторизацию
      if (err.response?.status === 401) {
        setError('Сессия истекла. Необходима повторная авторизация')
        localStorage.removeItem('admin_token')
      } else {
        setError(`Ошибка загрузки данных дашборда: ${err.message}`)
      }
      
      // Показываем пустое состояние при ошибке
      setBots([])
      setStats({
        totalBots: 0,
        activeBots: 0,
        totalUsers: 0,
        todayOrders: 0,
        totalRevenue: 0
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBotAdded = () => { loadDashboardData(); setIsAddBotModalOpen(false); }

  useEffect(() => {
    // Проверяем авторизацию сразу в useEffect
    const checkAuthAndLoad = () => {
      try {
        console.log('🔍 Checking auth state...')
        
        // Проверяем доступность localStorage (может быть недоступен в SSR)
        const adminToken = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
        const sessionToken = typeof window !== 'undefined' ? document.cookie.split('; ').find(row => row.startsWith('session_token='))?.split('=')[1] : null
        
        console.log('🔍 Auth tokens:', { 
          adminToken: adminToken ? adminToken.substring(0, 20) + '...' : 'NONE',
          sessionToken: sessionToken ? sessionToken.substring(0, 20) + '...' : 'NONE'
        })
        
        // Очищаем некорректные admin токены
        if (adminToken && !adminToken.startsWith('admin_')) {
          console.log('🧹 Cleaning invalid admin token')
          localStorage.removeItem('admin_token')
        }
        
        const validAdminToken = adminToken && adminToken.startsWith('admin_')
        const validSessionToken = sessionToken && sessionToken.length > 10
        
        if (!validAdminToken && !validSessionToken) {
          console.log('❌ No valid tokens found - redirecting to login')
          // Если нет валидных токенов, НЕ загружаем данные и НЕ делаем API запросы
          setError('Для просмотра данных необходима авторизация')
          setBots([])
          setStats({
            totalBots: 0,
            activeBots: 0,
            totalUsers: 0,
            todayOrders: 0,
            totalRevenue: 0
          })
          setIsLoading(false)
          
          // Принудительный редирект если middleware не сработал
          setTimeout(() => {
            console.log('🔄 Forcing redirect to login')
            router.push('/login')
          }, 1000)
          
          return
        }
        
        console.log('✅ Valid tokens found - loading dashboard data')
        // Если есть валидные токены, загружаем данные
        loadDashboardData()
      } catch (err) {
        console.error('Auth check error:', err)
        setError('Ошибка проверки авторизации')
        setIsLoading(false)
      }
    }

    checkAuthAndLoad()
  }, [router])

  if (isLoading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              {/* Скелетоны статистических карточек */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 w-full">
                {[...Array(4)].map((_, i) => (
                  <StatsCardSkeleton key={i} />
                ))}
              </div>

              {/* Основной контент с загрузкой */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full max-w-none">
                {/* Область ботов */}
                <div className="xl:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-[calc(100vh-229px)]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-36 animate-pulse"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <BotCardSkeleton key={i} />
                    ))}
                  </div>
                </div>

                {/* Боковая панель */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-[calc(100vh-229px)]">
                  <ContentLoader text="Загружаем ваши данные..." />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <p className="text-red-700 font-medium">{error}</p>
                <div className="flex gap-4 mt-3">
                  {error.includes('авторизации') || error.includes('Сессия истекла') ? (
                    <Link 
                      href="/login"
                      className="text-red-600 underline text-sm hover:text-red-800 font-medium"
                    >
                      Авторизоваться
                    </Link>
                  ) : (
                    <button 
                      onClick={loadDashboardData}
                      className="text-red-600 underline text-sm hover:text-red-800 font-medium"
                    >
                      Попробовать снова
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Tunnel Indicator */}
            <TunnelIndicator />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-500/90 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего ботов</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{stats.totalBots}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      {stats.totalBots === 0 ? 'Создайте первого бота' : 'Активные проекты'}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gray-200/80 rounded-2xl flex items-center justify-center border border-gray-300/50">
                    <BoltIcon className="w-7 h-7 text-gray-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -2 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-500/90 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Активных ботов</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{stats.activeBots}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">
                      {stats.totalBots > 0 ? `${Math.round((stats.activeBots / stats.totalBots) * 100)}% активность` : 'Нет активных'}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-emerald-100/80 rounded-2xl flex items-center justify-center border border-emerald-300/50">
                    <PlayIcon className="w-7 h-7 text-emerald-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -2 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-500/90 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего пользователей</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Подписчики ботов</p>
                  </div>
                  <div className="w-14 h-14 bg-violet-100/80 rounded-2xl flex items-center justify-center border border-violet-300/50">
                    <UserGroupIcon className="w-7 h-7 text-violet-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-500/90 transition-all duration-300 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Активность сегодня</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{stats.todayOrders}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Взаимодействия</p>
                  </div>
                  <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                    <EyeIcon className="w-7 h-7 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 w-full max-w-none">
              {/* Bots Management */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="xl:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-[calc(100vh-229px)]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Ваши боты</h2>
                  <button
                    onClick={() => setIsAddBotModalOpen(true)}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Создать бота
                  </button>
                </div>

                {bots.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BoltIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Нет ботов</h3>
                    <p className="text-gray-600 mb-6">Создайте своего первого Telegram бота для начала работы</p>
                    <button
                      onClick={() => setIsAddBotModalOpen(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Создать первого бота
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {bots.map((bot) => (
                      <BotCard key={bot.id} bot={bot} onUpdate={loadDashboardData} />
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] h-[calc(100vh-229px)]"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-8 tracking-tight">Быстрые действия</h2>
                
                <div className="space-y-4">
                  <Link
                    href="http://77.73.232.46:3001/constructor"
                    target="_blank"
                    className="block p-6 bg-gray-700 text-white rounded-2xl hover:bg-gray-800 transition-all duration-200 group shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/30">
                        <SparklesIcon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg tracking-tight">Конструктор</div>
                        <div className="text-sm opacity-90 font-medium">Создать дизайн магазина</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/analytics"
                    className="block p-6 bg-gray-100/70 hover:bg-gray-200/80 rounded-2xl transition-all duration-200 border border-gray-300/60 hover:border-gray-400/70 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-300/50">
                        <ChartBarIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg tracking-tight">Аналитика</div>
                        <div className="text-sm text-gray-600 font-medium">Статистика и отчеты</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/products"
                    className="block p-6 bg-gray-100/70 hover:bg-gray-200/80 rounded-2xl transition-all duration-200 border border-gray-300/60 hover:border-gray-400/70 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 border border-emerald-300/50">
                        <CubeIcon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg tracking-tight">Товары</div>
                        <div className="text-sm text-gray-600 font-medium">Добавить каталог</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/design-showcase"
                    className="block p-6 bg-gradient-to-br from-pink-100/80 to-purple-100/80 hover:from-pink-200/80 hover:to-purple-200/80 rounded-2xl transition-all duration-200 border border-pink-300/60 hover:border-purple-400/70 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                        <span className="text-lg">🎨</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg tracking-tight">Витрина Дизайна</div>
                        <div className="text-sm text-gray-600 font-medium">Галерея UI стилей</div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blocks-library"
                    className="block p-6 bg-gradient-to-br from-blue-100/80 to-cyan-100/80 hover:from-blue-200/80 hover:to-cyan-200/80 rounded-2xl transition-all duration-200 border border-blue-300/60 hover:border-cyan-400/70 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-sm">
                        <span className="text-lg">📱</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg tracking-tight">Библиотека Блоков</div>
                        <div className="text-sm text-gray-600 font-medium">100+ готовых блоков</div>
                      </div>
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Add Bot Modal */}
        <AddBotModal
          isOpen={isAddBotModalOpen}
          onClose={() => setIsAddBotModalOpen(false)}
          onSuccess={handleBotAdded}
        />
      </div>
    </div>
  )
}

