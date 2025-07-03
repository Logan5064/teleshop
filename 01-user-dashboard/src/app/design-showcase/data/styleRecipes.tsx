import React from 'react'

export const styleRecipes = [
  // Кнопки
  {
    name: 'Основная кнопка',
    description: 'Стандартная кнопка с эффектами наведения',
    category: 'Кнопки',
    code: 'ts-btn-primary hover:scale-105 transition-all duration-200',
    component: <button className="ts-btn-primary hover:scale-105 transition-all duration-200">Купить сейчас</button>
  },
  {
    name: 'Кнопка с тенью',
    description: 'Кнопка с глубокой тенью для акцента',
    category: 'Кнопки',
    code: 'ts-btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300',
    component: <button className="ts-btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">Заказать</button>
  },
  {
    name: 'Градиентная кнопка',
    description: 'Кнопка с градиентным фоном',
    category: 'Кнопки',
    code: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300',
    component: <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">Градиент</button>
  },

  // Карточки  
  {
    name: 'Карточка товара',
    description: 'Базовая карточка с hover эффектом',
    category: 'Карточки',
    code: 'ts-card ts-card-hover transform hover:scale-105 transition-all duration-300',
    component: (
      <div className="ts-card ts-card-hover transform hover:scale-105 transition-all duration-300 max-w-sm">
        <div className="p-4">
          <h3 className="ts-title-card">Товар</h3>
          <p className="ts-text-meta">999 ₽</p>
        </div>
      </div>
    )
  },
  {
    name: 'Стеклянная карточка',
    description: 'Карточка с эффектом стекла',
    category: 'Карточки',
    code: 'bg-white/30 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg',
    component: (
      <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg max-w-sm">
        <h3 className="font-semibold text-gray-800">Стеклянная карточка</h3>
        <p className="text-gray-600 text-sm mt-2">С эффектом размытия фона</p>
      </div>
    )
  },

  // Формы
  {
    name: 'Современное поле ввода',
    description: 'Стилизованное поле с фокусом',
    category: 'Формы',
    code: 'ts-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    component: <input className="ts-input focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" placeholder="Введите текст" />
  },

  // Утилиты
  {
    name: 'Текст с градиентом',
    description: 'Градиентный цвет текста',
    category: 'Утилиты',
    code: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold',
    component: <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-2xl">Градиентный текст</h2>
  },

  // Анимации
  {
    name: 'Пульсация',
    description: 'Анимация пульсирующего элемента',
    category: 'Анимации', 
    code: 'animate-pulse bg-blue-500 rounded-full',
    component: <div className="animate-pulse bg-blue-500 rounded-full w-4 h-4"></div>
  },
  {
    name: 'Вращение',
    description: 'Бесконечное вращение элемента',
    category: 'Анимации',
    code: 'animate-spin border-4 border-blue-500 border-t-transparent rounded-full',
    component: <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8"></div>
  }
]