// Настройки блоков по умолчанию TeleShop Constructor

import { BlockType, BlockDataType } from '@/types/blocks'

type BlockDefaults = {
  [K in BlockType]: Omit<Extract<BlockDataType, { type?: K }>, 'type'>;
};

export const blockDefaults: Partial<BlockDefaults> = {
  // Telegram блоки
  'telegram-banner': {
    title: 'Добро пожаловать!',
    subtitle: 'Ваш лучший выбор здесь',
    primaryColor: '#2563eb',
    textColor: '#ffffff',
    showButton: true,
    buttonText: 'Подробнее',
    backgroundType: 'gradient'
  },

  'telegram-product': {
    title: 'Товар дня',
    price: '1 500 ₽',
    oldPrice: '2 000 ₽',
    description: 'Качественный товар по выгодной цене',
    rating: 4.8,
    inStock: true,
    stockCount: 15,
    image: null,
    showDiscount: true,
    showRating: true,
    showStock: true
  },

  'telegram-categories': {
    title: 'Категории товаров',
    layout: 'grid',
    columns: 2,
    categories: [
      { id: 1, name: 'Электроника', icon: '📱', count: 25, color: '#3b82f6' },
      { id: 2, name: 'Одежда', icon: '👕', count: 42, color: '#10b981' },
      { id: 3, name: 'Дом и сад', icon: '🏠', count: 18, color: '#f59e0b' },
      { id: 4, name: 'Спорт', icon: '⚽', count: 31, color: '#ef4444' }
    ]
  },

  'telegram-slider': {
    title: 'Популярные товары',
    autoplay: true,
    showDots: true,
    showArrows: true,
    interval: 3000,
    items: [
      { id: 1, image: null, title: 'Товар 1', price: '999 ₽' },
      { id: 2, image: null, title: 'Товар 2', price: '1499 ₽' },
      { id: 3, image: null, title: 'Товар 3', price: '799 ₽' }
    ]
  },

  'telegram-contacts': {
    title: 'Связаться с нами',
    phone: '+7 (999) 123-45-67',
    telegram: '@your_shop',
    email: 'info@yourshop.com',
    address: 'г. Москва',
    workingHours: 'Пн-Пт 9:00-18:00',
    showCallback: true,
    callbackText: 'Заказать звонок'
  },

  'telegram-map': {
    title: 'Наше местоположение',
    address: 'г. Москва, ул. Примерная, д. 1',
    coordinates: { lat: 55.7558, lng: 37.6176 },
    showRoute: true,
    showCall: true,
    showAddress: true,
    zoom: 15
  },

  // Основные блоки
  banner: {
    title: 'Заголовок баннера',
    subtitle: 'Подзаголовок баннера',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    buttonText: 'Действие',
    buttonUrl: '',
    backgroundImage: '',
    textAlign: 'center',
    padding: 'medium',
    borderRadius: 'medium'
  },

  text: {
    title: 'Заголовок',
    content: 'Ваш текст здесь...',
    textAlign: 'left',
    fontSize: 'medium',
    textColor: '#1f2937',
    backgroundColor: 'transparent',
    padding: 'medium'
  },

  button: {
    text: 'Кнопка',
    url: '',
    style: 'primary',
    size: 'medium',
    align: 'center',
    backgroundColor: '#3b82f6',
    textColor: '#ffffff',
    borderRadius: 'medium'
  },

  image: {
    src: '',
    alt: 'Изображение',
    width: '100%',
    height: 'auto',
    align: 'center',
    borderRadius: 'small',
    caption: ''
  },

  spacer: {
    height: 40,
    backgroundColor: 'transparent'
  },

  product: {
    name: 'Название товара',
    price: '1 000 ₽',
    description: 'Описание товара',
    image: '',
    inStock: true,
    showAddToCart: true,
    showQuickView: true
  },

  'product-grid': {
    title: 'Товары',
    columns: 2,
    showPrice: true,
    showDescription: true,
    showAddToCart: true,
    products: []
  },

  categories: {
    title: 'Категории',
    layout: 'grid',
    columns: 2,
    showCount: true,
    categories: []
  },

  features: {
    title: 'Преимущества',
    layout: 'grid',
    columns: 3,
    features: []
  },

  testimonials: {
    title: 'Отзывы',
    showAvatar: true,
    showRating: true,
    testimonials: []
  },

  'price-list': {
    title: 'Прайс-лист',
    showDescription: true,
    items: []
  },

  'order-form': {
    title: 'Оформить заказ',
    fields: ['name', 'phone', 'email'],
    submitText: 'Отправить',
    showDelivery: true,
    showPayment: true
  },

  payment: {
    title: 'Способы оплаты',
    methods: ['card', 'cash', 'bank'],
    showIcons: true
  },

  'delivery-info': {
    title: 'Доставка',
    methods: [],
    showCalculator: false
  },

  cart: {
    title: 'Корзина',
    showQuantity: true,
    showRemove: true,
    showTotal: true
  },

  form: {
    title: 'Форма',
    fields: [],
    submitText: 'Отправить'
  },

  contact: {
    title: 'Контакты',
    phone: '',
    email: '',
    address: '',
    showMap: false
  },

  social: {
    title: 'Мы в соцсетях',
    platforms: [],
    showLabels: true
  },

  map: {
    address: '',
    zoom: 15,
    height: 300,
    showMarker: true
  },

  video: {
    url: '',
    title: '',
    autoplay: false,
    controls: true,
    width: '100%',
    height: 315
  },

  header: {
    title: 'Заголовок',
    subtitle: '',
    level: 2,
    textAlign: 'left',
    textColor: '#1f2937'
  },

  footer: {
    text: '© 2024 Ваш магазин',
    textAlign: 'center',
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    links: []
  },

  divider: {
    style: 'solid',
    color: '#e5e7eb',
    thickness: 1,
    margin: 20
  },

  columns: {
    count: 2,
    gap: 20,
    content: []
  },

  tabs: {
    tabs: [],
    activeTab: 0,
    style: 'horizontal'
  },

  // Базовые блоки
  Banner: {
    title: 'Заголовок баннера',
    subtitle: 'Подзаголовок',
    imageUrl: '/placeholder.jpg',
    buttonText: 'Подробнее',
    buttonUrl: '#'
  },
  Button: {
    text: 'Нажмите',
    url: '#',
    style: 'primary'
  },

  // Коммерция
  ProductList: {
    title: 'Наши товары',
    products: [],
    showFilters: true
  },
  ProductCard: {
    productId: '',
    showDescription: true,
    showPrice: true,
    showButton: true
  },

  // Контент
  TextBlock: {
    content: 'Ваш текст',
    align: 'left',
    style: 'normal'
  },
  ImageBlock: {
    url: '/placeholder.jpg',
    alt: 'Изображение',
    caption: '',
    fullWidth: false
  },

  // Формы
  ContactForm: {
    title: 'Свяжитесь с нами',
    fields: [
      {
        type: 'text',
        label: 'Имя',
        required: true
      },
      {
        type: 'email',
        label: 'Email',
        required: true
      },
      {
        type: 'textarea',
        label: 'Сообщение',
        required: true
      }
    ],
    submitText: 'Отправить'
  },
  SubscribeForm: {
    title: 'Подпишитесь на новости',
    description: 'Получайте наши обновления',
    buttonText: 'Подписаться',
    showNameField: true
  },

  // Шапки
  SimpleHeader: {
    logo: '/logo.svg',
    menuItems: [
      {
        text: 'Главная',
        url: '#'
      },
      {
        text: 'О нас',
        url: '#about'
      },
      {
        text: 'Контакты',
        url: '#contacts'
      }
    ]
  },
  FullHeader: {
    logo: '/logo.svg',
    menuItems: [
      {
        text: 'Главная',
        url: '#'
      },
      {
        text: 'О нас',
        url: '#about'
      },
      {
        text: 'Контакты',
        url: '#contacts'
      }
    ],
    contacts: {
      phone: '+7 (999) 123-45-67',
      email: 'info@example.com'
    },
    social: [
      {
        type: 'telegram',
        url: 'https://t.me/example'
      },
      {
        type: 'vk',
        url: 'https://vk.com/example'
      }
    ]
  },

  // Интерактив
  Carousel: {
    items: [
      {
        type: 'image',
        content: '/slide1.jpg',
        link: '#'
      },
      {
        type: 'image',
        content: '/slide2.jpg',
        link: '#'
      }
    ],
    autoplay: true,
    interval: 5000
  },
  Tabs: {
    tabs: [
      {
        title: 'Вкладка 1',
        content: 'Содержимое вкладки 1'
      },
      {
        title: 'Вкладка 2',
        content: 'Содержимое вкладки 2'
      }
    ],
    defaultTab: 0
  }
}

export function getBlockDefaults(type: BlockType): BlockDataType {
  switch (type) {
    case 'telegram-banner':
      return {
        type: 'banner',
        title: 'Новый баннер',
        imageUrl: '/placeholder.jpg',
        subtitle: 'Подзаголовок баннера',
        buttonText: 'Подробнее',
        buttonUrl: '#'
      }
    
    case 'telegram-categories':
      return {
        type: 'categories',
        title: 'Категории',
        categories: []
      }
    
    case 'banner':
      return {
        type: 'banner',
        title: 'Новый баннер',
        imageUrl: '/placeholder.jpg',
        subtitle: 'Подзаголовок баннера',
        buttonText: 'Подробнее',
        buttonUrl: '#'
      }
    
    case 'text':
      return {
        type: 'text',
        content: 'Новый текстовый блок',
        align: 'left',
        style: 'normal'
      }
    
    case 'button':
      return {
        type: 'button',
        text: 'Нажмите',
        url: '#',
        style: 'primary'
      }
    
    case 'image':
      return {
        type: 'image',
        url: '/placeholder.jpg',
        alt: 'Изображение',
        fullWidth: false
      }
    
    case 'spacer':
      return {
        type: 'spacer',
        height: 32
      }
    
    case 'product':
      return {
        type: 'product',
        productId: '',
        showDescription: true,
        showPrice: true,
        showButton: true
      }
    
    case 'product-grid':
      return {
        type: 'product-grid',
        title: 'Товары',
        products: [],
        showFilters: true
      }
    
    case 'categories':
      return {
        type: 'categories',
        title: 'Категории',
        categories: []
      }
    
    case 'features':
      return {
        type: 'features',
        title: 'Преимущества',
        features: []
      }
    
    case 'testimonials':
      return {
        type: 'testimonials',
        title: 'Отзывы',
        testimonials: []
      }
    
    case 'price-list':
      return {
        type: 'price-list',
        title: 'Прайс-лист',
        items: []
      }
    
    case 'order-form':
      return {
        type: 'order-form',
        title: 'Оформление заказа',
        fields: [],
        submitText: 'Отправить'
      }
    
    case 'payment':
      return {
        type: 'payment',
        methods: []
      }
    
    case 'delivery-info':
      return {
        type: 'delivery-info',
        methods: []
      }
    
    case 'cart':
      return {
        type: 'cart',
        showThumbnails: true,
        showQuantity: true,
        showTotal: true
      }
    
    case 'form':
      return {
        type: 'form',
        title: 'Форма',
        description: '',
        buttonText: 'Отправить',
        showNameField: true
      }
    
    case 'contact':
      return {
        type: 'contact',
        title: 'Контакты',
        fields: [],
        submitText: 'Отправить'
      }
    
    case 'social':
      return {
        type: 'social',
        networks: []
      }
    
    case 'map':
      return {
        type: 'map',
        latitude: 0,
        longitude: 0,
        zoom: 14
      }
    
    case 'video':
      return {
        type: 'video',
        url: '',
        autoplay: false,
        controls: true,
        muted: true
      }
    
    case 'header':
      return {
        type: 'header',
        logo: '/logo.png',
        menuItems: [],
        contacts: {
          phone: '',
          email: ''
        }
      }
    
    case 'footer':
      return {
        type: 'footer',
        columns: [],
        copyright: '© 2024'
      }
    
    case 'divider':
      return {
        type: 'divider',
        style: 'solid',
        color: '#e5e7eb',
        spacing: 32
      }
    
    case 'columns':
      return {
        type: 'columns',
        columns: []
      }
    
    case 'tabs':
      return {
        type: 'tabs',
        tabs: [],
        defaultTab: 0
      }
    
    default:
      throw new Error(`Unknown block type: ${type}`)
  }
}

export const blockConfig = blockDefaults; 