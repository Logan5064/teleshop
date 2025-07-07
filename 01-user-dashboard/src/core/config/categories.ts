// Конфигурация категорий блоков TeleShop Constructor

import React from 'react';
import { BlockType, BlockCategory, BlockInfo } from '@/types/blocks'

// Категории блоков для селектора
export const blockCategories: Record<string, BlockCategory> = {
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    icon: '📱',
    blocks: [
      {
        type: 'telegram-banner',
        title: 'Баннер',
        icon: '🎯',
        description: 'Баннер с кнопкой для Telegram'
      },
      {
        type: 'telegram-categories',
        title: 'Категории',
        icon: '📑',
        description: 'Список категорий для Telegram'
      }
    ]
  },
  basic: {
    id: 'basic',
    name: 'Базовые',
    icon: '📦',
    blocks: [
      {
        type: 'banner',
        title: 'Баннер',
        description: 'Большое изображение с текстом и кнопкой',
        icon: '🖼️'
      },
      {
        type: 'text',
        title: 'Текст',
        description: 'Текстовый блок с форматированием',
        icon: '📝'
      },
      {
        type: 'button',
        title: 'Кнопка',
        description: 'Кнопка с настраиваемым действием',
        icon: '🔘'
      },
      {
        type: 'image',
        title: 'Изображение',
        description: 'Изображение с подписью',
        icon: '🖼️'
      },
      {
        type: 'spacer',
        title: 'Разделитель',
        description: 'Вертикальный отступ',
        icon: '↕️'
      }
    ]
  },
  commerce: {
    id: 'commerce',
    name: 'Коммерция',
    icon: '🛍️',
    blocks: [
      {
        type: 'product-grid',
        title: 'Список товаров',
        icon: '📋',
        description: 'Список товаров с фильтрами'
      },
      {
        type: 'telegram-product',
        title: 'Карточка товара',
        icon: '🏷️',
        description: 'Детальная карточка товара'
      }
    ]
  },
  content: {
    id: 'content',
    name: 'Контент',
    icon: '📄',
    blocks: [
      {
        type: 'telegram-product',
        title: 'Товар',
        description: 'Карточка товара с описанием',
        icon: '🛍️'
      },
      {
        type: 'product-grid',
        title: 'Сетка товаров',
        description: 'Сетка товаров с фильтрами',
        icon: '🏪'
      },
      {
        type: 'categories',
        title: 'Категории',
        description: 'Список категорий с иконками',
        icon: '📑'
      },
      {
        type: 'features',
        title: 'Преимущества',
        description: 'Список преимуществ с иконками',
        icon: '✨'
      },
      {
        type: 'testimonials',
        title: 'Отзывы',
        description: 'Карусель отзывов клиентов',
        icon: '💬'
      },
      {
        type: 'price-list',
        title: 'Прайс-лист',
        description: 'Список цен на услуги',
        icon: '💰'
      }
    ]
  },
  forms: {
    id: 'forms',
    name: 'Формы',
    icon: '📋',
    blocks: [
      {
        type: 'contact',
        title: 'Контактная форма',
        icon: '✉️',
        description: 'Форма обратной связи'
      },
      {
        type: 'form',
        title: 'Форма подписки',
        icon: '📨',
        description: 'Форма для сбора email-адресов'
      }
    ]
  },
  headers: {
    id: 'headers',
    name: 'Шапки',
    icon: '🎩',
    blocks: [
      {
        type: 'header',
        title: 'Простая шапка',
        icon: '📰',
        description: 'Простая шапка с логотипом и меню'
      },
      {
        type: 'header',
        title: 'Полная шапка',
        icon: '🗞️',
        description: 'Шапка с дополнительными элементами'
      }
    ]
  },
  interactive: {
    id: 'interactive',
    name: 'Интерактив',
    icon: '🎯',
    blocks: [
      {
        type: 'order-form',
        title: 'Форма заказа',
        description: 'Форма оформления заказа',
        icon: '📝'
      },
      {
        type: 'payment',
        title: 'Оплата',
        description: 'Выбор способа оплаты',
        icon: '💳'
      },
      {
        type: 'delivery-info',
        title: 'Доставка',
        description: 'Информация о доставке',
        icon: '🚚'
      },
      {
        type: 'cart',
        title: 'Корзина',
        description: 'Корзина товаров',
        icon: '🛒'
      },
      {
        type: 'form',
        title: 'Форма',
        description: 'Универсальная форма',
        icon: '📋'
      },
      {
        type: 'contact',
        title: 'Контакты',
        description: 'Форма обратной связи',
        icon: '📞'
      }
    ]
  },
  media: {
    id: 'media',
    name: 'Медиа',
    icon: '🎥',
    blocks: [
      {
        type: 'social',
        title: 'Соцсети',
        description: 'Ссылки на соцсети',
        icon: '📱'
      },
      {
        type: 'map',
        title: 'Карта',
        description: 'Карта с маркером',
        icon: '🗺️'
      },
      {
        type: 'video',
        title: 'Видео',
        description: 'Видео с YouTube или Vimeo',
        icon: '🎬'
      }
    ]
  }
};

// Получить категорию по ID
export const getCategoryById = (id: string): BlockCategory | undefined => {
  return blockCategories[id];
}

// Получить все блоки категории
export const getBlocksByCategory = (categoryId: string): BlockType[] => {
  const category = getCategoryById(categoryId);
  return category?.blocks.map(block => block.type) || [];
}

// Найти категорию блока
export const getCategoryByBlock = (blockType: BlockType): BlockCategory | undefined => {
  return Object.values(blockCategories).find(category => 
    category.blocks.some(block => block.type === blockType)
  );
} 