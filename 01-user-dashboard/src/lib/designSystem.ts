// 🎨 TeleShop Premium Design System
// Современная дизайн-система для блоков конструктора

export const designSystem = {
  // 🌈 ЦВЕТОВАЯ ПАЛИТРА
  colors: {
    // Основные цвета
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe', 
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e'
    },
    
    // Акцентные цвета
    accent: {
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b'
    },

    // Нейтральные цвета
    neutral: {
      0: '#ffffff',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },

  // 🎨 ГРАДИЕНТЫ
  gradients: {
    // Основные градиенты
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    aurora: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    
    // Темные градиенты
    dark: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    midnight: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    carbon: 'linear-gradient(135deg, #434343 0%, #000000 100%)',
    
    // Тонкие градиенты для фонов
    subtle: {
      blue: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      purple: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
      pink: 'linear-gradient(135deg, #fef7f7 0%, #fce7f3 100%)',
      green: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)'
    }
  },

  // 🌫️ ТЕНИ И ЭФФЕКТЫ
  shadows: {
    // Базовые тени
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    
    // Цветные тени
    colored: {
      blue: '0 10px 25px -5px rgba(59, 130, 246, 0.15)',
      purple: '0 10px 25px -5px rgba(139, 92, 246, 0.15)',
      pink: '0 10px 25px -5px rgba(236, 72, 153, 0.15)',
      green: '0 10px 25px -5px rgba(16, 185, 129, 0.15)'
    },
    
    // Внутренние тени
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Эффект стекла
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    
    // Драматические тени
    dramatic: '0 35px 60px -12px rgba(0, 0, 0, 0.25)'
  },

  // 🔘 СКРУГЛЕНИЯ
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px'
  },

  // 📐 ОТСТУПЫ И РАЗМЕРЫ
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem'    // 64px
  },

  // 📝 ТИПОГРАФИКА
  typography: {
    // Размеры шрифтов
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem'  // 60px
    },
    
    // Веса шрифтов
    weights: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800'
    },
    
    // Высота строк
    lineHeights: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75'
    }
  },

  // ✨ АНИМАЦИИ
  animations: {
    // Длительности
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    
    // Easing функции
    easings: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      sharp: 'cubic-bezier(0.4, 0, 1, 1)'
    }
  },

  // 🔮 СТЕКЛЯННЫЕ ЭФФЕКТЫ
  glass: {
    // Backdrop blur
    backdrop: {
      sm: 'blur(4px)',
      md: 'blur(8px)',
      lg: 'blur(16px)',
      xl: 'blur(24px)'
    },
    
    // Прозрачности для стекла
    opacity: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.2)',
      strong: 'rgba(255, 255, 255, 0.3)'
    }
  }
}

// 🎨 УТИЛИТЫ ДЛЯ СТИЛЕЙ
export const getCardStyle = (variant: 'default' | 'glass' | 'gradient' | 'minimal' = 'default') => {
  const styles = {
    default: {
      background: designSystem.colors.neutral[0],
      border: `1px solid ${designSystem.colors.neutral[200]}`,
      borderRadius: designSystem.borderRadius['2xl'],
      boxShadow: designSystem.shadows.lg,
      padding: designSystem.spacing.lg
    },
    
    glass: {
      background: designSystem.glass.opacity.medium,
      backdropFilter: designSystem.glass.backdrop.md,
      border: `1px solid ${designSystem.glass.opacity.light}`,
      borderRadius: designSystem.borderRadius['2xl'],
      boxShadow: designSystem.shadows.glass
    },
    
    gradient: {
      background: designSystem.gradients.primary,
      border: 'none',
      borderRadius: designSystem.borderRadius['2xl'],
      boxShadow: designSystem.shadows.colored.blue,
      color: designSystem.colors.neutral[0]
    },
    
    minimal: {
      background: 'transparent',
      border: 'none',
      borderRadius: designSystem.borderRadius.lg,
      boxShadow: 'none'
    }
  }
  
  return styles[variant]
}

// 🎯 УТИЛИТЫ ДЛЯ КНОПОК
export const getButtonStyle = (variant: 'primary' | 'secondary' | 'ghost' | 'gradient' = 'primary') => {
  const styles = {
    primary: {
      background: designSystem.colors.primary[500],
      color: designSystem.colors.neutral[0],
      border: 'none',
      borderRadius: designSystem.borderRadius.xl,
      boxShadow: designSystem.shadows.colored.blue,
      padding: `${designSystem.spacing.sm} ${designSystem.spacing.lg}`
    },
    
    secondary: {
      background: designSystem.colors.neutral[100],
      color: designSystem.colors.neutral[700],
      border: `1px solid ${designSystem.colors.neutral[300]}`,
      borderRadius: designSystem.borderRadius.xl,
      boxShadow: designSystem.shadows.sm
    },
    
    ghost: {
      background: 'transparent',
      color: designSystem.colors.neutral[600],
      border: 'none',
      borderRadius: designSystem.borderRadius.lg
    },
    
    gradient: {
      background: designSystem.gradients.sunset,
      color: designSystem.colors.neutral[0],
      border: 'none',
      borderRadius: designSystem.borderRadius.xl,
      boxShadow: designSystem.shadows.colored.pink
    }
  }
  
  return styles[variant]
}

export default designSystem
