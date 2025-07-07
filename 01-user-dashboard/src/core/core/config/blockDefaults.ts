// Настройки блоков по умолчанию TeleShop Constructor

import { BlockType, BlockDefaults } from '@/types/blocks'

export const blockDefaults: Record<BlockType, Record<string, unknown>> = {
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
  }
}

export function getBlockDefaults(blockType: BlockType): Record<string, unknown> {
  return blockDefaults[blockType] || {}
}

export const blockConfig = blockDefaults; 