import React from 'react'

export const typographySystemData = [
  {
    name: 'Main Title',
    className: 'ts-title-main',
    code: 'ts-title-main',
    component: <h1 className="ts-title-main">Основной заголовок</h1>,
    description: 'Главный заголовок страницы (3xl-4xl, жирный)'
  },
  {
    name: 'Section Title',
    className: 'ts-title-section',
    code: 'ts-title-section',
    component: <h2 className="ts-title-section">Заголовок секции</h2>,
    description: 'Заголовок секции (2xl-3xl, полужирный)'
  },
  {
    name: 'Card Title',
    className: 'ts-title-card',
    code: 'ts-title-card',
    component: <h3 className="ts-title-card">Заголовок карточки</h3>,
    description: 'Заголовок карточки (xl, полужирный)'
  },
  {
    name: 'Subtitle',
    className: 'ts-subtitle',
    code: 'ts-subtitle',
    component: <h4 className="ts-subtitle">Подзаголовок</h4>,
    description: 'Подзаголовок (lg, средний)'
  },
  {
    name: 'Body Text',
    className: 'ts-text-body',
    code: 'ts-text-body',
    component: <p className="ts-text-body">Основной текст для чтения. Этот текст имеет оптимальную высоту строки и цвет для комфортного чтения длинных текстов.</p>,
    description: 'Основной текст с оптимальной читаемостью'
  },
  {
    name: 'Meta Text',
    className: 'ts-text-meta',
    code: 'ts-text-meta',
    component: <p className="ts-text-meta">Метаинформация, дата, время</p>,
    description: 'Мелкий текст для метаинформации'
  }
] 