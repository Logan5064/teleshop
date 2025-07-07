'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { useBot } from '@/lib/contexts/BotContext';
import { BotSubscriber } from '@/types';
import {
  UsersIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { StatsCardSkeleton, TableSkeleton, ContentLoader } from '@/components/LoadingStates';

export default function UsersPage() {
  const { selectedBot } = useBot();
  const [searchTerm, setSearchTerm] = useState('');
  const [subscribers, setSubscribers] = useState<BotSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Получение подписчиков бота
  const fetchBotSubscribers = async () => {
    if (!selectedBot) {
      setInitialLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/bot-users?shop_id=${selectedBot.id}`);
      if (!response.ok) {
        throw new Error('Ошибка загрузки подписчиков');
      }
      
      const data = await response.json();
      setSubscribers(data);
    } catch (err) {
      console.error('Error fetching bot subscribers:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBotSubscribers();
    }, 1000); // Имитируем загрузку
    
    return () => clearTimeout(timer);
  }, [selectedBot]);

  const filteredSubscribers = subscribers.filter(subscriber =>
    (subscriber.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (subscriber.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    (subscriber.username?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
    subscriber.telegram_user_id.includes(searchTerm)
  );

  // Статистика
  const totalUsers = subscribers.length;
  const activeUsers = subscribers.filter(u => u.is_active && !u.is_blocked).length;
  const newUsersThisWeek = subscribers.filter(u => {
    if (!u.first_seen) return false;
    const joinDate = new Date(u.first_seen);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return joinDate > weekAgo;
  }).length;

  // Форматирование даты
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'Не указано';
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Получение отображаемого имени
  const getDisplayName = (subscriber: BotSubscriber) => {
    if (subscriber.first_name && subscriber.last_name) {
      return `${subscriber.first_name} ${subscriber.last_name}`;
    }
    if (subscriber.first_name) {
      return subscriber.first_name;
    }
    if (subscriber.last_name) {
      return subscriber.last_name;
    }
    return `User ${subscriber.telegram_user_id}`;
  };

  // Получение аватара
  const getAvatar = (subscriber: BotSubscriber) => {
    if (subscriber.first_name) {
      return subscriber.first_name.charAt(0).toUpperCase();
    }
    return '👤';
  };

  if (!selectedBot) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <InformationCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Выберите бота</h3>
                    <p className="text-gray-500">Выберите бота в панели управления, чтобы просмотреть его пользователей</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Полноценный скелетон загрузки страницы
  if (initialLoading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                {/* Индикатор бота скелетон */}
                <div className="mb-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-300/60">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Статистические карточки скелетоны */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 w-full">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>

                {/* Основная карточка с таблицей скелетон */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm h-[calc(100vh-229px)]">
                  {/* Заголовок и поиск скелетон */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="h-7 bg-gray-200 rounded w-48 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded-xl w-64 animate-pulse"></div>
                  </div>

                  {/* Таблица скелетон */}
                  <TableSkeleton rows={6} />
                  
                  {/* Центральный лоадер */}
                  <div className="mt-8">
                    <ContentLoader text="Загружаем пользователей..." />
                  </div>
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
              {/* Индикатор выбранного бота */}
              <div className="mb-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-gray-400/50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium text-gray-700">Пользователи бота:</span>
                    <span className="font-semibold text-gray-900">{selectedBot.shop_name}</span>
                    <span className="text-sm text-gray-500">@{selectedBot.bot_username}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего пользователей</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalUsers}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Подписчиков бота</p>
                    </div>
                    <div className="w-14 h-14 bg-gray-200/80 rounded-2xl flex items-center justify-center border border-gray-300/50">
                      <UsersIcon className="w-7 h-7 text-gray-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -2 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Активные</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{activeUsers}</p>
                      <p className="text-xs text-emerald-600 mt-2 font-medium">
                        {totalUsers > 0 ? `${Math.round((activeUsers / totalUsers) * 100)}% активность` : 'Нет пользователей'}
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
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Заблокированные</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{subscribers.filter(u => u.is_blocked).length}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Заблокировали бота</p>
                    </div>
                    <div className="w-14 h-14 bg-red-100/80 rounded-2xl flex items-center justify-center border border-red-300/50">
                      <ExclamationTriangleIcon className="w-7 h-7 text-red-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Новых за неделю</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{newUsersThisWeek}</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">Растет аудитория</p>
                    </div>
                    <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                      <UserPlusIcon className="w-7 h-7 text-orange-600" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-400/50 w-full shadow-sm h-[calc(100vh-229px)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Пользователи бота</h2>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск пользователей..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 placeholder-gray-500 text-sm"
                    />
                  </div>
                </div>

                {isLoading && (
                  <div className="space-y-4">
                    {/* Скелетон таблицы пользователей */}
                    <TableSkeleton rows={6} />
                    
                    {/* Центральный лоадер */}
                    <div className="mt-8">
                      <ContentLoader text="Загружаем пользователей..." />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-center py-12">
                    <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Ошибка загрузки</h3>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button
                      onClick={fetchBotSubscribers}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Попробовать снова
                    </button>
                  </div>
                )}

                {!isLoading && !error && (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredSubscribers.length === 0 ? (
                      <div className="text-center py-12">
                        <UsersIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {searchTerm ? 'Пользователи не найдены' : 'Нет подписчиков'}
                        </h3>
                        <p className="text-gray-500">
                          {searchTerm 
                            ? 'Попробуйте изменить поисковый запрос' 
                            : 'Подписчики появятся когда пользователи начнут взаимодействовать с вашим ботом'
                          }
                        </p>
                      </div>
                    ) : (
                      filteredSubscribers.map((subscriber, index) => (
                        <motion.div
                          key={subscriber.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ y: -1 }}
                          className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-3 h-3 rounded-full ${
                              subscriber.is_blocked 
                                ? 'bg-red-500' 
                                : subscriber.is_active 
                                  ? 'bg-emerald-500' 
                                  : 'bg-gray-400'
                            }`}></div>
                            
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
                              {getAvatar(subscriber)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-semibold text-gray-800 text-lg tracking-tight">
                                  {getDisplayName(subscriber)}
                                </h3>
                                {subscriber.username && (
                                  <span className="text-sm text-gray-500">@{subscriber.username}</span>
                                )}
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                                  ID: {subscriber.telegram_user_id}
                                </span>
                                {subscriber.is_blocked && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-lg font-medium">
                                    Заблокирован
                                  </span>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <CalendarIcon className="w-4 h-4" />
                                  Присоединился: {formatDate(subscriber.first_seen)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <ClockIcon className="w-4 h-4" />
                                  Последняя активность: {formatDateTime(subscriber.last_interaction)}
                                </div>
                                {subscriber.language_code && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="font-medium">Язык:</span>
                                    <span className="uppercase">{subscriber.language_code}</span>
                                  </div>
                                )}
                              </div>

                              {subscriber.source && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span className="font-medium">Источник:</span>
                                  <span>{subscriber.source}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <EyeIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 
