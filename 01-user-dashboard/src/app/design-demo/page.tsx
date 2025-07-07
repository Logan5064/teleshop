'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  ShoppingCartIcon, 
  MagnifyingGlassIcon,
  HeartIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const DesignDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        
        {/* 🔥 СОВРЕМЕННЫЙ HEADER */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden"
        >
          <div 
            className="py-20 px-6 relative"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {/* Glassmorphism декор */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="relative p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <MagnifyingGlassIcon className="w-6 h-6 text-white" />
                </div>
                <div className="relative p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <ShoppingCartIcon className="w-6 h-6 text-white" />
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold">3</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center relative z-10">
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-white mb-4"
              >
                TeleShop
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white/90 text-lg leading-relaxed mb-8"
              >
                Современные решения для вашего бизнеса в Telegram
              </motion.p>
              
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white font-semibold shadow-xl hover:bg-white/30 transition-all"
              >
                Начать продавать
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* 🔥 СОВРЕМЕННЫЕ КАРТОЧКИ ТОВАРОВ */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Хиты продаж</h2>
          
          <div className="space-y-4">
            {[
              { name: "AirPods Pro Max", price: "89 990", originalPrice: "99 990", image: "🎧", rating: 4.9 },
              { name: "iPhone 15 Pro", price: "124 990", originalPrice: "139 990", image: "📱", rating: 4.8 },
              { name: "MacBook Air M3", price: "149 990", originalPrice: "169 990", image: "💻", rating: 4.7 }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Изображение */}
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {product.image}
                  </div>
                  
                  {/* Информация */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    
                    {/* Рейтинг */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                    </div>
                    
                    {/* Цена */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">{product.price} ₽</span>
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice} ₽</span>
                    </div>
                  </div>
                  
                  {/* Кнопка */}
                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-colors"
                    >
                      <HeartIcon className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      Купить
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🔥 СОВРЕМЕННЫЙ БАННЕР */}
        <section className="p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div 
              className="p-8 text-center relative"
              style={{
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
              }}
            >
              {/* Декор */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-xl"></div>
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl mb-4"
                >
                  🔥
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">
                  Скидка 30%
                </h3>
                <p className="text-white/90 mb-6">
                  На все товары Apple до конца недели
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white font-semibold flex items-center gap-2 mx-auto"
                >
                  Смотреть товары
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 🔥 КАТЕГОРИИ С ИКОНКАМИ */}
        <section className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Категории</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Электроника", icon: "📱", color: "from-blue-400 to-blue-600" },
              { name: "Одежда", icon: "👕", color: "from-purple-400 to-purple-600" },
              { name: "Дом", icon: "🏠", color: "from-green-400 to-green-600" },
              { name: "Спорт", icon: "⚽", color: "from-orange-400 to-orange-600" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-br ${category.color} rounded-3xl p-6 text-center cursor-pointer shadow-lg`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-white font-semibold">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🔥 СОВРЕМЕННЫЙ ФУТЕР */}
        <section className="p-6 bg-gray-900 text-white rounded-t-3xl">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-xl font-bold mb-2">TeleShop</h3>
            <p className="text-gray-400 text-sm mb-6">
              Создавайте красивые магазины в Telegram
            </p>
            
            <div className="flex justify-center gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                <span className="text-sm">TG</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                <span className="text-sm">IG</span>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                <span className="text-sm">VK</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default DesignDemoPage 
