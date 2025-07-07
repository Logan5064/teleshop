'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { useBot } from '@/lib/contexts/BotContext';
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
import { StatsCardSkeleton, CompactCardSkeleton, ContentLoader } from '@/components/LoadingStates';

interface Category {
  id: number;
  name: string;
  description: string;
  shop_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  products_count?: number;
}

export default function CategoriesPage() {
  const { selectedBot } = useBot();
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      if (!selectedBot) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/categories?shop_id=${selectedBot.id}`);
        if (!response.ok) {
          throw new Error('Ошибка загрузки категорий');
        }
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Ошибка загрузки категорий');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, [selectedBot]);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Статистика
  const totalCategories = categories.length;
  const activeCategories = categories.filter(c => c.is_active).length;
  const totalProducts = categories.reduce((sum, c) => sum + (c.products_count || 0), 0);

  const handleToggleStatus = async (categoryId: number, isActive: boolean) => {
    if (!selectedBot) return;

    try {
      const response = await fetch(`/api/categories`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: categoryId,
          shop_id: selectedBot.id,
          is_active: !isActive
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении статуса категории');
      }
      
      // Обновляем локальное состояние
      setCategories(prev => prev.map(cat => 
        cat.id === categoryId ? { ...cat, is_active: !isActive } : cat
      ));
    } catch (err) {
      console.error('Error updating category status:', err);
      setError('Ошибка при обновлении статуса категории');
    }
  };

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
                  <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Категории</h1>
                </div>
                <div className="text-center py-12">
                  <RectangleGroupIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Выберите бота</h3>
                  <p className="text-gray-500">Для управления категориями выберите бота в панели управления</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="ts-page-bg">
        <div className="flex h-screen">
          <Sidebar />
          <main className="ts-main-content">
            <div className="ts-container">
              <div className="p-6 w-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-9 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>

                {/* Скелетоны статистических карточек */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 w-full">
                  {[...Array(4)].map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>

                {/* Поиск и кнопки скелетон */}
                <div className="flex items-center justify-between mb-8">
                  <div className="h-10 bg-gray-200 rounded-lg w-80 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
                </div>

                {/* Скелетоны карточек категорий */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <CompactCardSkeleton key={i} />
                  ))}
                </div>

                {/* Центральный лоадер */}
                <div className="mt-12">
                  <ContentLoader text="Загружаем категории..." />
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
                <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Категории</h1>
                <p className="text-sm text-gray-500">Бот: {selectedBot.shop_name}</p>
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

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Список категорий</h2>
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
                    <button 
                      className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Добавить категорию
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredCategories.length === 0 ? (
                    <div className="text-center py-12">
                      <RectangleGroupIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Нет категорий</h3>
                      <p className="text-gray-500">Создайте первую категорию для этого бота</p>
                    </div>
                  ) : (
                    filteredCategories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -1 }}
                        className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-3 h-3 rounded-full ${category.is_active ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                          
                          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
                            📂
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800 truncate text-lg tracking-tight">{category.name}</h3>
                              <span className="text-xs text-gray-500">
                                {category.is_active ? 'Активна' : 'Неактивна'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">
                                {category.description || 'Нет описания'}
                              </span>
                              <span className="text-sm text-gray-500">
                                Товаров: {category.products_count || 0}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(category.id, category.is_active)}
                            className={`p-2 rounded-lg transition-colors ${
                              category.is_active 
                                ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' 
                                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {category.is_active ? <ArchiveBoxIcon className="w-4 h-4" /> : <CheckCircleIcon className="w-4 h-4" />}
                          </button>
                          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <TrashIcon className="w-4 h-4" />
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
