'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('week');

  const analytics = {
    revenue: {
      current: 487650,
      previous: 423100,
      change: 15.3
    },
    orders: {
      current: 156,
      previous: 142,
      change: 9.9
    },
    users: {
      current: 89,
      previous: 76,
      change: 17.1
    },
    conversion: {
      current: 3.2,
      previous: 2.8,
      change: 14.3
    }
  };

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 45, revenue: 4049550, change: 23.1 },
    { name: 'AirPods Pro', sales: 38, revenue: 949620, change: 12.5 },
    { name: 'Nike Air Max', sales: 29, revenue: 376710, change: -5.2 },
    { name: 'Samsung Galaxy S24', sales: 22, revenue: 1798000, change: 31.8 },
    { name: 'MacBook Air M3', sales: 15, revenue: 1347000, change: 8.7 }
  ];

  const salesByDay = [
    { day: 'ПН', amount: 45000 },
    { day: 'ВТ', amount: 52000 },
    { day: 'СР', amount: 38000 },
    { day: 'ЧТ', amount: 61000 },
    { day: 'ПТ', amount: 74000 },
    { day: 'СБ', amount: 89000 },
    { day: 'ВС', amount: 67000 }
  ];

  const maxSales = Math.max(...salesByDay.map(d => d.amount));

  return (
    <div className="flex h-screen bg-gray-200/60">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 w-full">
          {/* Period Selector */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Аналитика</h1>
            <div className="flex items-center gap-2 bg-white/95 rounded-xl p-1 border border-gray-300/60">
              {[
                { value: 'day', label: 'День' },
                { value: 'week', label: 'Неделя' },
                { value: 'month', label: 'Месяц' },
                { value: 'year', label: 'Год' }
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setPeriod(item.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    period === item.value
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

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
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Выручка</p>
                  <p className="text-3xl font-semibold text-gray-800 tracking-tight">
                    {analytics.revenue.current.toLocaleString()} ₽
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {analytics.revenue.change > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      analytics.revenue.change > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.abs(analytics.revenue.change)}%
                    </span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-emerald-100/80 rounded-2xl flex items-center justify-center border border-emerald-300/50">
                  <CurrencyDollarIcon className="w-7 h-7 text-emerald-600" />
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
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Заказы</p>
                  <p className="text-3xl font-semibold text-gray-800 tracking-tight">{analytics.orders.current}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {analytics.orders.change > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      analytics.orders.change > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.abs(analytics.orders.change)}%
                    </span>
                  </div>
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
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Пользователи</p>
                  <p className="text-3xl font-semibold text-gray-800 tracking-tight">{analytics.users.current}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {analytics.users.change > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      analytics.users.change > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.abs(analytics.users.change)}%
                    </span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-violet-100/80 rounded-2xl flex items-center justify-center border border-violet-300/50">
                  <UsersIcon className="w-7 h-7 text-violet-600" />
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
                  <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Конверсия</p>
                  <p className="text-3xl font-semibold text-gray-800 tracking-tight">{analytics.conversion.current}%</p>
                  <div className="flex items-center gap-1 mt-2">
                    {analytics.conversion.change > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      analytics.conversion.change > 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      {Math.abs(analytics.conversion.change)}%
                    </span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                  <ArrowTrendingUpIcon className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Sales Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Продажи по дням</h3>
              <div className="flex items-end justify-between h-64 gap-4">
                {salesByDay.map((day, index) => (
                  <div key={day.day} className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.amount / maxSales) * 100}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg min-h-[20px] relative"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                        {(day.amount / 1000).toFixed(0)}k
                      </div>
                    </motion.div>
                    <div className="mt-3 text-sm font-medium text-gray-600">{day.day}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-gray-800 tracking-tight mb-6">Топ товары</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-100/70 rounded-xl"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">{product.sales} продаж</span>
                        <span className="font-bold text-gray-900">{product.revenue.toLocaleString()} ₽</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.change > 0 ? (
                        <ArrowUpIcon className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        product.change > 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {Math.abs(product.change)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
} 