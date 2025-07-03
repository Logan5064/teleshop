import React from 'react'
import { Star, Zap, User } from 'lucide-react'

export const iconSystemData = [
  {
    name: 'Иконка с фоном',
    description: 'Иконка в цветном контейнере',
    code: 'ts-icon-container',
    component: (
      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
        <Star className="w-6 h-6 text-white" />
      </div>
    )
  },
  {
    name: 'Large Icon Container',
    className: 'ts-icon-container-lg',
    code: 'ts-icon-container-lg',
    component: (
      <div className="ts-icon-container-lg">
        <Zap className="w-8 h-8 text-purple-600" />
      </div>
    ),
    description: 'Большой контейнер для иконок'
  },
  {
    name: 'Avatar',
    className: 'ts-avatar',
    code: 'ts-avatar',
    component: (
      <div className="ts-avatar">
        <User className="w-4 h-4" />
      </div>
    ),
    description: 'Аватар пользователя с градиентным фоном'
  },
  {
    name: 'Avatar with Text',
    className: 'ts-avatar',
    code: 'ts-avatar',
    component: (
      <div className="ts-avatar">
        AK
      </div>
    ),
    description: 'Аватар с инициалами'
  },
  {
    name: 'Rounded Icon Badge',
    className: 'icon-badge',
    code: 'w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center',
    component: (
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
        <Star className="w-5 h-5" />
      </div>
    ),
    description: 'Круглый значок с иконкой'
  },
  {
    name: 'Square Icon Container',
    className: 'icon-square',
    code: 'w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center shadow-lg',
    component: (
      <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center shadow-lg">
        <Zap className="w-6 h-6" />
      </div>
    ),
    description: 'Квадратный контейнер с тенью'
  },
  {
    name: 'Gradient Icon Background',
    className: 'icon-gradient',
    code: 'w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl flex items-center justify-center',
    component: (
      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl flex items-center justify-center">
        <User className="w-6 h-6" />
      </div>
    ),
    description: 'Градиентный фон для иконки'
  },
  {
    name: 'Icon with Badge',
    className: 'icon-with-badge',
    code: 'relative',
    component: (
      <div className="relative">
        <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
          <Star className="w-6 h-6" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          3
        </div>
      </div>
    ),
    description: 'Иконка с уведомлением'
  },
  {
    name: 'Neon Icon Effect',
    className: 'icon-neon',
    code: 'w-12 h-12 bg-gray-900 text-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50',
    component: (
      <div className="w-12 h-12 bg-gray-900 text-cyan-400 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
        <Zap className="w-6 h-6" />
      </div>
    ),
    description: 'Неоновый эффект свечения'
  },
  {
    name: 'Floating Icon',
    className: 'icon-floating',
    code: 'w-12 h-12 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-xl animate-bounce',
    component: (
      <div className="w-12 h-12 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-xl animate-bounce">
        <Star className="w-6 h-6" />
      </div>
    ),
    description: 'Плавающая анимированная иконка'
  },
  {
    name: 'Icon with Border',
    className: 'icon-border',
    code: 'w-12 h-12 bg-white text-green-500 border-2 border-green-500 rounded-lg flex items-center justify-center',
    component: (
      <div className="w-12 h-12 bg-white text-green-500 border-2 border-green-500 rounded-lg flex items-center justify-center">
        <User className="w-6 h-6" />
      </div>
    ),
    description: 'Иконка с цветной рамкой'
  },
  {
    name: 'Glass Icon Container',
    className: 'icon-glass',
    code: 'w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center border border-white/30',
    component: (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-xl flex items-center justify-center border border-white/30">
          <Zap className="w-6 h-6" />
        </div>
      </div>
    ),
    description: 'Стеклянный эффект glassmorphism'
  },
  {
    name: 'Icon Group Horizontal',
    className: 'icon-group-h',
    code: 'flex space-x-2',
    component: (
      <div className="flex space-x-2">
        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
      </div>
    ),
    description: 'Горизонтальная группа иконок'
  },
  {
    name: 'Icon Group Vertical',
    className: 'icon-group-v',
    code: 'flex flex-col space-y-2',
    component: (
      <div className="flex flex-col space-y-2">
        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
          <Star className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
        <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
      </div>
    ),
    description: 'Вертикальная группа иконок'
  },
  {
    name: 'Icon with Label',
    className: 'icon-with-label',
    code: 'flex flex-col items-center space-y-1',
    component: (
      <div className="flex flex-col items-center space-y-1">
        <div className="w-10 h-10 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
          <Star className="w-5 h-5" />
        </div>
        <span className="text-xs text-gray-600 font-medium">Избранное</span>
      </div>
    ),
    description: 'Иконка с подписью'
  },
  {
    name: 'Large Icon Display',
    className: 'icon-large',
    code: 'w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg',
    component: (
      <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg">
        <Zap className="w-8 h-8" />
      </div>
    ),
    description: 'Большая иконка для акцентов'
  },
  {
    name: 'Icon Navigation',
    className: 'icon-nav',
    code: 'flex items-center space-x-6',
    component: (
      <div className="flex items-center space-x-6">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center">
          <Star className="w-5 h-5" />
        </div>
        <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div className="w-10 h-10 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5" />
        </div>
      </div>
    ),
    description: 'Навигационные иконки'
  },
  {
    name: 'Social Media Icons',
    className: 'social-icons',
    code: 'flex space-x-3',
    component: (
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
          f
        </div>
        <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors cursor-pointer">
          t
        </div>
        <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
          i
        </div>
      </div>
    ),
    description: 'Иконки социальных сетей'
  },
  {
    name: 'Status Icons',
    className: 'status-icons',
    code: 'flex items-center space-x-4',
    component: (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Онлайн</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Занят</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Офлайн</span>
        </div>
      </div>
    ),
    description: 'Индикаторы статуса'
  },
  {
    name: 'Icon Button Active',
    className: 'icon-btn-active',
    code: 'w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all',
    component: (
      <button className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-600 transition-all">
        <Star className="w-6 h-6" />
      </button>
    ),
    description: 'Активная кнопка-иконка'
  },
  {
    name: 'Icon Button Inactive',
    className: 'icon-btn-inactive',
    code: 'w-12 h-12 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all',
    component: (
      <button className="w-12 h-12 bg-gray-100 text-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all">
        <User className="w-6 h-6" />
      </button>
    ),
    description: 'Неактивная кнопка-иконка'
  },
  {
    name: 'Notification Icon',
    className: 'icon-notification',
    code: 'relative w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center',
    component: (
      <div className="relative w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center">
        <Star className="w-6 h-6" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    ),
    description: 'Иконка с точкой уведомления'
  },
  {
    name: 'Icon Progress Ring',
    className: 'icon-progress',
    code: 'relative w-14 h-14',
    component: (
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="4" fill="transparent"/>
          <circle cx="28" cy="28" r="24" stroke="#3b82f6" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="50"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Star className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    ),
    description: 'Иконка с кольцом прогресса'
  },
  {
    name: 'Icon with Tooltip',
    className: 'icon-tooltip',
    code: 'relative group',
    component: (
      <div className="relative group">
        <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center cursor-pointer">
          <Zap className="w-6 h-6" />
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Молния
        </div>
      </div>
    ),
    description: 'Иконка с всплывающей подсказкой'
  },
  {
    name: 'Multi-Color Icon Stack',
    className: 'icon-stack',
    code: 'relative',
    component: (
      <div className="relative">
        <div className="w-12 h-12 bg-red-500 rounded-lg transform rotate-6"></div>
        <div className="absolute inset-0 w-12 h-12 bg-blue-500 rounded-lg transform -rotate-3 flex items-center justify-center">
          <Star className="w-6 h-6 text-white" />
        </div>
      </div>
    ),
    description: 'Многослойная стопка иконок'
  },
  {
    name: 'Pulsing Icon',
    className: 'icon-pulse',
    code: 'w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center animate-pulse',
    component: (
      <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center animate-pulse">
        <Zap className="w-6 h-6" />
      </div>
    ),
    description: 'Пульсирующая иконка для привлечения внимания'
  },
  {
    name: 'Icon with Shadow',
    className: 'icon-shadow',
    code: 'w-12 h-12 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-2xl',
    component: (
      <div className="w-12 h-12 bg-white text-gray-700 rounded-xl flex items-center justify-center shadow-2xl">
        <User className="w-6 h-6" />
      </div>
    ),
    description: 'Иконка с глубокой тенью'
  },
  {
    name: 'Icon Cluster',
    className: 'icon-cluster',
    code: 'grid grid-cols-2 gap-1',
    component: (
      <div className="grid grid-cols-2 gap-1">
        <div className="w-6 h-6 bg-red-400 text-white rounded flex items-center justify-center">
          <Star className="w-3 h-3" />
        </div>
        <div className="w-6 h-6 bg-blue-400 text-white rounded flex items-center justify-center">
          <User className="w-3 h-3" />
        </div>
        <div className="w-6 h-6 bg-green-400 text-white rounded flex items-center justify-center">
          <Zap className="w-3 h-3" />
        </div>
        <div className="w-6 h-6 bg-purple-400 text-white rounded flex items-center justify-center">
          <Star className="w-3 h-3" />
        </div>
      </div>
    ),
    description: 'Кластер мини-иконок'
  },
  {
    name: 'Icon with Counter',
    className: 'icon-counter',
    code: 'relative w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center',
    component: (
      <div className="relative w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center">
        <Star className="w-6 h-6" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-6 h-6 flex items-center justify-center px-1">
          99+
        </div>
      </div>
    ),
    description: 'Иконка с счетчиком уведомлений'
  },
  {
    name: 'Icon Loading State',
    className: 'icon-loading',
    code: 'w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center',
    component: (
      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ),
    description: 'Состояние загрузки иконки'
  },
  {
    name: 'Icon with Rating',
    className: 'icon-rating',
    code: 'flex items-center space-x-1',
    component: (
      <div className="flex items-center space-x-1">
        <div className="w-10 h-10 bg-yellow-400 text-white rounded-lg flex items-center justify-center">
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div className="flex space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
          ))}
        </div>
      </div>
    ),
    description: 'Иконка с рейтингом звезд'
  },
  {
    name: 'Icon Menu Dots',
    className: 'icon-menu',
    code: 'w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer',
    component: (
      <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
        <div className="flex flex-col space-y-1">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    ),
    description: 'Иконка меню из трех точек'
  },
  {
    name: 'Icon Favorites Heart',
    className: 'icon-heart',
    code: 'w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all cursor-pointer',
    component: (
      <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all cursor-pointer">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
    ),
    description: 'Иконка сердечка для избранного'
  },
  {
    name: 'Icon Search Magnifier',
    className: 'icon-search',
    code: 'w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer',
    component: (
      <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    ),
    description: 'Иконка поиска с эффектом лупы'
  }
] 