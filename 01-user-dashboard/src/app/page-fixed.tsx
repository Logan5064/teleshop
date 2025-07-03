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
  Cog6ToothIcon
} from '@heroicons/react/24/outline'
import { botsApi } from '@/services/bots'
import { analyticsApi } from '@/services/analytics'
import Sidebar from '@/components/Sidebar'
import { AddBotModal } from '@/components/AddBotModal'
import Link from 'next/link'

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
      
      // Загружаем боты
      const botsResponse = await botsApi.getAll()
      setBots(botsResponse)
      
      // Вычисляем статистику на основе реальных данных
      const activeBots = botsResponse.filter(bot => bot.is_active).length
      setStats({
        totalBots: botsResponse.length,
        activeBots: activeBots,
        totalUsers: 0, // TODO: получать из аналитики
        todayOrders: 0, // TODO: получать из аналитики
        totalRevenue: 0 // TODO: получать из аналитики
      })

    } catch (err) {
      console.error('Dashboard load error:', err)
      setError('Ошибка загрузки данных дашборда')
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
      if (isActive) {
        await botsApi.stop(botId)
      } else {
        await botsApi.start(botId)
      }
      
      setBots(prev => prev.map(bot => 
        bot.id === botId ? { ...bot, is_active: !isActive } : bot
      ))
      
      setStats(prev => ({
        ...prev,
        activeBots: isActive ? prev.activeBots - 1 : prev.activeBots + 1
      }))
    } catch (err) {
      console.error('Bot toggle error:', err)
      alert('Ошибка при управлении ботом')
    }
  }

  const handleBotAdded = () => {
    loadDashboardData() // Перезагружаем данные после добавления бота
    setIsAddBotModalOpen(false)
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-200/60">
        <Sidebar />
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-14 h-14 border-4 border-gray-300/60 border-t-gray-700 rounded-full mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-3 tracking-tight">
              Загрузка дашборда...
            </h3>
            <p className="text-gray-600 font-medium">Подготавливаем ваши данные</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-200/60">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 w-full">


          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <p className="text-red-700 font-medium">{error}</p>
              <button 
                onClick={loadDashboardData}
                className="text-red-600 underline text-sm mt-2 hover:text-red-800"
              >
                Попробовать снова
              </button>
            </motion.div>
          )}

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
            {/* Bots Management */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
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
                  href="http://localhost:3001/constructor"
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
  )
} 
