export const headerData = {
  logo: {
    text: "PremiumTech",
    image: null
  },
  navigation: [], // Минимальная навигация для фокуса
  actions: [
    { 
      type: "cta", 
      text: "Купить сейчас",
      href: "#buy-now",
      styles: {
        backgroundColor: "#EF4444",
        textColor: "#ffffff"
      }
    }
  ],
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    primaryColor: "#EF4444",
    borderColor: "#E5E7EB"
  }
};

export const heroBannerData = {
  title: "Революционные беспроводные наушники",
  subtitle: "AirPods Pro Max 2025",
  description: "Испытайте невероятное качество звука с активным шумоподавлением нового поколения. Ограниченная серия с эксклюзивным дизайном.",
  backgroundImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  productImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  ctaButton: {
    text: "Заказать за 14 999 ₽",
    href: "#order"
  },
  features: [
    "Активное шумоподавление",
    "30 часов работы",
    "Быстрая зарядка",
    "Премиум материалы"
  ],
  styles: {
    backgroundColor: "transparent",
    textColor: "#ffffff",
    primaryColor: "#EF4444",
    overlayOpacity: 0.4
  }
};

export const benefitsData = {
  benefits: [
    {
      title: "Непревзойденное качество звука",
      description: "Профессиональные драйверы обеспечивают кристально чистый звук с глубокими басами и четкими высокими частотами."
    },
    {
      title: "Активное шумоподавление",
      description: "Технология ANC нового поколения блокирует до 99% внешних шумов, позволяя полностью погрузиться в музыку."
    },
    {
      title: "Комфорт на весь день",
      description: "Эргономичный дизайн и мягкие амбушюры из премиальных материалов обеспечивают комфорт даже при длительном использовании."
    },
    {
      title: "Долгое время работы",
      description: "До 30 часов непрерывного воспроизведения с кейсом и быстрая зарядка - 15 минут для 3 часов музыки."
    },
    {
      title: "Премиальные материалы",
      description: "Алюминиевый корпус, кожаные вставки и прочное стекло - каждая деталь создана для долговечности и стиля."
    }
  ]
};

export const featuresData = {
  title: "Технические характеристики",
  content: `
## Звук профессионального уровня

Наши наушники оснащены 40-мм динамическими драйверами с неодимовыми магнитами, которые воспроизводят частоты от 20 Гц до 40 кГц. Это означает, что вы услышите каждую ноту, каждый инструмент с невероятной точностью и детализацией.

## Интеллектуальное шумоподавление

Система активного шумоподавления использует 6 микрофонов для анализа окружающего звука и создания противофазных волн, которые нейтрализуют нежелательные шумы. Алгоритм машинного обучения адаптируется к вашему окружению в реальном времени.

## Беспроводная свобода

Bluetooth 5.3 обеспечивает стабильное соединение на расстоянии до 10 метров с минимальной задержкой. Поддержка кодеков LDAC и aptX HD гарантирует передачу звука без потерь качества.

## Умные функции

- **Автопауза**: музыка автоматически останавливается при снятии наушников
- **Сенсорное управление**: простые жесты для управления воспроизведением
- **Голосовой помощник**: быстрый доступ к Siri или Google Assistant
- **Многоточечное подключение**: одновременная связь с двумя устройствами
  `,
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937"
  }
};

export const galleryData = {
  images: [
    {
      url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      alt: "Наушники - вид спереди",
      caption: "Элегантный дизайн"
    },
    {
      url: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
      alt: "Наушники - вид сбоку",
      caption: "Эргономичная форма"
    },
    {
      url: "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      alt: "Детали конструкции",
      caption: "Премиальные материалы"
    },
    {
      url: "https://images.unsplash.com/photo-1545127398-14699f92334b",
      alt: "Зарядный кейс",
      caption: "Компактный кейс"
    }
  ],
  layout: "grid",
  columns: 2,
  styles: {
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
  }
};

export const testimonialsData = {
  testimonials: [
    {
      id: "review-1",
      name: "Алексей Петров",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      rating: 5,
      text: "Невероятные наушники! Качество звука просто потрясающее, а шумоподавление работает идеально. Лучшая покупка за последние годы.",
      date: "2 дня назад"
    },
    {
      id: "review-2",
      name: "Мария Сидорова",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
      rating: 5,
      text: "Пользуюсь уже месяц - качество на высоте! Очень удобные, не устают уши даже после долгого прослушивания. Рекомендую всем!",
      date: "1 неделю назад"
    },
    {
      id: "review-3",
      name: "Дмитрий Козлов",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      rating: 5,
      text: "Работаю в шумном офисе, эти наушники спасают! Шумоподавление действительно работает, можно сосредоточиться на работе.",
      date: "3 дня назад"
    }
  ],
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#1F2937",
    borderRadius: "12px",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)"
  }
};

export const finalCtaData = {
  title: "Не упустите возможность!",
  subtitle: "Ограниченное предложение - скидка 25%",
  description: "Осталось всего 12 наушников по специальной цене. Акция действует только до конца недели!",
  ctaButton: {
    text: "Купить сейчас за 14 999 ₽",
    href: "#buy-now"
  },
  features: [
    "✓ Бесплатная доставка",
    "✓ Гарантия 2 года", 
    "✓ Возврат в течение 30 дней",
    "✓ Техподдержка 24/7"
  ],
  urgency: {
    type: "countdown",
    endDate: "2025-07-01T23:59:59",
    text: "До конца акции осталось:"
  },
  styles: {
    backgroundColor: "transparent",
    textColor: "#ffffff",
    primaryColor: "#ffffff",
    buttonColor: "#ffffff",
    buttonTextColor: "#EF4444"
  }
};

export const footerData = {
  logo: {
    text: "PremiumTech",
    image: null
  },
  sections: [], // Минимальный футер
  contacts: {
    phone: "+7 (999) 123-45-67",
    email: "support@premiumtech.ru"
  },
  socialLinks: [
    { platform: "telegram", href: "https://t.me/premiumtech" },
    { platform: "instagram", href: "https://instagram.com/premiumtech" }
  ],
  copyright: "© 2025 PremiumTech. Все права защищены.",
  policies: [
    { label: "Политика конфиденциальности", href: "#privacy" },
    { label: "Условия использования", href: "#terms" }
  ],
  styles: {
    backgroundColor: "#F9FAFB",
    textColor: "#6B7280",
    linkColor: "#3B82F6",
    borderColor: "#E5E7EB"
  }
}; 