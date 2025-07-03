import React from 'react'

export const gridSpacingData = [
  {
    name: 'Stats Grid',
    className: 'ts-grid-stats',
    code: 'ts-grid-stats',
    component: (
      <div className="ts-grid-stats">
        <div className="ts-card p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">1,234</div>
          <div className="text-sm text-gray-500">Пользователи</div>
        </div>
        <div className="ts-card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">5,678</div>
          <div className="text-sm text-gray-500">Продажи</div>
        </div>
        <div className="ts-card p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">9,012</div>
          <div className="text-sm text-gray-500">Просмотры</div>
        </div>
        <div className="ts-card p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">3,456</div>
          <div className="text-sm text-gray-500">Клики</div>
        </div>
      </div>
    ),
    description: 'Адаптивная сетка для статистики (1/2/4 колонки)'
  },
  {
    name: 'Main Grid',
    className: 'ts-grid-main',
    code: 'ts-grid-main',
    component: (
      <div className="ts-grid-main">
        <div className="ts-card p-4">
          <h3 className="font-bold mb-2">Колонка 1</h3>
          <p className="text-gray-600 text-sm">Основная сетка</p>
        </div>
        <div className="ts-card p-4">
          <h3 className="font-bold mb-2">Колонка 2</h3>
          <p className="text-gray-600 text-sm">1 или 3 колонки</p>
        </div>
        <div className="ts-card p-4">
          <h3 className="font-bold mb-2">Колонка 3</h3>
          <p className="text-gray-600 text-sm">Адаптивно</p>
        </div>
      </div>
    ),
    description: 'Основная сетка макета (1/3 колонки)'
  },
  {
    name: 'Section Spacing',
    className: 'ts-spacing-section',
    code: 'ts-spacing-section',
    component: (
      <div className="ts-spacing-section bg-blue-50 rounded-lg">
        <div className="text-center">
          <h3 className="font-bold text-lg">Секция с отступами</h3>
          <p className="text-gray-600 text-sm">Вертикальные отступы для секций</p>
        </div>
      </div>
    ),
    description: 'Стандартные отступы для секций (py-8 lg:py-12)'
  },
  {
    name: 'Card Spacing',
    className: 'ts-spacing-card',
    code: 'ts-spacing-card',
    component: (
      <div className="ts-spacing-card bg-white border border-gray-200 rounded-lg">
        <h3 className="font-bold text-lg">Карточка с отступами</h3>
        <p className="text-gray-600 text-sm">Внутренние отступы для карточек</p>
      </div>
    ),
    description: 'Стандартные отступы для карточек (p-6 lg:p-8)'
  }
] 