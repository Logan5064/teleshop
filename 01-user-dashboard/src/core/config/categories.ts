// Конфигурация категорий блоков TeleShop Constructor

import { BlockCategory, BlockType } from '@/types/blocks'

// Категории блоков для селектора
export const blockCategories: BlockCategory[] = [
  {
    id: 'telegram',
    name: 'Telegram',
    icon: '💬',
    blocks: [
      'telegram-banner' as BlockType,
      'telegram-product' as BlockType,
      'telegram-categories' as BlockType,
      'telegram-slider' as BlockType,
      'telegram-contacts' as BlockType,
      'telegram-map' as BlockType
    ]
  },
  {
    id: 'basic',
    name: 'Основные',
    icon: '📝',
    blocks: [
      'banner' as BlockType,
      'text' as BlockType,
      'button' as BlockType,
      'image' as BlockType,
      'spacer' as BlockType
    ]
  },
  {
    id: 'content',
    name: 'Контент',
    icon: '📰',
    blocks: [
      'product' as BlockType,
      'product-grid' as BlockType,
      'categories' as BlockType,
      'features' as BlockType,
      'testimonials' as BlockType,
      'video' as BlockType
    ]
  },
  {
    id: 'commerce',
    name: 'Торговля',
    icon: '🛒',
    blocks: [
      'price-list' as BlockType,
      'order-form' as BlockType,
      'payment' as BlockType,
      'delivery-info' as BlockType,
      'cart' as BlockType
    ]
  },
  {
    id: 'interactive',
    name: 'Интерактивные',
    icon: '⚙️',
    blocks: [
      'form' as BlockType,
      'contact' as BlockType,
      'social' as BlockType,
      'map' as BlockType
    ]
  },
  {
    id: 'layout',
    name: 'Макет',
    icon: '📐',
    blocks: [
      'header' as BlockType,
      'footer' as BlockType,
      'divider' as BlockType,
      'columns' as BlockType,
      'tabs' as BlockType
    ]
  }
]

// Получить категорию по ID
export const getCategoryById = (id: string): BlockCategory | undefined => {
  return blockCategories.find(cat => cat.id === id)
}

// Получить все блоки категории
export const getBlocksByCategory = (categoryId: string): BlockType[] => {
  const category = getCategoryById(categoryId)
  return category?.blocks || []
}

// Найти категорию блока
export const getCategoryByBlock = (blockType: BlockType): BlockCategory | undefined => {
  return blockCategories.find(cat => cat.blocks.includes(blockType))
} 