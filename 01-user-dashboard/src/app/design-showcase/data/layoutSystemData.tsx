import React from 'react'

export const layoutSystemData = [
  {
    name: 'Page Background',
    className: 'ts-page-bg',
    code: 'ts-page-bg',
    component: (
      <div className="ts-page-bg h-32 w-full rounded-lg flex items-center justify-center">
        <p className="text-gray-700 font-medium">Фон страницы с градиентом</p>
      </div>
    ),
    description: 'Градиентный фон страницы от серого к синему и фиолетовому'
  },
  {
    name: 'Sidebar',
    className: 'ts-sidebar',
    code: 'ts-sidebar',
    component: (
      <div className="ts-sidebar h-32 w-64 rounded-lg p-4">
        <p className="text-gray-700 font-medium">Боковая панель</p>
        <p className="text-gray-500 text-sm mt-2">С эффектом размытия</p>
      </div>
    ),
    description: 'Боковая панель с размытием и полупрозрачностью'
  },
  {
    name: 'Main Content',
    className: 'ts-main-content',
    code: 'ts-main-content',
    component: (
      <div className="ts-main-content h-32 w-full rounded-lg">
        <p className="text-gray-700 font-medium">Основной контент</p>
        <p className="text-gray-500 text-sm mt-2">С размытым фоном</p>
      </div>
    ),
    description: 'Основная область контента с размытым фоном'
  },
  {
    name: 'Container',
    className: 'ts-container',
    code: 'ts-container',
    component: (
      <div className="ts-container bg-white/50 rounded-lg p-4">
        <p className="text-gray-700 font-medium">Контейнер</p>
        <p className="text-gray-500 text-sm mt-2">Адаптивный с максимальной шириной</p>
      </div>
    ),
    description: 'Адаптивный контейнер с максимальной шириной и отступами'
  }
] 