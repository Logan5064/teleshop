import React from 'react'

export const modernUITrends = [
  // 1. Минимализм и Чистота
  {
    category: 'Минимализм и Чистота',
    items: [
      {
        name: 'Минималистичная карточка',
        code: 'bg-white p-8 border border-gray-100 rounded-lg',
        component: React.createElement('div', { className: 'bg-white p-8 border border-gray-100 rounded-lg max-w-sm' }, [
          React.createElement('h3', { className: 'text-lg font-semibold text-gray-900 mb-2', key: 'title' }, 'Заголовок'),
          React.createElement('p', { className: 'text-gray-600 text-sm leading-relaxed', key: 'text' }, 'Минималистичный дизайн с чистыми линиями.'),
          React.createElement('button', { className: 'mt-4 text-blue-600 text-sm font-medium', key: 'btn' }, 'Подробнее →')
        ]),
        description: 'Чистый дизайн с белым пространством'
      },
      {
        name: 'Простая типографика',
        code: 'text-gray-900 leading-relaxed',
        component: React.createElement('div', { className: 'max-w-md space-y-4' }, [
          React.createElement('h1', { className: 'text-2xl font-bold text-gray-900', key: 'h1' }, 'Заголовок H1'),
          React.createElement('p', { className: 'text-gray-600 leading-relaxed', key: 'p' }, 'Обычный текст с достаточными отступами.'),
          React.createElement('small', { className: 'text-sm text-gray-500', key: 'small' }, 'Мелкий текст')
        ]),
        description: 'Чистая типографическая иерархия'
      },
      {
        name: 'Минимальная кнопка',
        code: 'px-6 py-2 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors',
        component: React.createElement('button', { className: 'px-6 py-2 text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors' }, 'Простая кнопка'),
        description: 'Кнопка без излишеств'
      },
      {
        name: 'Чистая форма',
        code: 'space-y-4',
        component: React.createElement('form', { className: 'space-y-4 max-w-sm' }, [
          React.createElement('input', { type: 'text', placeholder: 'Имя', className: 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors', key: 'name' }),
          React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 transition-colors', key: 'email' }),
          React.createElement('button', { type: 'submit', className: 'w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors', key: 'submit' }, 'Отправить')
        ]),
        description: 'Форма с минимальным дизайном'
      }
    ]
  },
  
  // 2. Soft UI / Утонченный Неоморфизм
  {
    category: 'Soft UI / Неоморфизм',
    items: [
      {
        name: 'Неоморфная карточка',
        code: 'ts-card-neumorphic',
        component: React.createElement('div', { className: 'bg-gray-100 p-6 rounded-lg' }, [
          React.createElement('div', { className: 'ts-card-neumorphic', key: 'card' }, [
            React.createElement('h3', { className: 'font-semibold text-gray-800 mb-2', key: 'title' }, 'Неоморфная карточка'),
            React.createElement('p', { className: 'text-gray-600 text-sm', key: 'text' }, 'Мягкие тени создают глубину')
          ])
        ]),
        description: 'Карточка с мягкими тенями'
      },
      {
        name: 'Неоморфная кнопка',
        code: 'ts-btn-neumorphic',
        component: React.createElement('div', { className: 'bg-gray-100 p-6 rounded-lg' }, [
          React.createElement('button', { className: 'ts-btn-neumorphic', key: 'btn' }, 'Неоморфная кнопка')
        ]),
        description: 'Кнопка с мягким 3D эффектом'
      },
      {
        name: 'Неоморфный инпут',
        code: 'ts-input-neumorphic',
        component: React.createElement('div', { className: 'bg-gray-100 p-6 rounded-lg' }, [
          React.createElement('input', { className: 'ts-input-neumorphic', placeholder: 'Введите текст...', key: 'input' })
        ]),
        description: 'Поле ввода с вдавленным эффектом'
      },
      {
        name: 'Неоморфный переключатель',
        code: 'bg-gray-100 rounded-full shadow-inner',
        component: React.createElement('div', { className: 'bg-gray-100 p-6 rounded-lg' }, [
          React.createElement('div', { className: 'flex items-center space-x-3', key: 'toggle' }, [
            React.createElement('span', { className: 'text-gray-700 text-sm', key: 'label' }, 'Уведомления'),
            React.createElement('div', { className: 'relative', key: 'switch' }, [
              React.createElement('div', { className: 'w-12 h-6 bg-gray-200 rounded-full shadow-inner', key: 'bg' }),
              React.createElement('div', { className: 'absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5 shadow-md', key: 'thumb' })
            ])
          ])
        ]),
        description: 'Переключатель в неоморфном стиле'
      },
      {
        name: 'Неоморфная панель',
        code: 'bg-gray-100 shadow-neumorphic-inset',
        component: React.createElement('div', { className: 'bg-gray-100 p-6 rounded-lg' }, [
          React.createElement('div', { className: 'bg-gray-100 p-6 rounded-2xl shadow-inner', key: 'panel' }, [
            React.createElement('div', { className: 'grid grid-cols-3 gap-4', key: 'content' }, [
              React.createElement('div', { className: 'bg-gray-100 w-12 h-12 rounded-xl shadow-md flex items-center justify-center', key: '1' }, '📊'),
              React.createElement('div', { className: 'bg-gray-100 w-12 h-12 rounded-xl shadow-md flex items-center justify-center', key: '2' }, '⚙️'),
              React.createElement('div', { className: 'bg-gray-100 w-12 h-12 rounded-xl shadow-md flex items-center justify-center', key: '3' }, '🔔')
            ])
          ])
        ]),
        description: 'Панель управления в неоморфном стиле'
      }
    ]
  },

  // 3. Глассморфизм
  {
    category: 'Глассморфизм',
    items: [
      {
        name: 'Стеклянная карточка',
        code: 'ts-card-glass',
        component: React.createElement('div', { className: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg' }, [
          React.createElement('div', { className: 'ts-card-glass', key: 'card' }, [
            React.createElement('h3', { className: 'font-semibold text-white mb-2', key: 'title' }, 'Стеклянная карточка'),
            React.createElement('p', { className: 'text-white/90 text-sm', key: 'text' }, 'Полупрозрачность с размытием фона')
          ])
        ]),
        description: 'Карточка с эффектом матового стекла'
      },
      {
        name: 'Стеклянная кнопка',
        code: 'ts-btn-glass',
        component: React.createElement('div', { className: 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-6 rounded-lg' }, [
          React.createElement('button', { className: 'ts-btn-glass', key: 'btn' }, 'Стеклянная кнопка')
        ]),
        description: 'Кнопка с glassmorphism эффектом'
      },
      {
        name: 'Стеклянный инпут',
        code: 'ts-input-glass',
        component: React.createElement('div', { className: 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 p-6 rounded-lg' }, [
          React.createElement('input', { className: 'ts-input-glass', placeholder: 'Стеклянный инпут...', key: 'input' })
        ]),
        description: 'Поле ввода с прозрачным фоном'
      },
      {
        name: 'Стеклянная навигация',
        code: 'backdrop-blur-md bg-white/20 border border-white/30',
        component: React.createElement('div', { className: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-6 rounded-lg' }, [
          React.createElement('nav', { className: 'backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-4', key: 'nav' }, [
            React.createElement('div', { className: 'flex items-center justify-between', key: 'content' }, [
              React.createElement('div', { className: 'font-bold text-white', key: 'logo' }, 'LOGO'),
              React.createElement('div', { className: 'flex space-x-4', key: 'links' }, [
                React.createElement('a', { className: 'text-white/90 hover:text-white transition-colors', key: '1' }, 'Главная'),
                React.createElement('a', { className: 'text-white/90 hover:text-white transition-colors', key: '2' }, 'О нас'),
                React.createElement('a', { className: 'text-white/90 hover:text-white transition-colors', key: '3' }, 'Контакты')
              ])
            ])
          ])
        ]),
        description: 'Прозрачная навигационная панель'
      },
      {
        name: 'Стеклянное модальное окно',
        code: 'backdrop-blur-xl bg-white/10 border border-white/20',
        component: React.createElement('div', { className: 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 p-8 rounded-lg relative' }, [
          React.createElement('div', { className: 'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 max-w-sm mx-auto', key: 'modal' }, [
            React.createElement('h3', { className: 'text-xl font-bold text-white mb-4 text-center', key: 'title' }, 'Войти'),
            React.createElement('div', { className: 'space-y-4', key: 'form' }, [
              React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 backdrop-blur-sm', key: 'email' }),
              React.createElement('input', { type: 'password', placeholder: 'Пароль', className: 'w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 backdrop-blur-sm', key: 'password' }),
              React.createElement('button', { className: 'w-full py-3 bg-white/20 border border-white/30 rounded-lg text-white font-medium backdrop-blur-sm hover:bg-white/30 transition-colors', key: 'submit' }, 'Войти')
            ])
          ])
        ]),
        description: 'Модальное окно с glassmorphism'
      }
    ]
  },

  // 4. Градиенты
  {
    category: 'Градиенты',
    items: [
      {
        name: 'Градиентная кнопка Primary',
        code: 'ts-btn-primary',
        component: React.createElement('button', { className: 'ts-btn-primary' }, 'Primary кнопка'),
        description: 'Основная кнопка с градиентом'
      },
      {
        name: 'Градиентная кнопка Success',
        code: 'ts-btn-success',
        component: React.createElement('button', { className: 'ts-btn-success' }, 'Success кнопка'),
        description: 'Кнопка успеха с зеленым градиентом'
      },
      {
        name: 'Радужный градиент',
        code: 'bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
        component: React.createElement('div', { className: 'bg-gradient-to-r from-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-8 rounded-xl text-white text-center font-bold' }, 'Радужный градиент'),
        description: 'Многоцветный радужный градиент'
      },
      {
        name: 'Градиентный текст',
        code: 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent',
        component: React.createElement('h2', { className: 'text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' }, 'Градиентный текст'),
        description: 'Текст с градиентной заливкой'
      },
      {
        name: 'Градиентная карточка с рамкой',
        code: 'ts-card-gradient-border',
        component: React.createElement('div', { className: 'ts-card-gradient-border' }, [
          React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Градиентная рамка'),
          React.createElement('p', { className: 'text-gray-600 text-sm', key: 'text' }, 'Карточка с красивой градиентной границей')
        ]),
        description: 'Карточка с градиентной рамкой'
      },
      {
        name: 'Анимированный градиент',
        code: 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x',
        component: React.createElement('div', { className: 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 rounded-xl text-white text-center font-bold bg-[length:200%_200%] animate-pulse' }, 'Анимированный градиент'),
        description: 'Градиент с анимацией'
      }
    ]
  },

  // 5. Скругленные углы
  {
    category: 'Скругленные углы',
    items: [
      {
        name: 'Мягкие углы (sm)',
        code: 'rounded-sm',
        component: React.createElement('div', { className: 'bg-blue-500 text-white p-4 rounded-sm' }, 'rounded-sm'),
        description: 'Слегка скругленные углы'
      },
      {
        name: 'Средние углы (lg)',
        code: 'rounded-lg',
        component: React.createElement('div', { className: 'bg-green-500 text-white p-4 rounded-lg' }, 'rounded-lg'),
        description: 'Умеренно скругленные углы'
      },
      {
        name: 'Большие углы (xl)',
        code: 'rounded-xl',
        component: React.createElement('div', { className: 'bg-purple-500 text-white p-4 rounded-xl' }, 'rounded-xl'),
        description: 'Сильно скругленные углы'
      },
      {
        name: 'Экстра большие углы (2xl)',
        code: 'rounded-2xl',
        component: React.createElement('div', { className: 'bg-pink-500 text-white p-4 rounded-2xl' }, 'rounded-2xl'),
        description: 'Очень сильно скругленные углы'
      },
      {
        name: 'Полностью круглые',
        code: 'rounded-full',
        component: React.createElement('div', { className: 'bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold' }, 'КРУГ'),
        description: 'Полностью круглая форма'
      },
      {
        name: 'Частичное скругление',
        code: 'rounded-tl-2xl rounded-br-2xl',
        component: React.createElement('div', { className: 'bg-indigo-500 text-white p-4 rounded-tl-2xl rounded-br-2xl' }, 'Диагональные углы'),
        description: 'Скругление только определенных углов'
      }
    ]
  },

  // 6. Анимации и переходы
  {
    category: 'Анимации и переходы',
    items: [
      {
        name: 'Плавное появление',
        code: 'animate-fade-in',
        component: React.createElement('div', { className: 'animate-fade-in bg-blue-500 text-white p-4 rounded-lg' }, 'Плавное появление'),
        description: 'Анимация появления элемента'
      },
      {
        name: 'Подскок при наведении',
        code: 'hover:scale-105 transition-transform duration-200',
        component: React.createElement('div', { className: 'hover:scale-105 transition-transform duration-200 bg-green-500 text-white p-4 rounded-lg cursor-pointer' }, 'Наведите курсор'),
        description: 'Увеличение при наведении'
      },
      {
        name: 'Вращение при наведении',
        code: 'hover:rotate-6 transition-transform duration-300',
        component: React.createElement('div', { className: 'hover:rotate-6 transition-transform duration-300 bg-purple-500 text-white p-4 rounded-lg cursor-pointer' }, 'Поворот'),
        description: 'Поворот при наведении'
      },
      {
        name: 'Изменение цвета',
        code: 'hover:bg-purple-600 transition-colors duration-300',
        component: React.createElement('button', { className: 'bg-purple-500 hover:bg-purple-600 transition-colors duration-300 text-white px-6 py-3 rounded-lg' }, 'Смена цвета'),
        description: 'Плавное изменение цвета'
      },
      {
        name: 'Пульсация',
        code: 'animate-pulse',
        component: React.createElement('div', { className: 'animate-pulse bg-red-500 text-white p-4 rounded-lg' }, 'Пульсация'),
        description: 'Эффект пульсации'
      },
      {
        name: 'Подпрыгивание',
        code: 'animate-bounce',
        component: React.createElement('div', { className: 'animate-bounce bg-yellow-500 text-white p-4 rounded-lg inline-block' }, '⬆️ Подпрыгивание'),
        description: 'Анимация подпрыгивания'
      },
      {
        name: 'Плавающий эффект',
        code: 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300',
        component: React.createElement('div', { className: 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-cyan-500 text-white p-4 rounded-lg cursor-pointer' }, 'Парящий эффект'),
        description: 'Эффект парения при наведении'
      },
      {
        name: 'Морфинг формы',
        code: 'hover:rounded-full transition-all duration-500',
        component: React.createElement('div', { className: 'hover:rounded-full transition-all duration-500 bg-pink-500 text-white p-4 rounded-lg cursor-pointer w-32 h-16 flex items-center justify-center' }, 'Морфинг'),
        description: 'Изменение формы при наведении'
      }
    ]
  }
] 