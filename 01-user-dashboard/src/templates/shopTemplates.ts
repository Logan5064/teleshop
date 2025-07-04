export interface ShopTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  preview?: string;
  blocks: any[];
}

export const shopTemplates: ShopTemplate[] = [
  {
    id: 'basic-shop',
    name: 'Базовый магазин',
    description: 'Простой шаблон для начала работы',
    category: 'Базовые',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Добро пожаловать в наш магазин!',
          description: 'Качественные товары по выгодным ценам',
          image: '',
          backgroundColor: '#f8f9fa'
        }
      },
      {
        id: '2',
        type: 'product',
        order: 1,
        data: {
          title: 'Наши товары',
          products: [
            {
              id: 'p1',
              name: 'Товар 1',
              price: 1000,
              image: '',
              description: 'Описание товара'
            }
          ]
        }
      },
      {
        id: '3',
        type: 'button',
        order: 2,
        data: {
          text: 'Связаться с нами',
          url: 'https://t.me/support',
          style: 'primary'
        }
      }
    ]
  },
  {
    id: 'clothing-store',
    name: 'Магазин одежды',
    description: 'Шаблон для магазина одежды и аксессуаров',
    category: 'Тематические',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Модная одежда',
          description: 'Стильные образы на любой случай',
          image: '',
          backgroundColor: '#ffe4e1'
        }
      },
      {
        id: '2',
        type: 'categories',
        order: 1,
        data: {
          title: 'Категории',
          categories: [
            { id: 'c1', name: 'Мужская одежда', image: '' },
            { id: 'c2', name: 'Женская одежда', image: '' },
            { id: 'c3', name: 'Аксессуары', image: '' }
          ]
        }
      },
      {
        id: '3',
        type: 'product-grid',
        order: 2,
        data: {
          title: 'Новинки',
          products: [
            {
              id: 'p1',
              name: 'Платье летнее',
              price: 2500,
              oldPrice: 3000,
              image: '',
              badge: 'SALE'
            },
            {
              id: 'p2',
              name: 'Рубашка мужская',
              price: 1800,
              image: ''
            }
          ]
        }
      }
    ]
  },
  {
    id: 'electronics-store',
    name: 'Магазин электроники',
    description: 'Шаблон для продажи электроники и гаджетов',
    category: 'Тематические',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Электроника и гаджеты',
          description: 'Последние новинки техники',
          image: '',
          backgroundColor: '#e8f4f8'
        }
      },
      {
        id: '2',
        type: 'features',
        order: 1,
        data: {
          title: 'Наши преимущества',
          features: [
            { title: 'Быстрая доставка', description: 'От 1 дня', icon: '🎯' },
            { title: 'Гарантия качества', description: '100% надежно', icon: '✓' },
            { title: 'Рассрочка', description: '0% переплаты', icon: '₽' }
          ]
        }
      },
      {
        id: '3',
        type: 'product-showcase',
        order: 2,
        data: {
          title: 'Хиты продаж',
          products: [
            {
              id: 'p1',
              name: 'iPhone 15 Pro',
              price: 89990,
              image: '',
              specifications: ['128GB', 'Titanium', '5G']
            }
          ]
        }
      }
    ]
  },
  {
    id: 'food-delivery',
    name: 'Доставка еды',
    description: 'Шаблон для ресторана или службы доставки',
    category: 'Тематические',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Вкусная еда с доставкой',
          description: 'Быстро, горячо, вкусно!',
          image: '',
          backgroundColor: '#fff8dc'
        }
      },
      {
        id: '2',
        type: 'menu-categories',
        order: 1,
        data: {
          title: 'Меню',
          categories: [
            { id: 'c1', name: 'Пицца', image: '', count: 12 },
            { id: 'c2', name: 'Суши', image: '', count: 25 },
            { id: 'c3', name: 'Бургеры', image: '', count: 8 }
          ]
        }
      },
      {
        id: '3',
        type: 'delivery-info',
        order: 2,
        data: {
          title: 'Условия доставки',
          zones: [
            { name: 'Центр', time: '30-45 мин', price: 0 },
            { name: 'Спальные районы', time: '45-60 мин', price: 200 }
          ]
        }
      }
    ]
  },
  {
    id: 'services',
    name: 'Услуги',
    description: 'Шаблон для предоставления услуг',
    category: 'Базовые',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Профессиональные услуги',
          description: 'Качественно и в срок',
          image: '',
          backgroundColor: '#f0f8ff'
        }
      },
      {
        id: '2',
        type: 'services-list',
        order: 1,
        data: {
          title: 'Наши услуги',
          services: [
            {
              id: 's1',
              name: 'Консультация',
              price: 'Бесплатно',
              duration: '30 мин',
              description: 'Первичная консультация'
            },
            {
              id: 's2',
              name: 'Базовый пакет',
              price: 5000,
              duration: '2-3 дня',
              description: 'Стандартный набор услуг'
            }
          ]
        }
      },
      {
        id: '3',
        type: 'contact-form',
        order: 2,
        data: {
          title: 'Оставить заявку',
          fields: [
            { type: 'text', name: 'name', placeholder: 'Ваше имя', required: true },
            { type: 'tel', name: 'phone', placeholder: 'Телефон', required: true },
            { type: 'textarea', name: 'message', placeholder: 'Описание задачи' }
          ]
        }
      }
    ]
  },
  {
    id: 'portfolio',
    name: 'Портфолио',
    description: 'Шаблон для демонстрации работ',
    category: 'Специальные',
    blocks: [
      {
        id: '1',
        type: 'banner',
        order: 0,
        data: {
          title: 'Мое портфолио',
          description: 'Примеры выполненных работ',
          image: '',
          backgroundColor: '#faf0e6'
        }
      },
      {
        id: '2',
        type: 'about',
        order: 1,
        data: {
          title: 'Обо мне',
          description: 'Опытный специалист с 5+ летним стажем',
          skills: ['Дизайн', 'Разработка', 'Консультации'],
          avatar: ''
        }
      },
      {
        id: '3',
        type: 'portfolio-gallery',
        order: 2,
        data: {
          title: 'Мои работы',
          projects: [
            {
              id: 'proj1',
              title: 'Проект 1',
              description: 'Описание проекта',
              image: '',
              tags: ['Web', 'Design']
            }
          ]
        }
      }
    ]
  }
];

export const templateCategories = [
  'Все',
  'Базовые',
  'Тематические',
  'Специальные'
];