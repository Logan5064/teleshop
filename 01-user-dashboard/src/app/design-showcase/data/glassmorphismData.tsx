import React from 'react'
import { ShoppingCart, Star, User, Home, Search, Settings, Bell, Heart, Gift, Zap, Download, Share2, Plus } from 'lucide-react'

export const glassmorphismData = [
  // Background Patterns
  {
    category: 'Фоны',
    name: 'Градиент Океан',
    code: 'bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600',
    component: (
      <div className="w-full h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
        <p className="text-white font-medium">Океанский градиент</p>
      </div>
    ),
    description: 'Идеальный фон для стеклянных элементов'
  },
  {
    category: 'Фоны',
    name: 'Градиент Закат',
    code: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500',
    component: (
      <div className="w-full h-32 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-xl flex items-center justify-center">
        <p className="text-white font-medium">Закатный градиент</p>
      </div>
    ),
    description: 'Теплый фон для стеклянных компонентов'
  },
  {
    category: 'Фоны',
    name: 'Градиент Лес',
    code: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
    component: (
      <div className="w-full h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
        <p className="text-white font-medium">Лесной градиент</p>
      </div>
    ),
    description: 'Природный фон для органичного дизайна'
  },
  {
    category: 'Фоны',
    name: 'Mesh Градиент',
    code: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    component: (
      <div className="w-full h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 via-transparent to-cyan-400/20"></div>
        <p className="text-white font-medium relative z-10">Mesh Pattern</p>
      </div>
    ),
    description: 'Сложный многослойный градиент'
  },

  // Glass Cards
  {
    category: 'Карточки',
    name: 'Стеклянная Карточка Продукта',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6',
    component: (
      <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white">
          <div className="w-full h-24 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-white/80" />
          </div>
          <h3 className="font-bold text-lg mb-2">iPhone 15 Pro</h3>
          <p className="text-white/80 text-sm mb-3">Титановый корпус, камера 48MP</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">$999</span>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium border border-white/30 transition-all">
              Купить
            </button>
          </div>
        </div>
      </div>
    ),
    description: 'Карточка товара в стеклянном стиле'
  },
  {
    category: 'Карточки',
    name: 'Стеклянная Статистика',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6',
    component: (
      <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-1">2,847</div>
          <div className="text-white/80 text-sm">Продано товаров</div>
          <div className="mt-3 text-xs text-green-200">↗ +12% за месяц</div>
        </div>
      </div>
    ),
    description: 'Статистическая карточка со стеклянным эффектом'
  },
  {
    category: 'Карточки',
    name: 'Стеклянная Карточка Профиля',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6',
    component: (
      <div className="bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold">Алексей Козлов</h3>
              <p className="text-white/80 text-sm">Владелец магазина</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">156</div>
              <div className="text-white/80 text-xs">Товаров</div>
            </div>
            <div>
              <div className="text-lg font-bold">4.8</div>
              <div className="text-white/80 text-xs">Рейтинг</div>
            </div>
          </div>
        </div>
      </div>
    ),
    description: 'Карточка профиля пользователя'
  },

  // Glass Navigation
  {
    category: 'Навигация',
    name: 'Стеклянное Нижнее Меню',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4',
    component: (
      <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4">
          <div className="flex items-center justify-around">
            <div className="flex flex-col items-center space-y-1 text-white">
              <div className="p-2 bg-white/20 rounded-xl">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xs">Главная</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-white/60">
              <div className="p-2">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-xs">Поиск</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-white/60">
              <div className="p-2">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-xs">Корзина</span>
            </div>
            <div className="flex flex-col items-center space-y-1 text-white/60">
              <div className="p-2">
                <User className="w-5 h-5" />
              </div>
              <span className="text-xs">Профиль</span>
            </div>
          </div>
        </div>
      </div>
    ),
    description: 'Нижняя навигация со стеклянным эффектом'
  },
  {
    category: 'Навигация',
    name: 'Стеклянное Боковое Меню',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4',
    component: (
      <div className="bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 w-48">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-white/20 rounded-lg text-white">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Настройки</span>
            </div>
            <div className="flex items-center space-x-3 p-3 text-white/70 hover:bg-white/10 rounded-lg transition-all">
              <Bell className="w-4 h-4" />
              <span className="text-sm">Уведомления</span>
            </div>
            <div className="flex items-center space-x-3 p-3 text-white/70 hover:bg-white/10 rounded-lg transition-all">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Избранное</span>
            </div>
            <div className="flex items-center space-x-3 p-3 text-white/70 hover:bg-white/10 rounded-lg transition-all">
              <Gift className="w-4 h-4" />
              <span className="text-sm">Подарки</span>
            </div>
          </div>
        </div>
      </div>
    ),
    description: 'Боковое меню со стеклянным эффектом'
  },
  {
    category: 'Навигация',
    name: 'Стеклянный Хедер',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4',
    component: (
      <div className="bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-white font-bold text-lg">TeleShop</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/80 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    description: 'Заголовок сайта со стеклянным эффектом'
  },

  // Glass Forms & Inputs
  {
    category: 'Формы',
    name: 'Стеклянная Форма Входа',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6',
    component: (
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 w-64">
          <h3 className="text-white font-bold text-lg mb-4 text-center">Вход</h3>
          <div className="space-y-4">
            <input 
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Email"
            />
            <input 
              type="password"
              className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Пароль"
            />
            <button className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-medium py-3 rounded-lg transition-all">
              Войти
            </button>
          </div>
        </div>
      </div>
    ),
    description: 'Форма входа в стеклянном стиле'
  },
  {
    category: 'Формы',
    name: 'Стеклянное Поле Поиска',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-4 py-3',
    component: (
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-6 rounded-xl">
        <div className="relative">
          <input 
            className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-12 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
            placeholder="Поиск товаров..."
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
        </div>
      </div>
    ),
    description: 'Поле поиска со стеклянным эффектом'
  },

  // Glass Icons & Buttons
  {
    category: 'Иконки',
    name: 'Стеклянные Иконки Действий',
    code: 'bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4',
    component: (
      <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-6 rounded-xl">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex flex-col items-center space-y-2 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Download className="w-6 h-6" />
            <span className="text-xs">Скачать</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex flex-col items-center space-y-2 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Share2 className="w-6 h-6" />
            <span className="text-xs">Поделиться</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex flex-col items-center space-y-2 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Heart className="w-6 h-6" />
            <span className="text-xs">Лайк</span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-4 flex flex-col items-center space-y-2 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Plus className="w-6 h-6" />
            <span className="text-xs">Добавить</span>
          </div>
        </div>
      </div>
    ),
    description: 'Набор стеклянных иконок для действий'
  },
  {
    category: 'Иконки',
    name: 'Стеклянные Социальные Иконки',
    code: 'bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3',
    component: (
      <div className="bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6 rounded-xl">
        <div className="flex space-x-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Heart className="w-6 h-6" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Share2 className="w-6 h-6" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Star className="w-6 h-6" />
          </div>
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 text-white hover:bg-white/30 transition-all cursor-pointer">
            <Gift className="w-6 h-6" />
          </div>
        </div>
      </div>
    ),
    description: 'Круглые стеклянные иконки для соцсетей'
  },

  // Glass Buttons
  {
    category: 'Кнопки',
    name: 'Стеклянная Основная Кнопка',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all',
    component: (
      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6 rounded-xl flex justify-center">
        <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all font-medium">
          Купить сейчас
        </button>
      </div>
    ),
    description: 'Основная стеклянная кнопка'
  },
  {
    category: 'Кнопки',
    name: 'Стеклянная Кнопка Контур',
    code: 'border-2 border-white/50 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all',
    component: (
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-xl flex justify-center">
        <button className="border-2 border-white/50 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all font-medium">
          Подробнее
        </button>
      </div>
    ),
    description: 'Стеклянная кнопка с границей'
  },

  // Glass Notifications
  {
    category: 'Уведомления',
    name: 'Стеклянное Уведомление',
    code: 'bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4',
    component: (
      <div className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-6 rounded-xl">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white max-w-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Новый заказ!</h4>
              <p className="text-white/80 text-xs">Пользователь оформил заказ на 2,500₽</p>
            </div>
          </div>
        </div>
      </div>
    ),
    description: 'Уведомление со стеклянным эффектом'
  }
]
