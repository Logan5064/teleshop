'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import {
  UsersIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 1,
      name: 'Иван Петров',
      username: '@ivan_petrov',
      telegram_id: '123456789',
      joinedAt: '2024-01-15T10:30:00',
      lastActive: '2024-01-20T16:45:00',
      ordersCount: 3,
      totalSpent: 127970,
      isActive: true,
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      username: '@maria_s',
      telegram_id: '987654321',
      joinedAt: '2024-01-12T14:20:00',
      lastActive: '2024-01-19T12:30:00',
      ordersCount: 1,
      totalSpent: 12990,
      isActive: true,
      avatar: '👩‍💻'
    },
    {
      id: 3,
      name: 'Алексей Козлов',
      username: '@alex_kozlov',
      telegram_id: '456789123',
      joinedAt: '2024-01-10T09:15:00',
      lastActive: '2024-01-18T18:00:00',
      ordersCount: 2,
      totalSpent: 89990,
      isActive: true,
      avatar: '👨‍🎓'
    },
    {
      id: 4,
      name: 'Елена Новикова',
      username: '@elena_n',
      telegram_id: '789123456',
      joinedAt: '2024-01-08T11:45:00',
      lastActive: '2024-01-17T10:15:00',
      ordersCount: 0,
      totalSpent: 0,
      isActive: false,
      avatar: '👩‍🔬'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.telegram_id.includes(searchTerm)
  );

  // Статистика
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const totalRevenue = users.reduce((sum, u) => sum + u.totalSpent, 0);
  const newUsersThisWeek = users.filter(u => {
    const joinDate = new Date(u.joinedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return joinDate > weekAgo;
  }).length;

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            <div className="p-6 w-full">
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
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
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
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 hover:border-gray-400/70 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Общая выручка</p>
                      <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalRevenue.toLocaleString()} ₽</p>
                      <p className="text-xs text-gray-500 mt-2 font-medium">От всех пользователей</p>
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
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
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

                <div className="space-y-4">
                  {filteredUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -1 }}
                      className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-3 h-3 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                        
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
                          {user.avatar}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-gray-800 text-lg tracking-tight">{user.name}</h3>
                            <span className="text-sm text-gray-500">{user.username}</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg font-medium">
                              ID: {user.telegram_id}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarIcon className="w-4 h-4" />
                              Присоединился: {new Date(user.joinedAt).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <ClockIcon className="w-4 h-4" />
                              Активен: {new Date(user.lastActive).toLocaleDateString('ru-RU')}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <ShoppingBagIcon className="w-4 h-4" />
                              {user.ordersCount} заказ{user.ordersCount !== 1 ? (user.ordersCount < 5 ? 'а' : 'ов') : ''}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-900 text-lg">
                              {user.totalSpent > 0 ? `${user.totalSpent.toLocaleString()} ₽` : 'Не покупал'}
                            </span>
                            {user.totalSpent > 0 && (
                              <span className="text-sm text-gray-600">
                                Средний чек: {Math.round(user.totalSpent / (user.ordersCount || 1)).toLocaleString()} ₽
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <UsersIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Пользователи не найдены</h3>
                    <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
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