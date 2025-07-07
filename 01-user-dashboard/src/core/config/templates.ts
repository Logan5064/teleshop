// Готовые шаблоны магазинов TeleShop Constructor

import { BlockData } from '@/types/blocks'

export interface Template {
  id: string
  name: string
  category: string
  description: string
  preview: string
  blocks: BlockData[]
}

export const TEMPLATES: Template[] = [
  {
    id: 'shop-1',
    name: 'Магазин одежды',
    category: 'Магазин',
    description: 'Современный шаблон для магазина одежды с каталогом и корзиной',
    preview: '/templates/shop-1.jpg',
    blocks: [
      {
        id: 'header_1',
        type: 'header',
        order: 0,
        data: {
          type: 'header',
          logo: '/logo.png',
          menuItems: [
            { text: 'Главная', url: '/' },
            { text: 'Каталог', url: '/catalog' },
            { text: 'О нас', url: '/about' },
            { text: 'Контакты', url: '/contacts' }
          ],
          contacts: {
            phone: '+7 (999) 123-45-67',
            email: 'shop@example.com'
          }
        }
      },
      {
        id: 'banner_1',
        type: 'banner',
        order: 1,
        data: {
          type: 'banner',
          title: 'Новая коллекция',
          subtitle: 'Весна-Лето 2024',
          imageUrl: '/banners/fashion.jpg',
          buttonText: 'Смотреть каталог',
          buttonUrl: '/catalog'
        }
      },
      {
        id: 'categories_1',
        type: 'categories',
        order: 2,
        data: {
          type: 'categories',
          title: 'Категории',
          categories: [
            { id: 'women', name: 'Женская одежда', icon: '👗' },
            { id: 'men', name: 'Мужская одежда', icon: '👔' },
            { id: 'kids', name: 'Детская одежда', icon: '🧸' },
            { id: 'accessories', name: 'Аксессуары', icon: '👜' }
          ]
        }
      },
      {
        id: 'product_grid_1',
        type: 'product-grid',
        order: 3,
        data: {
          type: 'product-grid',
          title: 'Популярные товары',
          products: ['product1', 'product2', 'product3', 'product4', 'product5', 'product6'],
          showFilters: true
        }
      },
      {
        id: 'features_1',
        type: 'features',
        order: 4,
        data: {
          type: 'features',
          title: 'Наши преимущества',
          features: [
            {
              title: 'Быстрая доставка',
              description: 'Доставка по всей России от 1 дня',
              icon: '🚚'
            },
            {
              title: 'Гарантия качества',
              description: 'Только проверенные бренды',
              icon: '✨'
            },
            {
              title: 'Удобная оплата',
              description: 'Любой способ оплаты',
              icon: '💳'
            }
          ]
        }
      },
      {
        id: 'footer_1',
        type: 'footer',
        order: 5,
        data: {
          type: 'footer',
          columns: [
            {
              title: 'О компании',
              links: [
                { text: 'О нас', url: '/about' },
                { text: 'Контакты', url: '/contacts' },
                { text: 'Доставка', url: '/delivery' }
              ]
            },
            {
              title: 'Покупателям',
              links: [
                { text: 'Как сделать заказ', url: '/how-to-order' },
                { text: 'Оплата', url: '/payment' },
                { text: 'Возврат', url: '/returns' }
              ]
            }
          ],
          copyright: '© 2024 Fashion Shop. Все права защищены.'
        }
      }
    ]
  },
  {
    id: 'landing-1',
    name: 'Лендинг услуг',
    category: 'Лендинг',
    description: 'Продающий лендинг для презентации услуг',
    preview: '/templates/landing-1.jpg',
    blocks: [
      {
        id: 'header_1',
        type: 'header',
        order: 0,
        data: {
          type: 'header',
          logo: '/logo.png',
          menuItems: [
            { text: 'Услуги', url: '#services' },
            { text: 'Преимущества', url: '#features' },
            { text: 'Отзывы', url: '#testimonials' },
            { text: 'Контакты', url: '#contacts' }
          ],
          contacts: {
            phone: '+7 (999) 123-45-67',
            email: 'info@example.com'
          }
        }
      },
      {
        id: 'banner_1',
        type: 'banner',
        order: 1,
        data: {
          type: 'banner',
          title: 'Профессиональные услуги',
          subtitle: 'Решаем ваши задачи быстро и качественно',
          imageUrl: '/banners/services.jpg',
          buttonText: 'Заказать консультацию',
          buttonUrl: '#contact'
        }
      },
      {
        id: 'features_1',
        type: 'features',
        order: 2,
        data: {
          type: 'features',
          title: 'Почему мы?',
          features: [
            {
              title: 'Опыт работы',
              description: 'Более 10 лет на рынке',
              icon: '🏆'
            },
            {
              title: 'Гарантия результата',
              description: 'Работаем до полного решения задачи',
              icon: '✅'
            },
            {
              title: 'Выгодные цены',
              description: 'Лучшее соотношение цена/качество',
              icon: '💰'
            }
          ]
        }
      },
      {
        id: 'price_list_1',
        type: 'price-list',
        order: 3,
        data: {
          type: 'price-list',
          title: 'Наши услуги',
          items: [
            {
              name: 'Базовая консультация',
              price: 5000,
              description: 'Анализ ситуации и рекомендации'
            },
            {
              name: 'Стандартный пакет',
              price: 15000,
              description: 'Полное сопровождение проекта'
            },
            {
              name: 'Премиум решение',
              price: 30000,
              description: 'Индивидуальный подход и приоритетная поддержка'
            }
          ]
        }
      },
      {
        id: 'testimonials_1',
        type: 'testimonials',
        order: 4,
        data: {
          type: 'testimonials',
          title: 'Отзывы клиентов',
          testimonials: [
            {
              author: 'Иван Петров',
              text: 'Отличный сервис! Все сделали быстро и качественно.',
              rating: 5,
              avatar: '/avatars/client1.jpg'
            },
            {
              author: 'Анна Сидорова',
              text: 'Профессиональный подход к делу. Рекомендую!',
              rating: 5,
              avatar: '/avatars/client2.jpg'
            }
          ]
        }
      },
      {
        id: 'contact_1',
        type: 'contact',
        order: 5,
        data: {
          type: 'contact',
          title: 'Свяжитесь с нами',
          fields: [
            {
              type: 'text',
              label: 'Ваше имя',
              required: true
            },
            {
              type: 'email',
              label: 'Email',
              required: true
            },
            {
              type: 'phone',
              label: 'Телефон',
              required: true
            },
            {
              type: 'textarea',
              label: 'Сообщение',
              required: false
            }
          ],
          submitText: 'Отправить'
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