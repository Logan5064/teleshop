'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
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

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: '#1001',
      customerName: 'Иван Петров',
      customerPhone: '+7 (999) 123-45-67',
      items: ['iPhone 15 Pro', 'AirPods Pro'],
      total: 114980,
      status: 'pending',
      paymentMethod: 'Карта',
      deliveryAddress: 'Москва, ул. Тверская, 1',
      createdAt: '2024-01-20T10:30:00',
      telegram_id: '@ivan_petrov'
    },
    {
      id: '#1002',
      customerName: 'Мария Сидорова',
      customerPhone: '+7 (999) 234-56-78',
      items: ['Nike Air Max'],
      total: 12990,
      status: 'completed',
      paymentMethod: 'Наличные',
      deliveryAddress: 'СПб, Невский пр., 10',
      createdAt: '2024-01-19T15:20:00',
      telegram_id: '@maria_s'
    },
    {
      id: '#1003',
      customerName: 'Алексей Козлов',
      customerPhone: '+7 (999) 345-67-89',
      items: ['iPhone 15 Pro', 'Nike Air Max', 'AirPods Pro'],
      total: 127970,
      status: 'processing',
      paymentMethod: 'Карта',
      deliveryAddress: 'Екатеринбург, ул. Ленина, 5',
      createdAt: '2024-01-18T09:15:00',
      telegram_id: '@alex_kozlov'
    },
    {
      id: '#1004',
      customerName: 'Елена Новикова',
      customerPhone: '+7 (999) 456-78-90',
      items: ['AirPods Pro'],
      total: 24990,
      status: 'cancelled',
      paymentMethod: 'Карта',
      deliveryAddress: 'Казань, ул. Баумана, 20',
      createdAt: '2024-01-17T16:45:00',
      telegram_id: '@elena_n'
    }
  ];

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
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Статистика
  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

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
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -1 }}
                      className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-gray-900 text-lg">{order.id}</span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-800 text-lg tracking-tight">{order.customerName}</h3>
                            <span className="text-sm text-gray-500">{order.telegram_id}</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <PhoneIcon className="w-4 h-4" />
                              {order.customerPhone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <MapPinIcon className="w-4 h-4" />
                            {order.deliveryAddress}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm text-gray-600">Товары:</span>
                            <div className="flex flex-wrap gap-1">
                              {order.items.map((item, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-gray-900 text-lg">{order.total.toLocaleString()} ₽</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                              {order.paymentMethod}
                            </span>
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

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Заказы не найдены</h3>
                    <p className="text-gray-500">Попробуйте изменить критерии поиска</p>
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