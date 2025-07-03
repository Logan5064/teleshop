# 🛒 Шаблон 1: Общий E-commerce магазин

**Название:** GeneralEcommerceTemplate  
**Описание:** Универсальный шаблон для интернет-магазина с полным набором функций каталога товаров  
**Целевая аудитория:** Владельцы магазинов с разнообразным ассортиментом товаров  

## 📋 Структура шаблона

Данный шаблон демонстрирует полноценный интернет-магазин с навигацией по категориям, отображением товаров в различных форматах и промо-блоками. Он использует следующие блоки:

- Header (навигация и брендинг)
- PromoBanner (главная акция)
- CategoryGrid (популярные категории)
- ProductCardDetailed (новинки в сетке)
- PromoBanner (подписка на рассылку)
- ProductCardMinimal (рекомендуемые товары)
- Footer (контакты и дополнительная информация)

## 💻 Код шаблона

### Основной компонент шаблона

\`\`\`typescript
// templates/GeneralEcommerceTemplate.tsx
import React from 'react';
import styled from 'styled-components';

// Импорт блоков
import Header from '../components/CommonBlocks/Header';
import PromoBanner from '../components/CommonBlocks/PromoBanner';
import CategoryGrid from '../components/CategoryBlocks/CategoryGrid';
import ProductCardDetailed from '../components/ProductCards/ProductCardDetailed';
import ProductCardMinimal from '../components/ProductCards/ProductCardMinimal';
import Footer from '../components/CommonBlocks/Footer';
import TextBlock from '../components/CommonBlocks/TextBlock';

// Импорт данных
import {
  headerData,
  mainBannerData,
  categoriesData,
  featuredProductsData,
  subscriptionBannerData,
  recommendedProductsData,
  footerData
} from './data/generalEcommerceData';

const TemplateContainer = styled.div\`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: #ffffff;
  min-height: 100vh;
  
  @media (min-width: 481px) and (max-width: 768px) {
    max-width: 768px;
  }
\`;

const ContentSection = styled.section\`
  padding: 16px;
  
  &.no-padding {
    padding: 0;
  }
  
  &.small-padding {
    padding: 8px 16px;
  }
\`;

const SectionTitle = styled.h2\`
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
  text-align: center;
\`;

const ProductGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 16px;
  
  @media (min-width: 481px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
\`;

const ProductList = styled.div\`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
\`;

const GeneralEcommerceTemplate: React.FC = () => {
  return (
    <TemplateContainer>
      {/* Заголовок с навигацией */}
      <ContentSection className="no-padding">
        <Header {...headerData} />
      </ContentSection>

      {/* Главный промо-баннер */}
      <ContentSection className="no-padding">
        <PromoBanner {...mainBannerData} />
      </ContentSection>

      {/* Популярные категории */}
      <ContentSection>
        <SectionTitle>Популярные категории</SectionTitle>
        <CategoryGrid {...categoriesData} />
      </ContentSection>

      {/* Новинки */}
      <ContentSection>
        <SectionTitle>Новинки</SectionTitle>
        <ProductGrid>
          {featuredProductsData.products.map((product, index) => (
            <ProductCardDetailed
              key={index}
              {...product}
              styles={featuredProductsData.styles}
            />
          ))}
        </ProductGrid>
      </ContentSection>

      {/* Баннер подписки */}
      <ContentSection className="small-padding">
        <PromoBanner {...subscriptionBannerData} />
      </ContentSection>

      {/* Рекомендуемые товары */}
      <ContentSection>
        <SectionTitle>Рекомендуем</SectionTitle>
        <ProductList>
          {recommendedProductsData.products.map((product, index) => (
            <ProductCardMinimal
              key={index}
              {...product}
              styles={recommendedProductsData.styles}
            />
          ))}
        </ProductList>
      </ContentSection>

      {/* Футер */}
      <ContentSection className="no-padding">
        <Footer {...footerData} />
      </ContentSection>
    </TemplateContainer>
  );
};

export default GeneralEcommerceTemplate;
\`\`\`

### Данные для шаблона

\`\`\`typescript
// templates/data/generalEcommerceData.ts

export const headerData = {
  logo: {
    text: "TeleShop",
    image: null
  },
  navigation: [
    { label: "Главная", href: "#home", active: true },
    { label: "Категории", href: "#categories" },
    { label: "Акции", href: "#sales" },
    { label: "Контакты", href: "#contacts" }
  ],
  actions: [
    { type: "search", icon: "search" },
    { type: "cart", icon: "shopping-cart", badge: "3" }
  ],
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    primaryColor: "#3B82F6",
    borderColor: "#E5E7EB"
  }
};

export const mainBannerData = {
  title: "Летняя распродажа",
  subtitle: "Скидки до 50% на все товары",
  description: "Не упустите возможность купить любимые товары по выгодным ценам!",
  backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  ctaButton: {
    text: "Смотреть акции",
    href: "#sales"
  },
  styles: {
    backgroundColor: "#3B82F6",
    textColor: "#ffffff",
    overlayOpacity: 0.6
  }
};

export const categoriesData = {
  categories: [
    {
      id: "electronics",
      name: "Электроника",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661",
      productCount: 156,
      href: "#category/electronics"
    },
    {
      id: "clothing",
      name: "Одежда",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      productCount: 234,
      href: "#category/clothing"
    },
    {
      id: "home",
      name: "Дом и сад",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      productCount: 89,
      href: "#category/home"
    },
    {
      id: "sports",
      name: "Спорт",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      productCount: 67,
      href: "#category/sports"
    }
  ],
  layout: "grid",
  columns: 2,
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
  }
};

export const featuredProductsData = {
  products: [
    {
      id: "product-1",
      name: "Беспроводные наушники",
      price: 2999,
      originalPrice: 3999,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      rating: 4.8,
      reviewCount: 124,
      badge: "Новинка",
      href: "#product/1"
    },
    {
      id: "product-2",
      name: "Смарт-часы",
      price: 8999,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      rating: 4.6,
      reviewCount: 89,
      badge: "Хит",
      href: "#product/2"
    },
    {
      id: "product-3",
      name: "Портативная колонка",
      price: 1599,
      originalPrice: 2199,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
      rating: 4.7,
      reviewCount: 156,
      badge: "Скидка",
      href: "#product/3"
    },
    {
      id: "product-4",
      name: "Фитнес-браслет",
      price: 3499,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
      rating: 4.5,
      reviewCount: 203,
      href: "#product/4"
    }
  ],
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    primaryColor: "#3B82F6",
    accentColor: "#EF4444",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
  }
};

export const subscriptionBannerData = {
  title: "Подпишитесь на рассылку",
  subtitle: "Получайте уведомления о новинках и акциях",
  ctaButton: {
    text: "Подписаться",
    href: "#subscribe"
  },
  styles: {
    backgroundColor: "#F3F4F6",
    textColor: "#1F2937",
    primaryColor: "#3B82F6",
    borderRadius: "12px"
  }
};

export const recommendedProductsData = {
  products: [
    {
      id: "product-5",
      name: "Кофемашина автоматическая",
      price: 15999,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e",
      rating: 4.9,
      href: "#product/5"
    },
    {
      id: "product-6",
      name: "Робот-пылесос",
      price: 12999,
      originalPrice: 16999,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
      rating: 4.7,
      href: "#product/6"
    },
    {
      id: "product-7",
      name: "Увлажнитель воздуха",
      price: 2799,
      currency: "₽",
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd",
      rating: 4.4,
      href: "#product/7"
    }
  ],
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    primaryColor: "#3B82F6",
    borderRadius: "8px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
  }
};

export const footerData = {
  logo: {
    text: "TeleShop",
    image: null
  },
  sections: [
    {
      title: "Покупателям",
      links: [
        { label: "Доставка и оплата", href: "#delivery" },
        { label: "Возврат товара", href: "#returns" },
        { label: "Гарантия", href: "#warranty" },
        { label: "FAQ", href: "#faq" }
      ]
    },
    {
      title: "Компания",
      links: [
        { label: "О нас", href: "#about" },
        { label: "Контакты", href: "#contacts" },
        { label: "Вакансии", href: "#jobs" },
        { label: "Партнерам", href: "#partners" }
      ]
    }
  ],
  contacts: {
    phone: "+7 (999) 123-45-67",
    email: "info@teleshop.ru",
    address: "г. Москва, ул. Примерная, д. 123"
  },
  socialLinks: [
    { platform: "telegram", href: "https://t.me/teleshop" },
    { platform: "instagram", href: "https://instagram.com/teleshop" },
    { platform: "vk", href: "https://vk.com/teleshop" }
  ],
  copyright: "© 2025 TeleShop. Все права защищены.",
  styles: {
    backgroundColor: "#1F2937",
    textColor: "#F9FAFB",
    linkColor: "#9CA3AF",
    borderColor: "#374151"
  }
};
\`\`\`

## 🎨 Особенности дизайна

### Цветовая схема
- **Основной цвет:** #3B82F6 (синий) - для кнопок и акцентов
- **Фон:** #FFFFFF (белый) - чистый и современный
- **Текст:** #1F2937 (темно-серый) - хорошая читаемость
- **Вторичный:** #F3F4F6 (светло-серый) - для разделения секций

### Типографика
- **Заголовки:** 24px, жирный (700)
- **Названия товаров:** 16px, средний (600)
- **Цены:** 18px, жирный (700)
- **Описания:** 14px, обычный (400)

### Адаптивность
- **Мобильные устройства (до 480px):** 2 колонки для товаров
- **Планшеты (481-768px):** 3 колонки для товаров
- Все элементы масштабируются пропорционально

## 📱 Функциональные особенности

### Навигация
- Четкое меню с основными разделами
- Иконки поиска и корзины в заголовке
- Счетчик товаров в корзине

### Товары
- Отображение скидок и оригинальных цен
- Рейтинги с количеством отзывов
- Бейджи для выделения (Новинка, Хит, Скидка)
- Разные форматы карточек для разных секций

### Категории
- Визуальные карточки с изображениями
- Счетчики количества товаров
- Удобная сетка для быстрого выбора

### Промо-элементы
- Главный баннер с призывом к действию
- Баннер подписки на рассылку
- Выделение акционных предложений

## 🔧 Настройки и кастомизация

Шаблон легко настраивается через изменение данных в файле \`generalEcommerceData.ts\`:

1. **Брендинг:** Замена логотипа, названия, цветов
2. **Контент:** Изменение товаров, категорий, текстов
3. **Структура:** Добавление/удаление секций
4. **Стили:** Настройка цветовой схемы и типографики

## 📊 Метрики и аналитика

Шаблон подготовлен для интеграции с системами аналитики:
- Отслеживание кликов по товарам
- Конверсия по категориям
- Эффективность промо-баннеров
- Взаимодействие с элементами навигации

Этот шаблон демонстрирует полный функционал конструктора и может служить отправной точкой для большинства интернет-магазинов в Telegram.

