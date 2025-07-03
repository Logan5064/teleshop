'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import { AddProductForm } from '@/components/products';
import {
  PlusIcon,
  CubeIcon,
  CheckCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState<'list' | 'add'>('list');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Последний iPhone с улучшенной камерой',
      price: 129990,
      oldPrice: 149990,
      quantity: 15,
      category: 'Электроника',
      status: 'В наличии',
      image: '/placeholder-product.jpg',
      isNew: true,
      isPopular: false,
      sales: 23,
      views: 156,
      isActive: true
    },
    {
      id: 2,
      name: 'Курс по React',
      description: 'Полный курс по изучению React с нуля',
      price: 15000,
      oldPrice: null,
      quantity: 999,
      category: 'Курсы',
      status: 'В наличии',
      image: '/placeholder-course.jpg',
      isNew: false,
      isPopular: true,
      sales: 45,
      views: 234,
      isActive: true
    },
    {
      id: 3,
      name: 'Пицца Маргарита',
      description: 'Классическая пицца с моцареллой и базиликом',
      price: 850,
      oldPrice: null,
      quantity: 0,
      category: 'Еда',
      status: 'Нет в наличии',
      image: '/placeholder-pizza.jpg',
      isNew: false,
      isPopular: true,
      sales: 12,
      views: 67,
      isActive: false
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const avgCheck = Math.round(totalRevenue / products.reduce((sum, p) => sum + p.sales, 0) || 0);

  const handleSaveProduct = (productData: any) => {
    const newProduct = {
      id: products.length + 1,
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
      quantity: Number(productData.quantity),
      category: productData.productType,
      status: productData.inStock ? 'В наличии' : 'Нет в наличии',
      image: '/placeholder-product.jpg',
      isNew: productData.isNew,
      isPopular: productData.isPopular,
      sales: 0,
      views: 0,
      isActive: productData.inStock
    };
    setProducts(prev => [...prev, newProduct]);
    setCurrentView('list'); // Возвращаемся к списку после сохранения
  };

  const handleCancelAdd = () => {
    setCurrentView('list');
  };

  return (
    <div className="ts-page-bg">
      <div className="flex h-screen">
        <Sidebar />
        <main className="ts-main-content">
          <div className="ts-container">
            {currentView === 'list' ? (
              // Список товаров
              <div className="p-6 w-full">
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Товары</h1>
                </div>

                {/* Статистика */}
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
                        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Всего товаров</p>
                        <p className="text-3xl font-semibold text-gray-800 tracking-tight">{totalProducts}</p>
                        <p className="text-xs text-gray-500 mt-2 font-medium">В каталоге</p>
                      </div>
                      <div className="w-14 h-14 bg-gray-200/80 rounded-2xl flex items-center justify-center border border-gray-300/50">
                        <CubeIcon className="w-7 h-7 text-gray-600" />
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
                        <p className="text-3xl font-semibold text-gray-800 tracking-tight">{activeProducts}</p>
                        <p className="text-xs text-emerald-600 mt-2 font-medium">В продаже</p>
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
                        <p className="text-xs text-gray-500 mt-2 font-medium">От продаж</p>
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
                        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide">Средний чек</p>
                        <p className="text-3xl font-semibold text-gray-800 tracking-tight">{avgCheck.toLocaleString()} ₽</p>
                        <p className="text-xs text-gray-500 mt-2 font-medium">За заказ</p>
                      </div>
                      <div className="w-14 h-14 bg-orange-100/80 rounded-2xl flex items-center justify-center border border-orange-300/50">
                        <TagIcon className="w-7 h-7 text-orange-600" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Каталог товаров */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-300/60 w-full shadow-sm"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Каталог товаров</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Поиск товаров..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-gray-100/70 rounded-xl border border-gray-300/60 focus:border-gray-500 focus:ring-0 text-gray-800 placeholder-gray-500 text-sm"
                        />
                      </div>
                      <button 
                        onClick={() => setCurrentView('add')}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <PlusIcon className="w-4 h-4" />
                        Добавить товар
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -1 }}
                        className="flex items-center justify-between p-6 bg-gray-100/70 rounded-2xl border border-gray-300/60 hover:border-gray-400/70 transition-all duration-200 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-3 h-3 rounded-full ${product.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                          
                          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200">
                            📦
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-gray-800 truncate text-lg tracking-tight">{product.name}</h3>
                              {product.isNew && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  🆕 Новинка
                                </span>
                              )}
                              {product.isPopular && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                  🔥 Популярное
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{product.price.toLocaleString()} ₽</span>
                                {product.oldPrice && (
                                  <span className="text-sm text-gray-500 line-through">
                                    {product.oldPrice.toLocaleString()} ₽
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-600">
                                Остаток: {product.quantity > 999 ? '∞' : product.quantity}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">{product.category}</span>
                              <span className={`px-2 py-1 text-xs rounded-lg ${
                                product.status === 'В наличии' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {product.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
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
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              // Форма добавления товара
              <AddProductForm
                onSave={handleSaveProduct}
                onCancel={handleCancelAdd}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 