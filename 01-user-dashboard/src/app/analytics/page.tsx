'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { useBot } from '@/lib/contexts/BotContext';
import { StatsCardSkeleton, ChartSkeleton, ContentLoader } from '@/components/LoadingStates';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  UserIcon,
  ShoppingBagIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

interface Analytics {
  shop_id: number;
  total_orders: number;
  total_revenue: number;
  total_customers: number;
  active_products: number;
  orders_today: number;
  revenue_today: number;
  last_updated: string;
}

export default function AnalyticsPage() {
  const { selectedBot } = useBot();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!selectedBot) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`/api/analytics?shop_id=${selectedBot.id}`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки аналитики');
        }
        const data = await response.json();
        setAnalytics(data);
        setError(null);
      } catch (err) {
        console.error('Error loading analytics:', err);
        setError('Ошибка загрузки аналитики');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [selectedBot]);

  // Если нет выбранного бота
  if (!selectedBot) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Аналитика</h1>
                </div>
                <div className="text-center py-12">
                  <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Выберите бота</h3>
                  <p className="text-gray-500">Для просмотра аналитики выберите бота в панели управления</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-9 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="text-right space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>

                {/* Скелетоны статистических карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>

                {/* Скелетоны графиков */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <ChartSkeleton height="h-80" />
                  <ChartSkeleton height="h-80" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <ChartSkeleton height="h-64" />
                  <ChartSkeleton height="h-64" />
                  <div className="lg:col-span-1">
                    <ContentLoader text="Загружаем аналитику..." />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="flex items-center justify-center h-full">
                <div>
                  <div className="text-red-500 text-xl mb-4">{error}</div>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Попробовать снова
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="text-center py-12">
                  <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Данные недоступны</h3>
                  <p className="text-gray-500">Не удалось загрузить данные аналитики</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const avgOrderValue = analytics.total_orders > 0 ? analytics.total_revenue / analytics.total_orders : 0;

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            <div className="p-6 w-full">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Аналитика</h1>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Бот: {selectedBot.shop_name}</p>
                  <p className="text-xs text-gray-400">
                    Обновлено: {new Date(analytics.last_updated).toLocaleString('ru-RU')}
                  </p>
                </div>
              </div>

              {/* Основная статистика */}
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Общая выручка</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">
                        {analytics.total_revenue.toLocaleString()} ₽
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">За все время</p>
                    </div>
                    <div className="w-14 h-14 bg-green-100/80 rounded-2xl flex items-center justify-center border border-green-300/50">
                      <CurrencyDollarIcon className="w-7 h-7 text-green-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего заказов</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{analytics.total_orders}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Обработано</p>
                    </div>
                    <div className="w-14 h-14 bg-blue-100/80 rounded-2xl flex items-center justify-center border border-blue-300/50">
                      <ShoppingBagIcon className="w-7 h-7 text-blue-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Клиенты</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{analytics.total_customers}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Уникальные</p>
                    </div>
                    <div className="w-14 h-14 bg-purple-100/80 rounded-2xl flex items-center justify-center border border-purple-300/50">
                      <UserIcon className="w-7 h-7 text-purple-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Средний чек</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">
                        {avgOrderValue.toLocaleString()} ₽
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">За заказ</p>
                    </div>
                    <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                      <ArrowTrendingUpIcon className="w-7 h-7 text-orange-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Сегодня */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Сегодня</h3>
                    <CalendarDaysIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Заказов</span>
                      <span className="font-semibold text-gray-800">{analytics.orders_today}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Выручка</span>
                      <span className="font-semibold text-gray-800">{analytics.revenue_today.toLocaleString()} ₽</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">Товары</h3>
                    <EyeIcon className="w-6 h-6 text-gray-500" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Активные товары</span>
                      <span className="font-semibold text-gray-800">{analytics.active_products}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Статус каталога</span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        analytics.active_products > 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {analytics.active_products > 0 ? 'Готов к продажам' : 'Нужны товары'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Рекомендации */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Рекомендации</h3>
                
                <div className="space-y-4">
                  {analytics.active_products === 0 && (
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <ArrowUpIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Добавьте товары</p>
                        <p className="text-sm text-yellow-700">
                          В вашем каталоге пока нет активных товаров. Добавьте товары для начала продаж.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {analytics.total_orders === 0 && analytics.active_products > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <ArrowUpIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Продвигайте бота</p>
                        <p className="text-sm text-blue-700">
                          У вас есть товары, но пока нет заказов. Поделитесь ссылкой на бота с потенциальными клиентами.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {analytics.total_orders > 0 && (
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                      <ArrowUpIcon className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Отличная работа!</p>
                        <p className="text-sm text-green-700">
                          Ваш бот активно используется. Продолжайте добавлять новые товары и улучшать сервис.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
