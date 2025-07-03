'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import {
  PlusIcon,
  RectangleGroupIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ShoppingBagIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Моковые данные категорий
  const categories = [
    {
      id: 1,
      name: 'Одежда',
      description: 'Мужская и женская одежда',
      productsCount: 24,
      isActive: true,
      color: '#3B82F6',
      icon: '👕',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Обувь',
      description: 'Спортивная и повседневная обувь',
      productsCount: 12,
      isActive: true,
      color: '#10B981',
      icon: '👟',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      name: 'Аксессуары',
      description: 'Сумки, часы, украшения',
      productsCount: 8,
      isActive: false,
      color: '#8B5CF6',
      icon: '👜',
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: 'Электроника',
      description: 'Гаджеты и электронные устройства',
      productsCount: 16,
      isActive: true,
      color: '#F59E0B',
      icon: '📱',
      createdAt: '2024-01-01'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Статистика
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.isActive).length;
  const totalProducts = categories.reduce((sum, c) => sum + c.productsCount, 0);

  const handleToggleStatus = (categoryId: number, isActive: boolean) => {
    // TODO: Реализовать API для активации/деактивации категорий
    console.log(`Переключение статуса категории ${categoryId}:`, !isActive);
  };

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            {/* Stats Grid - точно как на дашборде */}
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
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего категорий</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalCategories}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      {totalCategories === 0 ? 'Создайте первую категорию' : 'Активные разделы'}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-gray-200/80 rounded-2xl flex items-center justify-center border border-gray-300/50">
                    <RectangleGroupIcon className="w-7 h-7 text-gray-600" />
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
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{activeCategories}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">
                      {totalCategories > 0 ? `${Math.round((activeCategories / totalCategories) * 100)}% активность` : 'Нет активных'}
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
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего товаров</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalProducts.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">В каталоге</p>
                  </div>
                  <div className="w-14 h-14 bg-violet-100/80 rounded-2xl flex items-center justify-center border border-violet-300/50">
                    <ShoppingBagIcon className="w-7 h-7 text-violet-600" />
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
                    <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Средне на категорию</p>
                    <p className="text-3xl font-semibold text-gray-800 tracking-tight">
                      {totalCategories > 0 ? Math.round(totalProducts / totalCategories) : 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">Товаров в разделе</p>
                  </div>
                  <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                    <TagIcon className="w-7 h-7 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content - точно как секция ботов на дашборде */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Ваши категории</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Поиск категорий..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 placeholder-gray-500 text-sm"
                    />
                  </div>
                  <button className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md">
                    <PlusIcon className="w-4 h-4" />
                    Добавить категорию
                  </button>
                </div>
              </div>

              {filteredCategories.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RectangleGroupIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Нет категорий</h3>
                  <p className="text-gray-600 mb-6">Создайте первую категорию для организации каталога</p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200">
                    <PlusIcon className="w-4 h-4" />
                    Создать первую категорию
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -1 }}
                      className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="relative flex-shrink-0">
                          <div className={`w-3 h-3 rounded-full ${category.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                        </div>
                        <div 
                          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ backgroundColor: `${category.color}20`, border: `1px solid ${category.color}40` }}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate text-lg tracking-tight">{category.name}</h3>
                          <p className="text-sm text-gray-600 font-medium">
                            {category.productsCount} товаров • {new Date(category.createdAt).toLocaleDateString('ru-RU')}
                          </p>
                          {category.description && (
                            <p className="text-xs text-gray-500 mt-1 truncate">{category.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                        <button
                          onClick={() => handleToggleStatus(category.id, category.isActive)}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                            category.isActive
                              ? 'bg-red-100/80 text-red-700 hover:bg-red-200/80 border-red-300/60'
                              : 'bg-emerald-100/80 text-emerald-700 hover:bg-emerald-200/80 border-emerald-300/60'
                          }`}
                        >
                          {category.isActive ? 'Деактивировать' : 'Активировать'}
                        </button>
                        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
} 