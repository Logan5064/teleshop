import React from 'react'

export const buttonStyles = [
  {
    name: 'Стеклянная кнопка',
    code: 'ts-btn-glass',
    component: React.createElement('button', { className: 'ts-btn-glass' }, 'Стеклянная кнопка')
  },
  {
    name: 'Неоморфная кнопка',
    code: 'ts-btn-neumorphic',
    component: React.createElement('button', { className: 'ts-btn-neumorphic' }, 'Неоморфная кнопка')
  },
  {
    name: 'Плоская кнопка',
    code: 'ts-btn-flat',
    component: React.createElement('button', { className: 'ts-btn-flat' }, 'Плоская кнопка')
  },
  {
    name: 'Брутальная кнопка',
    code: 'ts-btn-brutalist',
    component: React.createElement('button', { className: 'ts-btn-brutalist' }, 'БРУТАЛЬНАЯ')
  },
  {
    name: 'Пульсирующая кнопка',
    code: 'ts-btn-pulse',
    component: React.createElement('button', { className: 'ts-btn-pulse' }, 'Пульсирующая')
  },
  {
    name: 'Ретро кнопка',
    code: 'ts-btn-retro',
    component: React.createElement('button', { className: 'ts-btn-retro' }, 'Ретро кнопка')
  },
  {
    name: 'Мягкая кнопка',
    code: 'ts-btn-soft',
    component: React.createElement('button', { className: 'ts-btn-soft' }, 'Мягкая кнопка')
  },
  {
    name: 'Плавающая кнопка',
    code: 'ts-btn-floating',
    component: React.createElement('button', { className: 'ts-btn-floating' }, 'Плавающая')
  },
  {
    name: 'Контурная кнопка',
    code: 'ts-btn-outline',
    component: React.createElement('button', { className: 'ts-btn-outline' }, 'Контурная')
  },
  {
    name: 'Градиентная кнопка',
    code: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg',
    component: React.createElement('button', { 
      className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg' 
    }, 'Градиентная')
  },
  {
    name: 'Неоновая кнопка',
    code: 'bg-gray-900 text-cyan-400 px-6 py-3 rounded-lg font-medium border-2 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    component: React.createElement('button', { 
      className: 'bg-gray-900 text-cyan-400 px-6 py-3 rounded-lg font-medium border-2 border-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all shadow-[0_0_20px_rgba(34,211,238,0.5)]' 
    }, 'Неоновая')
  },
  {
    name: 'Материал кнопка',
    code: 'bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all',
    component: React.createElement('button', { 
      className: 'bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all' 
    }, 'Материал')
  },
  {
    name: 'Минималистичная кнопка',
    code: 'text-gray-700 hover:text-gray-900 px-6 py-3 font-medium border-b-2 border-transparent hover:border-gray-900 transition-all',
    component: React.createElement('button', { 
      className: 'text-gray-700 hover:text-gray-900 px-6 py-3 font-medium border-b-2 border-transparent hover:border-gray-900 transition-all' 
    }, 'Минималистичная')
  },
  {
    name: 'Винтажная кнопка',
    code: 'bg-amber-100 hover:bg-amber-200 text-amber-900 px-6 py-3 rounded-lg font-medium border-2 border-amber-300 shadow-inner',
    component: React.createElement('button', { 
      className: 'bg-amber-100 hover:bg-amber-200 text-amber-900 px-6 py-3 rounded-lg font-medium border-2 border-amber-300 shadow-inner' 
    }, 'Винтажная')
  },
  {
    name: 'Успех кнопка',
    code: 'bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/25 transition-all',
    component: React.createElement('button', { 
      className: 'bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-green-500/25 transition-all' 
    }, 'Успех')
  },
  {
    name: 'Опасность кнопка',
    code: 'bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-red-500/25 transition-all',
    component: React.createElement('button', { 
      className: 'bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-red-500/25 transition-all' 
    }, 'Опасность')
  },
  {
    name: 'Предупреждение кнопка',
    code: 'bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-yellow-500/25 transition-all',
    component: React.createElement('button', { 
      className: 'bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-yellow-500/25 transition-all' 
    }, 'Предупреждение')
  },
  {
    name: 'Информация кнопка',
    code: 'bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all',
    component: React.createElement('button', { 
      className: 'bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-500/25 transition-all' 
    }, 'Информация')
  },
  {
    name: 'Призрачная кнопка',
    code: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all',
    component: React.createElement('button', { 
      className: 'bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 px-6 py-3 rounded-lg font-medium border-2 border-gray-300 hover:border-gray-400 transition-all' 
    }, 'Призрачная')
  },
  {
    name: 'Закругленная кнопка',
    code: 'bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all',
    component: React.createElement('button', { 
      className: 'bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all' 
    }, 'Закругленная')
  },
  {
    name: 'Большая кнопка',
    code: 'bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl transition-all',
    component: React.createElement('button', { 
      className: 'bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-xl transition-all' 
    }, 'Большая кнопка')
  },
  {
    name: 'Маленькая кнопка',
    code: 'bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded text-sm font-medium shadow transition-all',
    component: React.createElement('button', { 
      className: 'bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded text-sm font-medium shadow transition-all' 
    }, 'Маленькая')
  },
  {
    name: 'Квадратная кнопка',
    code: 'bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center',
    component: React.createElement('button', { 
      className: 'bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 rounded-lg font-bold shadow-lg transition-all flex items-center justify-center' 
    }, '■')
  },
  {
    name: 'Радужная кнопка',
    code: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition-all',
    component: React.createElement('button', { 
      className: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition-all' 
    }, 'Радужная')
  },
  {
    name: 'Матовая кнопка',
    code: 'bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all',
    component: React.createElement('button', { 
      className: 'bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-all' 
    }, 'Матовая')
  }
] 