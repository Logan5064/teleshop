import React from 'react'

export const navigationStyles = [
  {
    name: 'Активный элемент',
    code: 'ts-nav-item-active',
    component: React.createElement('div', { className: 'ts-nav-item ts-nav-item-active' }, 'Активный элемент')
  },
  {
    name: 'Неактивный элемент',
    code: 'ts-nav-item-inactive',
    component: React.createElement('div', { className: 'ts-nav-item ts-nav-item-inactive' }, 'Неактивный элемент')
  },
  {
    name: 'Таб активный',
    code: 'border-b-2 border-blue-500 text-blue-600 font-medium',
    component: React.createElement('div', { className: 'border-b-2 border-blue-500 text-blue-600 font-medium p-2' }, 'Активный таб')
  },
  {
    name: 'Кнопка меню',
    code: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium',
    component: React.createElement('button', { className: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium' }, 'Меню')
  },
  {
    name: 'Вертикальное меню',
    code: 'bg-white rounded-lg shadow-lg p-2 w-48',
    component: React.createElement('div', { className: 'bg-white rounded-lg shadow-lg p-2 w-48' }, [
      React.createElement('div', { className: 'px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer', key: '1' }, 'Главная'),
      React.createElement('div', { className: 'px-3 py-2 text-gray-700 hover:bg-gray-100 rounded cursor-pointer', key: '2' }, 'Каталог'),
      React.createElement('div', { className: 'px-3 py-2 bg-blue-100 text-blue-700 rounded', key: '3' }, 'Контакты')
    ])
  },
  {
    name: 'Хлебные крошки',
    code: 'flex items-center space-x-2 text-sm text-gray-600',
    component: React.createElement('div', { className: 'flex items-center space-x-2 text-sm text-gray-600' }, [
      React.createElement('span', { key: '1' }, 'Главная'),
      React.createElement('span', { key: '2' }, '›'),
      React.createElement('span', { key: '3' }, 'Каталог'),
      React.createElement('span', { key: '4' }, '›'),
      React.createElement('span', { className: 'text-blue-600 font-medium', key: '5' }, 'Товар')
    ])
  },
  {
    name: 'Боковая навигация',
    code: 'bg-gray-900 text-white w-64 p-4',
    component: React.createElement('div', { className: 'bg-gray-900 text-white w-64 p-4' }, [
      React.createElement('div', { className: 'mb-6', key: 'title' }, React.createElement('h2', { className: 'text-xl font-bold' }, 'Меню')),
      React.createElement('nav', { key: 'nav' }, [
        React.createElement('div', { className: 'py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded cursor-pointer', key: '1' }, 'Дашборд'),
        React.createElement('div', { className: 'py-2 px-3 bg-gray-800 text-white rounded', key: '2' }, 'Продукты'),
        React.createElement('div', { className: 'py-2 px-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded cursor-pointer', key: '3' }, 'Заказы')
      ])
    ])
  },
  {
    name: 'Пагинация',
    code: 'flex items-center space-x-1',
    component: React.createElement('div', { className: 'flex items-center space-x-1' }, [
      React.createElement('button', { className: 'px-3 py-2 text-gray-500 hover:text-gray-700', key: 'prev' }, '‹'),
      React.createElement('button', { className: 'px-3 py-2 text-gray-700 hover:bg-gray-100 rounded', key: '1' }, '1'),
      React.createElement('button', { className: 'px-3 py-2 bg-blue-500 text-white rounded', key: '2' }, '2'),
      React.createElement('button', { className: 'px-3 py-2 text-gray-700 hover:bg-gray-100 rounded', key: '3' }, '3'),
      React.createElement('button', { className: 'px-3 py-2 text-gray-500 hover:text-gray-700', key: 'next' }, '›')
    ])
  },
  {
    name: 'Табы карточки',
    code: 'bg-white rounded-lg shadow-sm border border-gray-200',
    component: React.createElement('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200' }, [
      React.createElement('div', { className: 'flex border-b border-gray-200', key: 'tabs' }, [
        React.createElement('button', { className: 'px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium', key: '1' }, 'Обзор'),
        React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: '2' }, 'Детали'),
        React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: '3' }, 'Отзывы')
      ]),
      React.createElement('div', { className: 'p-4', key: 'content' }, 'Содержимое таба')
    ])
  },
  {
    name: 'Мобильное меню',
    code: 'fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 px-4 py-2',
    component: React.createElement('div', { className: 'bg-white border-t border-gray-200 px-4 py-2 flex justify-around' }, [
      React.createElement('div', { className: 'text-center', key: '1' }, [
        React.createElement('div', { className: 'text-gray-400 mb-1', key: 'icon' }, '🏠'),
        React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'Главная')
      ]),
      React.createElement('div', { className: 'text-center', key: '2' }, [
        React.createElement('div', { className: 'text-blue-500 mb-1', key: 'icon' }, '🛍️'),
        React.createElement('span', { className: 'text-xs text-blue-600 font-medium', key: 'label' }, 'Каталог')
      ]),
      React.createElement('div', { className: 'text-center', key: '3' }, [
        React.createElement('div', { className: 'text-gray-400 mb-1', key: 'icon' }, '❤️'),
        React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'Избранное')
      ])
    ])
  },
  {
    name: 'Горизонтальные табы',
    code: 'flex space-x-1 bg-gray-100 rounded-lg p-1',
    component: React.createElement('div', { className: 'flex space-x-1 bg-gray-100 rounded-lg p-1' }, [
      React.createElement('button', { className: 'px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm font-medium', key: '1' }, 'Все'),
      React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-900', key: '2' }, 'Активные'),
      React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-900', key: '3' }, 'Архив')
    ])
  },
  {
    name: 'Дропдаун меню',
    code: 'relative inline-block',
    component: React.createElement('div', { className: 'relative inline-block' }, [
      React.createElement('button', { className: 'bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50', key: 'trigger' }, 'Опции ▼'),
      React.createElement('div', { className: 'absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10', key: 'menu' }, [
        React.createElement('div', { className: 'py-1', key: 'items' }, [
          React.createElement('a', { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', key: '1' }, 'Редактировать'),
          React.createElement('a', { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', key: '2' }, 'Дублировать'),
          React.createElement('a', { className: 'block px-4 py-2 text-sm text-red-600 hover:bg-gray-100', key: '3' }, 'Удалить')
        ])
      ])
    ])
  },
  {
    name: 'Степпер',
    code: 'flex items-center',
    component: React.createElement('div', { className: 'flex items-center' }, [
      React.createElement('div', { className: 'flex items-center', key: '1' }, [
        React.createElement('div', { className: 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '1'),
        React.createElement('span', { className: 'ml-2 text-sm font-medium text-blue-600', key: 'label' }, 'Корзина')
      ]),
      React.createElement('div', { className: 'w-16 h-0.5 bg-blue-500 mx-4', key: 'line1' }),
      React.createElement('div', { className: 'flex items-center', key: '2' }, [
        React.createElement('div', { className: 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '2'),
        React.createElement('span', { className: 'ml-2 text-sm font-medium text-blue-600', key: 'label' }, 'Доставка')
      ]),
      React.createElement('div', { className: 'w-16 h-0.5 bg-gray-300 mx-4', key: 'line2' }),
      React.createElement('div', { className: 'flex items-center', key: '3' }, [
        React.createElement('div', { className: 'w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '3'),
        React.createElement('span', { className: 'ml-2 text-sm font-medium text-gray-500', key: 'label' }, 'Оплата')
      ])
    ])
  },
  {
    name: 'Тег навигации',
    code: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
    component: React.createElement('div', { className: 'flex flex-wrap gap-2' }, [
      React.createElement('span', { className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800', key: '1' }, 'Популярное'),
      React.createElement('span', { className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800', key: '2' }, 'Новинки'),
      React.createElement('span', { className: 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800', key: '3' }, 'Скидки')
    ])
  },
  {
    name: 'Поиск с фильтрами',
    code: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
    component: React.createElement('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4' }, [
      React.createElement('div', { className: 'flex items-center space-x-4 mb-4', key: 'search' }, [
        React.createElement('input', { type: 'text', placeholder: 'Поиск...', className: 'flex-1 border border-gray-300 rounded-md px-3 py-2', key: 'input' }),
        React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded-md', key: 'btn' }, 'Найти')
      ]),
      React.createElement('div', { className: 'flex flex-wrap gap-2', key: 'filters' }, [
        React.createElement('button', { className: 'px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm', key: '1' }, 'Категория'),
        React.createElement('button', { className: 'px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm', key: '2' }, 'Цена'),
        React.createElement('button', { className: 'px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm', key: '3' }, 'Бренд')
      ])
    ])
  },
  {
    name: 'Социальные ссылки',
    code: 'flex space-x-4',
    component: React.createElement('div', { className: 'flex space-x-4' }, [
      React.createElement('a', { className: 'w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors', key: '1' }, 'f'),
      React.createElement('a', { className: 'w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors', key: '2' }, 't'),
      React.createElement('a', { className: 'w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors', key: '3' }, 'i')
    ])
  },
  {
    name: 'Аккордеон навигация',
    code: 'bg-white rounded-lg shadow-sm border border-gray-200',
    component: React.createElement('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200' }, [
      React.createElement('div', { className: 'border-b border-gray-200', key: '1' }, [
        React.createElement('button', { className: 'w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50 flex items-center justify-between', key: 'btn' }, [
          React.createElement('span', { key: 'text' }, 'Каталог'),
          React.createElement('span', { key: 'icon' }, '▼')
        ]),
        React.createElement('div', { className: 'px-4 py-2 bg-gray-50', key: 'content' }, [
          React.createElement('div', { className: 'py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer', key: 'sub1' }, 'Электроника'),
          React.createElement('div', { className: 'py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer', key: 'sub2' }, 'Одежда')
        ])
      ]),
      React.createElement('button', { className: 'w-full px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-50', key: '2' }, 'О нас')
    ])
  },
  {
    name: 'Фиксированная навигация',
    code: 'fixed top-0 left-0 right-0 bg-white shadow-md z-50',
    component: React.createElement('div', { className: 'bg-white shadow-md border-b border-gray-200 px-4 py-3' }, [
      React.createElement('div', { className: 'flex items-center justify-between', key: 'content' }, [
        React.createElement('div', { className: 'font-bolt text-xl text-gray-800', key: 'logo' }, 'LOGO'),
        React.createElement('nav', { className: 'hidden md:flex space-x-6', key: 'nav' }, [
          React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '1' }, 'Главная'),
          React.createElement('a', { className: 'text-blue-600 font-medium', key: '2' }, 'Каталог'),
          React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '3' }, 'Контакты')
        ]),
        React.createElement('button', { className: 'md:hidden', key: 'mobile' }, '☰')
      ])
    ])
  },
  {
    name: 'Кнопки действий',
    code: 'flex items-center space-x-2',
    component: React.createElement('div', { className: 'flex items-center space-x-2' }, [
      React.createElement('button', { className: 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium', key: '1' }, 'Сохранить'),
      React.createElement('button', { className: 'bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium', key: '2' }, 'Отмена'),
      React.createElement('button', { className: 'bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium', key: '3' }, 'Удалить')
    ])
  },
  {
    name: 'Меню гамбургер',
    code: 'w-6 h-6 flex flex-col justify-center space-y-1 cursor-pointer',
    component: React.createElement('div', { className: 'w-6 h-6 flex flex-col justify-center space-y-1 cursor-pointer' }, [
      React.createElement('div', { className: 'w-full h-0.5 bg-gray-600', key: '1' }),
      React.createElement('div', { className: 'w-full h-0.5 bg-gray-600', key: '2' }),
      React.createElement('div', { className: 'w-full h-0.5 bg-gray-600', key: '3' })
    ])
  },
  {
    name: 'Мега меню',
    code: 'relative group',
    component: React.createElement('div', { className: 'relative group' }, [
      React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'trigger' }, 'Категории'),
      React.createElement('div', { className: 'absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity', key: 'mega' }, [
        React.createElement('div', { className: 'grid grid-cols-2 gap-4 p-6', key: 'content' }, [
          React.createElement('div', { key: '1' }, [
            React.createElement('h3', { className: 'font-bold mb-2', key: 'title' }, 'Электроника'),
            React.createElement('div', { className: 'space-y-1', key: 'items' }, [
              React.createElement('a', { className: 'block text-sm text-gray-600 hover:text-gray-800', key: 'a1' }, 'Смартфоны'),
              React.createElement('a', { className: 'block text-sm text-gray-600 hover:text-gray-800', key: 'a2' }, 'Ноутбуки')
            ])
          ]),
          React.createElement('div', { key: '2' }, [
            React.createElement('h3', { className: 'font-bold mb-2', key: 'title' }, 'Одежда'),
            React.createElement('div', { className: 'space-y-1', key: 'items' }, [
              React.createElement('a', { className: 'block text-sm text-gray-600 hover:text-gray-800', key: 'a1' }, 'Мужская'),
              React.createElement('a', { className: 'block text-sm text-gray-600 hover:text-gray-800', key: 'a2' }, 'Женская')
            ])
          ])
        ])
      ])
    ])
  },
  {
    name: 'Навигация по алфавиту',
    code: 'flex flex-wrap gap-1',
    component: React.createElement('div', { className: 'flex flex-wrap gap-1' }, [
      ...Array.from('АБВГДЕЁЖЗИК').map((letter, i) => 
        React.createElement('button', { 
          className: i === 0 ? 'w-8 h-8 bg-blue-500 text-white rounded text-sm font-medium' : 'w-8 h-8 bg-gray-100 text-gray-600 rounded text-sm font-medium hover:bg-gray-200', 
          key: letter 
        }, letter)
      )
    ])
  },
  {
    name: 'Сайдбар с группами',
    code: 'bg-gray-50 w-64 p-4 h-96 overflow-y-auto',
    component: React.createElement('div', { className: 'bg-gray-50 w-64 p-4 h-96 overflow-y-auto' }, [
      React.createElement('div', { className: 'mb-6', key: 'group1' }, [
        React.createElement('h3', { className: 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3', key: 'title' }, 'Основное'),
        React.createElement('nav', { className: 'space-y-1', key: 'nav' }, [
          React.createElement('a', { className: 'flex items-center px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded', key: '1' }, 'Дашборд'),
          React.createElement('a', { className: 'flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded', key: '2' }, 'Проекты')
        ])
      ]),
      React.createElement('div', { key: 'group2' }, [
        React.createElement('h3', { className: 'text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3', key: 'title' }, 'Настройки'),
        React.createElement('nav', { className: 'space-y-1', key: 'nav' }, [
          React.createElement('a', { className: 'flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded', key: '1' }, 'Профиль'),
          React.createElement('a', { className: 'flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded', key: '2' }, 'Уведомления')
        ])
      ])
    ])
  },
  {
    name: 'Навигация с иконками',
    code: 'flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1',
    component: React.createElement('div', { className: 'flex items-center space-x-1 bg-white rounded-lg shadow-sm border border-gray-200 p-1' }, [
      React.createElement('button', { className: 'flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded-md', key: '1' }, [
        React.createElement('span', { key: 'icon' }, '🏠'),
        React.createElement('span', { key: 'label' }, 'Дом')
      ]),
      React.createElement('button', { className: 'flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md', key: '2' }, [
        React.createElement('span', { key: 'icon' }, '📊'),
        React.createElement('span', { key: 'label' }, 'Статистика')
      ]),
      React.createElement('button', { className: 'flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md', key: '3' }, [
        React.createElement('span', { key: 'icon' }, '⚙️'),
        React.createElement('span', { key: 'label' }, 'Настройки')
      ])
    ])
  },
  {
    name: 'Прогресс навигации',
    code: 'flex items-center justify-between w-full',
    component: React.createElement('div', { className: 'flex items-center justify-between w-full' }, [
      React.createElement('div', { className: 'flex items-center space-x-4', key: 'steps' }, [
        React.createElement('div', { className: 'flex items-center', key: '1' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '✓'),
          React.createElement('span', { className: 'ml-2 text-sm font-medium text-green-600', key: 'label' }, 'Завершено')
        ]),
        React.createElement('div', { className: 'w-12 h-0.5 bg-green-500', key: 'line1' }),
        React.createElement('div', { className: 'flex items-center', key: '2' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '2'),
          React.createElement('span', { className: 'ml-2 text-sm font-medium text-blue-600', key: 'label' }, 'Текущий')
        ]),
        React.createElement('div', { className: 'w-12 h-0.5 bg-gray-300', key: 'line2' }),
        React.createElement('div', { className: 'flex items-center', key: '3' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium', key: 'num' }, '3'),
          React.createElement('span', { className: 'ml-2 text-sm font-medium text-gray-500', key: 'label' }, 'Ожидает')
        ])
      ])
    ])
  },
  {
    name: 'Навигация с поиском',
    code: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-80',
    component: React.createElement('div', { className: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-80' }, [
      React.createElement('div', { className: 'relative mb-4', key: 'search' }, [
        React.createElement('input', { type: 'text', placeholder: 'Поиск в меню...', className: 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500', key: 'input' }),
        React.createElement('div', { className: 'absolute left-3 top-1/2 transform -translate-y-1/2', key: 'icon' }, '🔍')
      ]),
      React.createElement('nav', { className: 'space-y-1', key: 'nav' }, [
        React.createElement('a', { className: 'block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded', key: '1' }, 'Пользователи'),
        React.createElement('a', { className: 'block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded', key: '2' }, 'Продукты'),
        React.createElement('a', { className: 'block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded', key: '3' }, 'Заказы')
      ])
    ])
  },
  {
    name: 'Быстрые действия',
    code: 'flex items-center space-x-2 bg-gray-900 text-white rounded-lg p-3',
    component: React.createElement('div', { className: 'flex items-center space-x-2 bg-gray-900 text-white rounded-lg p-3' }, [
      React.createElement('span', { className: 'text-sm font-medium', key: 'label' }, 'Быстрые действия:'),
      React.createElement('button', { className: 'px-3 py-1 bg-white bg-opacity-20 text-white rounded text-sm hover:bg-opacity-30 transition-colors', key: '1' }, 'Ctrl+N'),
      React.createElement('button', { className: 'px-3 py-1 bg-white bg-opacity-20 text-white rounded text-sm hover:bg-opacity-30 transition-colors', key: '2' }, 'Ctrl+S'),
      React.createElement('button', { className: 'px-3 py-1 bg-white bg-opacity-20 text-white rounded text-sm hover:bg-opacity-30 transition-colors', key: '3' }, 'Ctrl+Z')
    ])
  },
  {
    name: 'Навигация с бейджами',
    code: 'space-y-2 w-64',
    component: React.createElement('div', { className: 'space-y-2 w-64' }, [
      React.createElement('a', { className: 'flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors', key: '1' }, [
        React.createElement('span', { className: 'text-sm font-medium text-gray-700', key: 'label' }, 'Входящие'),
        React.createElement('span', { className: 'px-2 py-1 bg-red-500 text-white text-xs rounded-full', key: 'badge' }, '5')
      ]),
      React.createElement('a', { className: 'flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors', key: '2' }, [
        React.createElement('span', { className: 'text-sm font-medium text-gray-700', key: 'label' }, 'Отправленные'),
        React.createElement('span', { className: 'px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded-full', key: 'badge' }, '12')
      ]),
      React.createElement('a', { className: 'flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors', key: '3' }, [
        React.createElement('span', { className: 'text-sm font-medium text-gray-700', key: 'label' }, 'Черновики'),
        React.createElement('span', { className: 'px-2 py-1 bg-yellow-400 text-yellow-800 text-xs rounded-full', key: 'badge' }, '3')
      ])
    ])
  },
  {
    name: 'Команды навигации',
    code: 'bg-gray-800 text-white rounded-lg p-4 w-80',
    component: React.createElement('div', { className: 'bg-gray-800 text-white rounded-lg p-4 w-80' }, [
      React.createElement('div', { className: 'mb-3', key: 'header' }, [
        React.createElement('span', { className: 'text-sm text-gray-400', key: 'label' }, 'Команды'),
        React.createElement('span', { className: 'text-xs text-gray-500 ml-2', key: 'hint' }, 'Начните печатать...')
      ]),
      React.createElement('div', { className: 'space-y-1', key: 'commands' }, [
        React.createElement('div', { className: 'flex items-center justify-between px-3 py-2 bg-blue-600 rounded', key: '1' }, [
          React.createElement('span', { className: 'text-sm', key: 'text' }, 'Создать новый проект'),
          React.createElement('span', { className: 'text-xs text-blue-200', key: 'key' }, '⌘ N')
        ]),
        React.createElement('div', { className: 'flex items-center justify-between px-3 py-2 hover:bg-gray-700 rounded', key: '2' }, [
          React.createElement('span', { className: 'text-sm', key: 'text' }, 'Открыть файл'),
          React.createElement('span', { className: 'text-xs text-gray-400', key: 'key' }, '⌘ O')
        ]),
        React.createElement('div', { className: 'flex items-center justify-between px-3 py-2 hover:bg-gray-700 rounded', key: '3' }, [
          React.createElement('span', { className: 'text-sm', key: 'text' }, 'Настройки'),
          React.createElement('span', { className: 'text-xs text-gray-400', key: 'key' }, '⌘ ,')
        ])
      ])
    ])
  }
] 