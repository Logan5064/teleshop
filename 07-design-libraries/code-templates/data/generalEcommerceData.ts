export const headerData = {
  logo: {
    text: "TeleShop",
    icon: "��"
  },
  navigation: [
    { label: "Главная", href: "#home", active: true },
    { label: "Каталог", href: "#catalog" },
    { label: "Акции", href: "#sales" },
    { label: "Контакты", href: "#contacts" }
  ],
  actions: [
    { type: "search", icon: "search" },
    { type: "cart", icon: "shopping-cart", badge: "3" }
  ],
  styles: {
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937"
  }
};

export const mainBannerData = {
  title: "Скидки до 50%",
  subtitle: "На популярные товары",
  description: "Не упустите возможность купить любимые товары по выгодным ценам!",
  backgroundImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
  ctaButton: {
    text: "Смотреть товары",
    action: "scroll_to_products"
  },
  styles: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#FFFFFF",
    overlayOpacity: 0.6
  }
};

export const categoriesData = {
  categories: [
    {
      id: 1,
      name: "Электроника",
      productCount: 45,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Одежда",
      productCount: 128,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Дом и сад",
      productCount: 67,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Спорт",
      productCount: 89,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Красота",
      productCount: 234,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Книги",
      productCount: 156,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop"
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
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 89990,
      originalPrice: 99990,
      currency: "₽",
      rating: 4.8,
      reviewCount: 124,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop",
      badge: "-10%"
    },
    {
      id: 2,
      name: "AirPods Pro",
      price: 19990,
      originalPrice: null,
      currency: "₽",
      rating: 4.9,
      reviewCount: 89,
      image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop",
      badge: "NEW"
    },
    {
      id: 3,
      name: "MacBook Air M2",
      price: 109990,
      originalPrice: 119990,
      currency: "₽",
      rating: 4.7,
      reviewCount: 56,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      badge: "-8%"
    },
    {
      id: 4,
      name: "Кроссовки Nike",
      price: 8990,
      originalPrice: 12990,
      currency: "₽",
      rating: 4.6,
      reviewCount: 203,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
      badge: "-31%"
    },
    {
      id: 5,
      name: "Умные часы Apple Watch",
      price: 32990,
      originalPrice: null,
      currency: "₽",
      rating: 4.8,
      reviewCount: 167,
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d1?w=300&h=300&fit=crop",
      badge: null
    },
    {
      id: 6,
      name: "Bluetooth колонка JBL",
      price: 4990,
      originalPrice: 6990,
      currency: "₽",
      rating: 4.5,
      reviewCount: 91,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      badge: "-29%"
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
  title: "Подпишись на уведомления",
  subtitle: "Узнавай о новинках и скидках первым",
  ctaButton: {
    text: "Подписаться",
    action: "subscribe"
  },
  styles: {
    backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    textColor: "#FFFFFF"
  }
};

export const recommendedProductsData = {
  products: [
    {
      id: 7,
      name: "Чехол для iPhone 15",
      price: 1290,
      originalPrice: 1990,
      currency: "₽",
      rating: 4.4,
      reviewCount: 78,
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=300&h=300&fit=crop"
    },
    {
      id: 8,
      name: "Зарядное устройство USB-C",
      price: 2490,
      originalPrice: null,
      currency: "₽",
      rating: 4.7,
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1609592828037-4afebeeb7fa8?w=300&h=300&fit=crop"
    },
    {
      id: 9,
      name: "Мышь беспроводная",
      price: 1990,
      originalPrice: 2990,
      currency: "₽",
      rating: 4.3,
      reviewCount: 123,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
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
    text: "TeleShop"
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
    email: "support@teleshop.ru"
  },
  socialLinks: [
    { platform: "telegram", href: "https://t.me/teleshop" },
    { platform: "instagram", href: "https://instagram.com/teleshop" },
    { platform: "vk", href: "https://vk.com/teleshop" }
  ],
  copyright: "© 2024 TeleShop. Все права защищены.",
  styles: {
    backgroundColor: "#1F2937",
    textColor: "#F9FAFB",
    linkColor: "#9CA3AF",
    borderColor: "#374151"
  }
}; 