'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { useBot } from '@/lib/contexts/BotContext';
import { StatsCardSkeleton, TableSkeleton, ContentLoader } from '@/components/LoadingStates';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface Order {
  id: number;
  shop_id: number;
  customer_telegram_id: string;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function OrdersPage() {
  const { selectedBot } = useBot();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!selectedBot) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`/api/orders?shop_id=${selectedBot.id}`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки заказов');
        }
        const data = await response.json();
        setOrders(data);
        setError(null);
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Ошибка загрузки заказов');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [selectedBot]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'processing': return 'В обработке';
      case 'completed': return 'Выполнен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_telegram_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Статистика
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total_amount, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

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
                  <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Заказы</h1>
                </div>
                <div className="text-center py-12">
                  <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Выберите бота</h3>
                  <p className="text-gray-500">Для просмотра заказов выберите бота в панели управления</p>
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
                  <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>

                {/* Скелетоны статистических карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>

                {/* Фильтры и поиск скелетон */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="h-10 bg-gray-200 rounded-lg flex-1 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-40 animate-pulse"></div>
                </div>

                {/* Скелетон таблицы заказов */}
                <TableSkeleton rows={8} />

                {/* Центральный лоадер */}
                <div className="mt-8">
                  <ContentLoader text="Загружаем заказы..." />
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

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            <div className="p-6 w-full">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Заказы</h1>
                <p className="text-sm text-gray-500">Бот: {selectedBot.shop_name}</p>
              </div>

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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего заказов</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalOrders}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">За все время</p>
                    </div>
                    <div className="w-14 h-14 bg-gray-200/80 rounded-2xl flex items-center justify-center border border-gray-300/50">
                      <ClipboardDocumentListIcon className="w-7 h-7 text-gray-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Выполнено</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{completedOrders}</p>
                      <p className="text-xs text-emerald-600 mt-2 font-medium">
                        {totalOrders > 0 ? `${Math.round((completedOrders / totalOrders) * 100)}% конверсия` : 'Нет заказов'}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-emerald-100/80 rounded-2xl flex items-center justify-center border border-emerald-300/50">
                      <CheckCircleIcon className="w-7 h-7 text-emerald-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Выручка</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalRevenue.toLocaleString()} ₽</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">От выполненных</p>
                    </div>
                    <div className="w-14 h-14 bg-violet-100/80 rounded-2xl flex items-center justify-center border border-violet-300/50">
                      <CurrencyDollarIcon className="w-7 h-7 text-violet-600" />
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
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Ожидают</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{pendingOrders}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Требуют внимания</p>
                    </div>
                    <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                      <ClockIcon className="w-7 h-7 text-orange-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Список заказов</h2>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Поиск заказов..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 placeholder-gray-500 text-sm"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 text-sm"
                    >
                      <option value="all">Все статусы</option>
                      <option value="pending">Ожидают</option>
                      <option value="processing">В обработке</option>
                      <option value="completed">Выполнены</option>
                      <option value="cancelled">Отменены</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-12">
                      <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Нет заказов</h3>
                      <p className="text-gray-500">Пока нет заказов для этого бота</p>
                    </div>
                  ) : (
                    filteredOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -1 }}
                        className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
                            📋
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800 truncate text-lg tracking-tight">Заказ #{order.id}</h3>
                              <span className={`px-2 py-1 text-xs rounded-lg border ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">
                                Клиент: {order.customer_telegram_id}
                              </span>
                              <span className="font-bold text-gray-900">
                                {order.total_amount.toLocaleString()} ₽
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(order.created_at).toLocaleString('ru-RU')}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))
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
