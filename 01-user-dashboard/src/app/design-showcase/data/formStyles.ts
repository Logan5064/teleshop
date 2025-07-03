import React from 'react'

export const formStyles = [
  {
    name: 'Стеклянный инпут',
    code: 'ts-input-glass',
    component: React.createElement('input', { className: 'ts-input-glass', placeholder: 'Стеклянный инпут' })
  },
  {
    name: 'Неоморфный инпут',
    code: 'ts-input-neumorphic',
    component: React.createElement('input', { className: 'ts-input-neumorphic', placeholder: 'Неоморфный инпут' })
  },
  {
    name: 'Обычный инпут',
    code: 'border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    component: React.createElement('input', { 
      className: 'border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent', 
      placeholder: 'Обычный инпут' 
    })
  },
  {
    name: 'Большой инпут',
    code: 'w-full text-lg border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500',
    component: React.createElement('input', { 
      className: 'w-full text-lg border border-gray-300 rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500', 
      placeholder: 'Большой инпут' 
    })
  },
  {
    name: 'Инпут с иконкой',
    code: 'relative',
    component: React.createElement('div', { className: 'relative' }, [
      React.createElement('input', { 
        className: 'pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500', 
        placeholder: 'Поиск...', 
        key: 'input' 
      }),
      React.createElement('div', { 
        className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400', 
        key: 'icon' 
      }, '🔍')
    ])
  },
  {
    name: 'Floating Label',
    code: 'relative',
    component: React.createElement('div', { className: 'relative' }, [
      React.createElement('input', { 
        className: 'peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500', 
        placeholder: ' ', 
        key: 'input' 
      }),
      React.createElement('label', { 
        className: 'absolute left-4 top-2 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs', 
        key: 'label' 
      }, 'Email адрес')
    ])
  },
  {
    name: 'Селект стилизованный',
    code: 'relative',
    component: React.createElement('div', { className: 'relative' }, [
      React.createElement('select', { 
        className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white', 
        key: 'select' 
      }, [
        React.createElement('option', { key: '1' }, 'Выберите опцию'),
        React.createElement('option', { key: '2' }, 'Опция 1'),
        React.createElement('option', { key: '3' }, 'Опция 2')
      ]),
      React.createElement('div', { 
        className: 'absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none', 
        key: 'arrow' 
      }, '▼')
    ])
  },
  {
    name: 'Чекбокс кастомный',
    code: 'flex items-center space-x-3',
    component: React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer' }, [
      React.createElement('div', { className: 'relative', key: 'checkbox' }, [
        React.createElement('input', { type: 'checkbox', className: 'sr-only', key: 'input' }),
        React.createElement('div', { className: 'w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center bg-white', key: 'box' }, '✓')
      ]),
      React.createElement('span', { className: 'text-gray-700', key: 'label' }, 'Согласен с условиями')
    ])
  },
  {
    name: 'Радио кнопки',
    code: 'space-y-2',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer', key: '1' }, [
        React.createElement('div', { className: 'w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center', key: 'radio' }, 
          React.createElement('div', { className: 'w-2 h-2 bg-blue-500 rounded-full', key: 'dot' })
        ),
        React.createElement('span', { className: 'text-gray-700', key: 'label' }, 'Вариант 1')
      ]),
      React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer', key: '2' }, [
        React.createElement('div', { className: 'w-5 h-5 border-2 border-gray-300 rounded-full', key: 'radio' }),
        React.createElement('span', { className: 'text-gray-700', key: 'label' }, 'Вариант 2')
      ])
    ])
  },
  {
    name: 'Текстовая область',
    code: 'w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none',
    component: React.createElement('textarea', { 
      className: 'w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none', 
      placeholder: 'Ваше сообщение...', 
      rows: 4 
    })
  },
  {
    name: 'Переключатель',
    code: 'flex items-center space-x-3',
    component: React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer' }, [
      React.createElement('div', { className: 'relative', key: 'toggle' }, [
        React.createElement('input', { type: 'checkbox', className: 'sr-only', key: 'input' }),
        React.createElement('div', { className: 'w-12 h-6 bg-blue-500 rounded-full shadow-inner', key: 'bg' }),
        React.createElement('div', { className: 'absolute w-5 h-5 bg-white rounded-full shadow top-0.5 right-0.5 transition-transform', key: 'thumb' })
      ]),
      React.createElement('span', { className: 'text-gray-700', key: 'label' }, 'Уведомления')
    ])
  },
  {
    name: 'Загрузка файлов',
    code: 'border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors',
    component: React.createElement('div', { className: 'border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer' }, [
      React.createElement('div', { className: 'text-4xl text-gray-400 mb-4', key: 'icon' }, '📁'),
      React.createElement('p', { className: 'text-gray-600 mb-2', key: 'text' }, 'Перетащите файлы сюда'),
      React.createElement('p', { className: 'text-sm text-gray-500', key: 'subtext' }, 'или нажмите для выбора')
    ])
  },
  {
    name: 'Инпут с валидацией',
    code: 'space-y-2',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('input', { 
        className: 'w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-red-50', 
        placeholder: 'Email (обязательно)', 
        key: 'input' 
      }),
      React.createElement('p', { className: 'text-sm text-red-600', key: 'error' }, 'Введите корректный email адрес')
    ])
  },
  {
    name: 'Поле пароля',
    code: 'relative',
    component: React.createElement('div', { className: 'relative' }, [
      React.createElement('input', { 
        type: 'password', 
        className: 'w-full pr-12 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500', 
        placeholder: 'Пароль', 
        key: 'input' 
      }),
      React.createElement('button', { 
        className: 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600', 
        key: 'toggle' 
      }, '👁️')
    ])
  },
  {
    name: 'Инпут с префиксом',
    code: 'flex items-center border border-gray-300 rounded-lg overflow-hidden',
    component: React.createElement('div', { className: 'flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500' }, [
      React.createElement('span', { className: 'px-3 py-2 bg-gray-100 text-gray-600 text-sm', key: 'prefix' }, 'https://'),
      React.createElement('input', { 
        className: 'flex-1 px-3 py-2 focus:outline-none', 
        placeholder: 'ваш-сайт.ru', 
        key: 'input' 
      })
    ])
  },
  {
    name: 'Слайдер',
    code: 'w-full',
    component: React.createElement('div', { className: 'w-full space-y-2' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Цена: ₽5,000'),
      React.createElement('input', { 
        type: 'range', 
        min: '0', 
        max: '10000', 
        defaultValue: '5000',
        className: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider', 
        key: 'slider' 
      })
    ])
  },
  {
    name: 'Группа кнопок',
    code: 'flex rounded-lg overflow-hidden border border-gray-300',
    component: React.createElement('div', { className: 'flex rounded-lg overflow-hidden border border-gray-300' }, [
      React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white hover:bg-blue-600', key: '1' }, 'Неделя'),
      React.createElement('button', { className: 'px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-l border-gray-300', key: '2' }, 'Месяц'),
      React.createElement('button', { className: 'px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-l border-gray-300', key: '3' }, 'Год')
    ])
  },
  {
    name: 'Мульти-селект',
    code: 'space-y-2',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Выберите теги:'),
      React.createElement('div', { className: 'flex flex-wrap gap-2', key: 'tags' }, [
        React.createElement('span', { className: 'px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm cursor-pointer hover:bg-blue-200', key: '1' }, 'React'),
        React.createElement('span', { className: 'px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm cursor-pointer hover:bg-green-200', key: '2' }, 'TypeScript'),
        React.createElement('span', { className: 'px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm cursor-pointer hover:bg-gray-200', key: '3' }, 'Next.js')
      ])
    ])
  },
  {
    name: 'Поиск с автодополнением',
    code: 'relative',
    component: React.createElement('div', { className: 'relative' }, [
      React.createElement('input', { 
        className: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500', 
        placeholder: 'Начните вводить...', 
        key: 'input' 
      }),
      React.createElement('div', { className: 'absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10', key: 'dropdown' }, [
        React.createElement('div', { className: 'px-4 py-2 hover:bg-gray-100 cursor-pointer', key: '1' }, 'Результат 1'),
        React.createElement('div', { className: 'px-4 py-2 hover:bg-gray-100 cursor-pointer', key: '2' }, 'Результат 2'),
        React.createElement('div', { className: 'px-4 py-2 bg-blue-50 text-blue-700 cursor-pointer', key: '3' }, 'Результат 3')
      ])
    ])
  },
  {
    name: 'Рейтинг звезды',
    code: 'flex items-center space-x-1',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Оценка:'),
      React.createElement('div', { className: 'flex items-center space-x-1', key: 'stars' }, [
        React.createElement('span', { className: 'text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '1' }, '★'),
        React.createElement('span', { className: 'text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '2' }, '★'),
        React.createElement('span', { className: 'text-2xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '3' }, '★'),
        React.createElement('span', { className: 'text-2xl text-gray-300 cursor-pointer hover:text-yellow-500', key: '4' }, '★'),
        React.createElement('span', { className: 'text-2xl text-gray-300 cursor-pointer hover:text-yellow-500', key: '5' }, '★')
      ])
    ])
  },
  {
    name: 'Цветовой пикер',
    code: 'space-y-3',
    component: React.createElement('div', { className: 'space-y-3' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Выберите цвет:'),
      React.createElement('div', { className: 'flex items-center space-x-2', key: 'picker' }, [
        React.createElement('input', { type: 'color', defaultValue: '#3b82f6', className: 'w-12 h-12 border border-gray-300 rounded cursor-pointer', key: 'input' }),
        React.createElement('span', { className: 'text-sm text-gray-600', key: 'value' }, '#3b82f6')
      ])
    ])
  },
  {
    name: 'Форма оплаты',
    code: 'space-y-4 bg-white p-6 rounded-lg border border-gray-200',
    component: React.createElement('div', { className: 'space-y-4 bg-white p-6 rounded-lg border border-gray-200' }, [
      React.createElement('h3', { className: 'font-bold text-lg mb-4', key: 'title' }, 'Данные карты'),
      React.createElement('input', { className: 'w-full px-4 py-2 border border-gray-300 rounded-lg', placeholder: '1234 5678 9012 3456', key: 'card' }),
      React.createElement('div', { className: 'flex space-x-4', key: 'row' }, [
        React.createElement('input', { className: 'flex-1 px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'MM/YY', key: 'exp' }),
        React.createElement('input', { className: 'w-20 px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'CVV', key: 'cvv' })
      ])
    ])
  },
  {
    name: 'Поиск с фильтрами',
    code: 'bg-gray-50 p-4 rounded-lg space-y-3',
    component: React.createElement('div', { className: 'bg-gray-50 p-4 rounded-lg space-y-3' }, [
      React.createElement('div', { className: 'relative', key: 'search' }, [
        React.createElement('input', { className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Поиск товаров...', key: 'input' }),
        React.createElement('div', { className: 'absolute left-3 top-1/2 transform -translate-y-1/2', key: 'icon' }, '🔍')
      ]),
      React.createElement('div', { className: 'flex flex-wrap gap-2', key: 'filters' }, [
        React.createElement('select', { className: 'px-3 py-1 border border-gray-300 rounded text-sm', key: 'cat' }, [
          React.createElement('option', { key: '1' }, 'Категория'),
          React.createElement('option', { key: '2' }, 'Электроника')
        ]),
        React.createElement('select', { className: 'px-3 py-1 border border-gray-300 rounded text-sm', key: 'price' }, [
          React.createElement('option', { key: '1' }, 'Цена'),
          React.createElement('option', { key: '2' }, 'До 1000₽')
        ])
      ])
    ])
  },
  {
    name: 'Опросник',
    code: 'space-y-4 bg-white p-6 rounded-lg border border-gray-200',
    component: React.createElement('div', { className: 'space-y-4 bg-white p-6 rounded-lg border border-gray-200' }, [
      React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Оцените наш сервис'),
      React.createElement('div', { className: 'space-y-3', key: 'questions' }, [
        React.createElement('div', { key: 'q1' }, [
          React.createElement('p', { className: 'text-sm font-medium mb-2', key: 'text' }, 'Качество обслуживания'),
          React.createElement('div', { className: 'flex space-x-2', key: 'options' }, [
            React.createElement('button', { className: 'px-3 py-1 bg-green-500 text-white rounded text-sm', key: '1' }, 'Отлично'),
            React.createElement('button', { className: 'px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm', key: '2' }, 'Хорошо'),
            React.createElement('button', { className: 'px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm', key: '3' }, 'Плохо')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Логин форма',
    code: 'space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-sm',
    component: React.createElement('div', { className: 'space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-sm' }, [
      React.createElement('h2', { className: 'text-xl font-bold text-center', key: 'title' }, 'Вход'),
      React.createElement('input', { type: 'email', className: 'w-full px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Email', key: 'email' }),
      React.createElement('input', { type: 'password', className: 'w-full px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Пароль', key: 'pass' }),
      React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600', key: 'submit' }, 'Войти'),
      React.createElement('p', { className: 'text-center text-sm text-gray-600', key: 'forgot' }, 'Забыли пароль?')
    ])
  },
  {
    name: 'Регистрация форма',
    code: 'space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-md',
    component: React.createElement('div', { className: 'space-y-4 bg-white p-6 rounded-lg shadow-lg max-w-md' }, [
      React.createElement('h2', { className: 'text-xl font-bold text-center', key: 'title' }, 'Регистрация'),
      React.createElement('div', { className: 'grid grid-cols-2 gap-3', key: 'names' }, [
        React.createElement('input', { className: 'px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Имя', key: 'first' }),
        React.createElement('input', { className: 'px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Фамилия', key: 'last' })
      ]),
      React.createElement('input', { type: 'email', className: 'w-full px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Email', key: 'email' }),
      React.createElement('input', { type: 'password', className: 'w-full px-4 py-2 border border-gray-300 rounded-lg', placeholder: 'Пароль', key: 'pass' }),
      React.createElement('label', { className: 'flex items-center space-x-2', key: 'terms' }, [
        React.createElement('input', { type: 'checkbox', key: 'check' }),
        React.createElement('span', { className: 'text-sm text-gray-600', key: 'text' }, 'Согласен с условиями')
      ]),
      React.createElement('button', { className: 'w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600', key: 'submit' }, 'Зарегистрироваться')
    ])
  },
  {
    name: 'Форма контактов',
    code: 'space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200',
    component: React.createElement('div', { className: 'space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200' }, [
      React.createElement('h3', { className: 'font-bold text-lg', key: 'title' }, 'Свяжитесь с нами'),
      React.createElement('div', { className: 'grid grid-cols-2 gap-3', key: 'row1' }, [
        React.createElement('input', { className: 'px-4 py-2 border border-gray-300 rounded-lg bg-white', placeholder: 'Имя', key: 'name' }),
        React.createElement('input', { type: 'email', className: 'px-4 py-2 border border-gray-300 rounded-lg bg-white', placeholder: 'Email', key: 'email' })
      ]),
      React.createElement('input', { className: 'w-full px-4 py-2 border border-gray-300 rounded-lg bg-white', placeholder: 'Тема сообщения', key: 'subject' }),
      React.createElement('textarea', { className: 'w-full px-4 py-3 border border-gray-300 rounded-lg bg-white resize-none', placeholder: 'Ваше сообщение...', rows: 4, key: 'message' }),
      React.createElement('button', { className: 'bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600', key: 'submit' }, 'Отправить')
    ])
  },
  {
    name: 'Форма подписки',
    code: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg',
    component: React.createElement('div', { className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg' }, [
      React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Подпишитесь на рассылку'),
      React.createElement('p', { className: 'text-white/90 text-sm mb-4', key: 'desc' }, 'Получайте последние новости и скидки'),
      React.createElement('div', { className: 'flex space-x-2', key: 'form' }, [
        React.createElement('input', { type: 'email', className: 'flex-1 px-4 py-2 rounded-lg text-gray-900', placeholder: 'Ваш email', key: 'email' }),
        React.createElement('button', { className: 'bg-white text-purple-500 px-6 py-2 rounded-lg font-medium hover:bg-gray-100', key: 'submit' }, 'Подписаться')
      ])
    ])
  },
  {
    name: 'Инпут даты',
    code: 'space-y-2',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Дата рождения'),
      React.createElement('div', { className: 'flex space-x-2', key: 'date' }, [
        React.createElement('select', { className: 'flex-1 px-3 py-2 border border-gray-300 rounded-lg', key: 'day' }, [
          React.createElement('option', { key: '1' }, 'День'),
          React.createElement('option', { key: '2' }, '15')
        ]),
        React.createElement('select', { className: 'flex-1 px-3 py-2 border border-gray-300 rounded-lg', key: 'month' }, [
          React.createElement('option', { key: '1' }, 'Месяц'),
          React.createElement('option', { key: '2' }, 'Январь')
        ]),
        React.createElement('select', { className: 'flex-1 px-3 py-2 border border-gray-300 rounded-lg', key: 'year' }, [
          React.createElement('option', { key: '1' }, 'Год'),
          React.createElement('option', { key: '2' }, '1990')
        ])
      ])
    ])
  },
  {
    name: 'Поле телефона',
    code: 'space-y-2',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('label', { className: 'block text-sm font-medium text-gray-700', key: 'label' }, 'Номер телефона'),
      React.createElement('div', { className: 'flex', key: 'phone' }, [
        React.createElement('select', { className: 'px-3 py-2 border border-gray-300 rounded-l-lg border-r-0 bg-gray-50', key: 'code' }, [
          React.createElement('option', { key: '1' }, '+7'),
          React.createElement('option', { key: '2' }, '+1')
        ]),
        React.createElement('input', { type: 'tel', className: 'flex-1 px-4 py-2 border border-gray-300 rounded-r-lg', placeholder: '(123) 456-7890', key: 'number' })
      ])
    ])
  },
  {
    name: 'Стэппер численный',
    code: 'flex items-center space-x-3',
    component: React.createElement('div', { className: 'flex items-center space-x-3' }, [
      React.createElement('span', { className: 'text-sm font-medium text-gray-700', key: 'label' }, 'Количество:'),
      React.createElement('div', { className: 'flex items-center border border-gray-300 rounded-lg', key: 'stepper' }, [
        React.createElement('button', { className: 'px-3 py-2 text-gray-600 hover:bg-gray-100', key: 'minus' }, '−'),
        React.createElement('input', { type: 'number', defaultValue: '1', className: 'w-16 px-2 py-2 text-center border-0 focus:outline-none', key: 'input' }),
        React.createElement('button', { className: 'px-3 py-2 text-gray-600 hover:bg-gray-100', key: 'plus' }, '+')
      ])
    ])
  }
] 