import React from 'react'

export const typographyStyles = [
  {
    name: 'Основной заголовок',
    code: 'ts-title-main',
    component: React.createElement('h1', { className: 'ts-title-main' }, 'Основной заголовок')
  },
  {
    name: 'Подзаголовок',
    code: 'ts-subtitle',
    component: React.createElement('h2', { className: 'ts-subtitle' }, 'Подзаголовок')
  },
  {
    name: 'Гигантский заголовок',
    code: 'text-6xl font-black text-gray-900',
    component: React.createElement('h1', { className: 'text-6xl font-black text-gray-900' }, 'Гигантский')
  },
  {
    name: 'Крупный заголовок',
    code: 'text-5xl font-bold text-gray-800',
    component: React.createElement('h1', { className: 'text-5xl font-bold text-gray-800' }, 'Крупный заголовок')
  },
  {
    name: 'Заголовок секции',
    code: 'text-3xl font-semibold text-gray-700',
    component: React.createElement('h2', { className: 'text-3xl font-semibold text-gray-700' }, 'Заголовок секции')
  },
  {
    name: 'Подзаголовок секции',
    code: 'text-2xl font-medium text-gray-600',
    component: React.createElement('h3', { className: 'text-2xl font-medium text-gray-600' }, 'Подзаголовок секции')
  },
  {
    name: 'Заголовок карточки',
    code: 'text-xl font-semibold text-gray-900',
    component: React.createElement('h4', { className: 'text-xl font-semibold text-gray-900' }, 'Заголовок карточки')
  },
  {
    name: 'Основной текст',
    code: 'text-base text-gray-700 leading-relaxed',
    component: React.createElement('p', { className: 'text-base text-gray-700 leading-relaxed' }, 'Основной текст с комфортным интерлиньяжем')
  },
  {
    name: 'Мелкий текст',
    code: 'text-sm text-gray-600',
    component: React.createElement('p', { className: 'text-sm text-gray-600' }, 'Мелкий текст для дополнительной информации')
  },
  {
    name: 'Жирный акцент',
    code: 'font-bold text-gray-900',
    component: React.createElement('span', { className: 'font-bold text-gray-900' }, 'Жирный акцент')
  },
  {
    name: 'Курсивный текст',
    code: 'italic text-gray-700',
    component: React.createElement('span', { className: 'italic text-gray-700' }, 'Курсивный текст')
  },
  {
    name: 'Успех текст',
    code: 'text-green-600 font-medium',
    component: React.createElement('span', { className: 'text-green-600 font-medium' }, 'Успешно выполнено')
  },
  {
    name: 'Ошибка текст',
    code: 'text-red-600 font-medium',
    component: React.createElement('span', { className: 'text-red-600 font-medium' }, 'Ошибка выполнения')
  },
  {
    name: 'Бейдж текст',
    code: 'text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full',
    component: React.createElement('span', { className: 'text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full' }, 'НОВОЕ')
  }
]
