// Готовые шаблоны магазинов TeleShop Constructor

import { BlockData } from '@/types/blocks'

export interface Template {
  id: string
  name: string
  description: string
  preview?: string
  category: string
  createdAt: string
  updatedAt: string
  blocks: BlockData[]
}

export const TEMPLATES: Template[] = [
  {
    id: 'telegram-simple',
    name: 'Простой Telegram магазин',
    description: 'Базовый магазин для Telegram с основными блоками',
    category: 'Telegram',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    blocks: [
      {
        id: 'banner_1',
        type: 'telegram-banner',
        order: 0,
        data: {
          title: 'Добро пожаловать!',
          subtitle: 'Лучший выбор по отличным ценам',
          primaryColor: '#2563eb',
          textColor: '#ffffff',
          showButton: true,
          buttonText: 'Смотреть каталог'
        }
      },
      {
        id: 'categories_1',
        type: 'telegram-categories',
        order: 1,
        data: {
          title: 'Популярные категории',
          layout: 'grid',
          columns: 2,
          categories: [
            { id: 1, name: 'Электроника', icon: '📱', count: 25, color: '#3b82f6' },
            { id: 2, name: 'Одежда', icon: '👕', count: 42, color: '#10b981' }
          ]
        }
      },
      {
        id: 'product_1',
        type: 'telegram-product',
        order: 2,
        data: {
          title: 'Товар дня',
          price: '1 500 ₽',
          oldPrice: '2 000 ₽',
          description: 'Специальное предложение',
          rating: 4.8,
          inStock: true
        }
      }
    ]
  },
  
  {
    id: 'classic-shop',
    name: 'Классический магазин',
    description: 'Стандартный интернет-магазин',
    category: 'Базовый',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    blocks: [
      {
        id: 'header_1',
        type: 'header',
        order: 0,
        data: {
          title: 'Интернет магазин',
          subtitle: 'Качественные товары',
          level: 1,
          textAlign: 'center'
        }
      },
      {
        id: 'banner_1',
        type: 'banner',
        order: 1,
        data: {
          title: 'Большая распродажа',
          subtitle: 'Скидки до 50%',
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          buttonText: 'Смотреть товары'
        }
      },
      {
        id: 'products_1',
        type: 'product-grid',
        order: 2,
        data: {
          title: 'Популярные товары',
          columns: 2,
          showPrice: true
        }
      }
    ]
  },

  {
    id: 'minimal',
    name: 'Минимальный',
    description: 'Простой и чистый дизайн',
    category: 'Базовый',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    blocks: [
      {
        id: 'text_1',
        type: 'text',
        order: 0,
        data: {
          title: 'Добро пожаловать',
          content: 'Простой и элегантный магазин',
          textAlign: 'center'
        }
      },
      {
        id: 'button_1',
        type: 'button',
        order: 1,
        data: {
          text: 'Смотреть каталог',
          style: 'primary',
          align: 'center'
        }
      }
    ]
  }
]

export const getTemplateById = (id: string): Template | undefined => {
  return TEMPLATES.find(template => template.id === id)
}

export const getTemplatesByCategory = (category: string): Template[] => {
  return TEMPLATES.filter(template => template.category === category)
}

export const getTemplateCategories = (): string[] => {
  const categories = new Set(TEMPLATES.map(template => template.category))
  return Array.from(categories)
} 