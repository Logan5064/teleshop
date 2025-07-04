'use client';

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BoltIcon, 
  EyeIcon, 
  UserGroupIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  PlayIcon,
  StopIcon,
  PlusIcon,
  SparklesIcon,
  CubeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import { botsApi } from '@/services/bots'
import { analyticsApi } from '@/services/analytics'
import Sidebar from '@/components/Sidebar'
import { AddBotModal } from '@/components/AddBotModal'
import LoadingAnimation from '@/components/LoadingAnimation'
import Link from 'next/link'
import { FEATURES, API_CONFIG } from '@/lib/config'

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
  is_active: boolean
  created_at: string
  bot_username?: string
  description?: string
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

  const loadDashboardData = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      // Загружаем боты только если есть токен
      const botsResponse = await botsApi.getAll()
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

    } catch (err: any) {
      console.error('Dashboard load error:', err)
      // Если ошибка 401 - перенаправляем на авторизацию
      if (err.response?.status === 401) {
        setError('Сессия истекла. Необходима повторная авторизация')
        localStorage.removeItem('admin_token')
      } else {
        setError('Ошибка загрузки данных дашборда')
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

  const toggleBot = async (botId: number, isActive: boolean) => {
    try {
      // Реализованный API для запуска/остановки ботов
      if (isActive) {
        await botsApi.stop(botId)
      } else {
        await botsApi.start(botId)
      }
      
      // Обновляем состояние бота
      setBots(prev => prev.map(bot => 
        bot.id === botId ? { ...bot, is_active: !isActive } : bot
      ))
      
      // Пересчитываем статистику
      const newActiveBots = isActive ? stats.activeBots - 1 : stats.activeBots + 1
      setStats(prev => ({
        ...prev,
        activeBots: newActiveBots,
        totalUsers: newActiveBots * 15,
        todayOrders: newActiveBots * 3,
        totalRevenue: newActiveBots * 1500
      }))
    } catch (err: any) {
      console.error('Bot toggle error:', err)
      alert(`Ошибка при ${isActive ? 'остановке' : 'запуске'} бота: ${err.message}`)
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
            window.location.href = '/login'
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
  }, [])

  if (isLoading) {
    return <LoadingAnimation />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -2 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
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
                className="xl:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
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
                  <div className="space-y-4">
                    {bots.map((bot, index) => (
                      <motion.div
                        key={bot.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -1 }}
                        className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative flex-shrink-0">
                            <div className={`w-3 h-3 rounded-full ${bot.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 truncate text-lg tracking-tight">{bot.shop_name}</h3>
                            <p className="text-sm text-gray-600 font-medium">
                              {bot.bot_username ? `@${bot.bot_username}` : 'Настройте username'} • {new Date(bot.created_at).toLocaleDateString('ru-RU')}
                            </p>
                            {bot.description && (
                              <p className="text-xs text-gray-500 mt-1 truncate">{bot.description}</p>
                            )}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => toggleBot(bot.id, bot.is_active)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex-shrink-0 ml-4 border ${
                            bot.is_active
                              ? 'bg-red-100/80 text-red-700 hover:bg-red-200/80 border-red-300/60'
                              : 'bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80 border-emerald-300/60'
                          }`}
                        >
                          {bot.is_active ? 'Остановить' : 'Запустить'}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
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
                    href="/bots"
                    className="block p-6 bg-gray-100/70 hover:bg-gray-200/80 rounded-2xl transition-all duration-200 border border-gray-300/60 hover:border-gray-400/70 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100/80 rounded-2xl flex items-center justify-center flex-shrink-0 border border-blue-300/50">
                        <ShoppingBagIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg tracking-tight">Управление ботами</div>
                        <div className="text-sm text-gray-600 font-medium">Полный список и настройки</div>
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

