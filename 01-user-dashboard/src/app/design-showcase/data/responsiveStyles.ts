import React from 'react'

export const responsiveStyles = [
  {
    name: 'Адаптивная сетка',
    code: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    component: React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' }, [
      React.createElement('div', { className: 'bg-blue-100 p-4 rounded text-center', key: '1' }, '1'),
      React.createElement('div', { className: 'bg-green-100 p-4 rounded text-center', key: '2' }, '2'),
      React.createElement('div', { className: 'bg-yellow-100 p-4 rounded text-center', key: '3' }, '3'),
      React.createElement('div', { className: 'bg-red-100 p-4 rounded text-center', key: '4' }, '4')
    ])
  },
  {
    name: 'Адаптивная типографика',
    code: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('h1', { className: 'text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold', key: 'h1' }, 'Адаптивный заголовок'),
      React.createElement('p', { className: 'text-xs sm:text-sm md:text-base lg:text-lg', key: 'p' }, 'Адаптивный текст параграфа')
    ])
  },
  {
    name: 'Скрытие элементов',
    code: 'block md:hidden | hidden md:block',
    component: React.createElement('div', { className: 'space-y-2' }, [
      React.createElement('div', { className: 'block md:hidden bg-blue-100 p-4 rounded text-center', key: 'mobile' }, 'Только на мобильных'),
      React.createElement('div', { className: 'hidden md:block bg-green-100 p-4 rounded text-center', key: 'desktop' }, 'Только на десктопе')
    ])
  },
  {
    name: 'Адаптивные отступы',
    code: 'p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10',
    component: React.createElement('div', { className: 'bg-gray-100 rounded' }, [
      React.createElement('div', { className: 'p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 bg-blue-100 rounded', key: 'inner' }, 'Адаптивные отступы')
    ])
  },
  {
    name: 'Адаптивная ширина',
    code: 'w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4',
    component: React.createElement('div', { className: 'w-full bg-gray-100 p-4 rounded' }, [
      React.createElement('div', { className: 'w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-blue-500 text-white p-4 rounded mx-auto text-center', key: 'content' }, 'Адаптивная ширина')
    ])
  },
  {
    name: 'Flex направление',  
    code: 'flex flex-col sm:flex-row',
    component: React.createElement('div', { className: 'flex flex-col sm:flex-row gap-4 bg-gray-100 p-4 rounded' }, [
      React.createElement('div', { className: 'bg-blue-500 text-white p-4 rounded text-center flex-1', key: '1' }, 'Элемент 1'),
      React.createElement('div', { className: 'bg-green-500 text-white p-4 rounded text-center flex-1', key: '2' }, 'Элемент 2')  
    ])
  },
  {
    name: 'Адаптивная высота',
    code: 'h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64',  
    component: React.createElement('div', { className: 'h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center text-white font-bold' }, 'Адаптивная высота')
  },
  {
    name: 'Мобильное меню',
    code: 'hidden sm:flex | flex sm:hidden',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-4' }, [
      React.createElement('div', { className: 'flex items-center justify-between', key: 'header' }, [
        React.createElement('div', { className: 'font-bold', key: 'logo' }, 'LOGO'),
        React.createElement('button', { className: 'flex sm:hidden', key: 'burger' }, '☰')
      ]),
      React.createElement('nav', { className: 'hidden sm:flex space-x-4 mt-4 sm:mt-0', key: 'nav' }, [
        React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '1' }, 'Главная'),
        React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '2' }, 'О нас'),
        React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '3' }, 'Контакты')
      ])
    ])
  },
  {
    name: 'Адаптивные карточки',
    code: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    component: React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' }, [
      React.createElement('div', { className: 'bg-white border rounded-lg p-4 shadow-sm', key: '1' }, [
        React.createElement('div', { className: 'h-32 bg-blue-200 rounded mb-3', key: 'img' }),
        React.createElement('h3', { className: 'font-semibold', key: 'title' }, 'Карточка 1'),
        React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Описание карточки')
      ]),
      React.createElement('div', { className: 'bg-white border rounded-lg p-4 shadow-sm', key: '2' }, [
        React.createElement('div', { className: 'h-32 bg-green-200 rounded mb-3', key: 'img' }),
        React.createElement('h3', { className: 'font-semibold', key: 'title' }, 'Карточка 2'),
        React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Описание карточки')
      ]),
      React.createElement('div', { className: 'bg-white border rounded-lg p-4 shadow-sm', key: '3' }, [
        React.createElement('div', { className: 'h-32 bg-yellow-200 rounded mb-3', key: 'img' }),
        React.createElement('h3', { className: 'font-semibold', key: 'title' }, 'Карточка 3'),
        React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Описание карточки')
      ])
    ])
  },
  {
    name: 'Контейнер с ограничением',
    code: 'max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto',
    component: React.createElement('div', { className: 'max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-gray-100 p-4 rounded' }, [
      React.createElement('div', { className: 'bg-blue-500 text-white p-4 rounded text-center', key: 'content' }, 'Адаптивный контейнер')
    ])
  },
  {
    name: 'Адаптивная форма',
    code: 'space-y-4 sm:space-y-0 sm:space-x-4 sm:flex',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-6' }, [
      React.createElement('div', { className: 'space-y-4 sm:space-y-0 sm:space-x-4 sm:flex', key: 'form' }, [
        React.createElement('input', { type: 'text', placeholder: 'Имя', className: 'w-full sm:flex-1 border rounded px-3 py-2', key: 'name' }),
        React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full sm:flex-1 border rounded px-3 py-2', key: 'email' }),
        React.createElement('button', { className: 'w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600', key: 'submit' }, 'Отправить')
      ])
    ])
  },
  {
    name: 'Адаптивная sidebar',
    code: 'flex-col lg:flex-row',
    component: React.createElement('div', { className: 'flex flex-col lg:flex-row bg-gray-100 rounded-lg overflow-hidden' }, [
      React.createElement('div', { className: 'lg:w-64 bg-gray-800 text-white p-4', key: 'sidebar' }, [
        React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Sidebar'),
        React.createElement('ul', { className: 'space-y-2', key: 'menu' }, [
          React.createElement('li', { key: '1' }, React.createElement('a', { className: 'block py-2 px-3 bg-gray-700 rounded' }, 'Пункт 1')),
          React.createElement('li', { key: '2' }, React.createElement('a', { className: 'block py-2 px-3 hover:bg-gray-700 rounded' }, 'Пункт 2'))
        ])
      ]),
      React.createElement('div', { className: 'flex-1 p-6', key: 'content' }, [
        React.createElement('h2', { className: 'text-xl font-bold mb-4', key: 'title' }, 'Основное содержимое'),
        React.createElement('p', { className: 'text-gray-600', key: 'text' }, 'Контент основной области')
      ])
    ])
  },
  {
    name: 'Адаптивная галерея',
    code: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    component: React.createElement('div', { className: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2' }, 
      Array.from({ length: 10 }, (_, i) => 
        React.createElement('div', { 
          className: `aspect-square bg-gradient-to-br ${i % 2 === 0 ? 'from-blue-400 to-purple-500' : 'from-green-400 to-blue-500'} rounded`, 
          key: i 
        })
      )
    )
  },
  {
    name: 'Адаптивная таблица',
    code: 'hidden md:table | block md:hidden',
    component: React.createElement('div', { className: 'bg-white border rounded-lg overflow-hidden' }, [
      React.createElement('table', { className: 'hidden md:table w-full', key: 'table' }, [
        React.createElement('thead', { className: 'bg-gray-50', key: 'head' }, [
          React.createElement('tr', { key: 'row' }, [
            React.createElement('th', { className: 'px-4 py-2 text-left', key: '1' }, 'Имя'),
            React.createElement('th', { className: 'px-4 py-2 text-left', key: '2' }, 'Email'),
            React.createElement('th', { className: 'px-4 py-2 text-left', key: '3' }, 'Роль')
          ])
        ]),
        React.createElement('tbody', { key: 'body' }, [
          React.createElement('tr', { className: 'border-t', key: 'row1' }, [
            React.createElement('td', { className: 'px-4 py-2', key: '1' }, 'Иван'),
            React.createElement('td', { className: 'px-4 py-2', key: '2' }, 'ivan@mail.ru'),
            React.createElement('td', { className: 'px-4 py-2', key: '3' }, 'Админ')
          ])
        ])
      ]),
      React.createElement('div', { className: 'block md:hidden space-y-4 p-4', key: 'cards' }, [
        React.createElement('div', { className: 'border rounded p-4', key: 'card' }, [
          React.createElement('div', { className: 'font-semibold', key: 'name' }, 'Иван'),
          React.createElement('div', { className: 'text-gray-600', key: 'email' }, 'ivan@mail.ru'),
          React.createElement('div', { className: 'text-sm text-gray-500', key: 'role' }, 'Админ')
        ])
      ])
    ])
  },
  {
    name: 'Адаптивная навигация',
    code: 'justify-center sm:justify-start md:justify-between',
    component: React.createElement('nav', { className: 'bg-white border rounded-lg p-4' }, [
      React.createElement('div', { className: 'flex flex-col sm:flex-row items-center justify-center sm:justify-start md:justify-between space-y-4 sm:space-y-0 sm:space-x-6', key: 'nav' }, [
        React.createElement('div', { className: 'font-bold text-xl', key: 'logo' }, 'LOGO'),
        React.createElement('div', { className: 'flex space-x-4', key: 'links' }, [
          React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '1' }, 'Главная'),
          React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '2' }, 'Услуги'),
          React.createElement('a', { className: 'text-gray-600 hover:text-gray-800', key: '3' }, 'Контакты')
        ]),
        React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded', key: 'cta' }, 'Связаться')
      ])
    ])
  },
  {
    name: 'Адаптивный герой блок',
    code: 'text-center lg:text-left',
    component: React.createElement('div', { className: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 lg:p-12' }, [
      React.createElement('div', { className: 'flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8', key: 'content' }, [
        React.createElement('div', { className: 'flex-1 text-center lg:text-left', key: 'text' }, [
          React.createElement('h1', { className: 'text-2xl md:text-3xl lg:text-4xl font-bold mb-4', key: 'title' }, 'Адаптивный заголовок'),
          React.createElement('p', { className: 'text-lg md:text-xl mb-6 opacity-90', key: 'desc' }, 'Описание, которое адаптируется под размер экрана'),
          React.createElement('button', { className: 'bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100', key: 'cta' }, 'Начать')
        ]),
        React.createElement('div', { className: 'w-full lg:w-80 h-48 lg:h-64 bg-white bg-opacity-20 rounded-lg flex items-center justify-center', key: 'image' }, '📱 Изображение')
      ])
    ])
  },
  {
    name: 'Адаптивный футер',
    code: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    component: React.createElement('footer', { className: 'bg-gray-800 text-white rounded-lg p-8' }, [
      React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8', key: 'content' }, [
        React.createElement('div', { key: '1' }, [
          React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Компания'),
          React.createElement('ul', { className: 'space-y-2 text-gray-300', key: 'links' }, [
            React.createElement('li', { key: '1' }, React.createElement('a', { className: 'hover:text-white' }, 'О нас')),
            React.createElement('li', { key: '2' }, React.createElement('a', { className: 'hover:text-white' }, 'Карьера'))
          ])
        ]),
        React.createElement('div', { key: '2' }, [
          React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Продукты'),
          React.createElement('ul', { className: 'space-y-2 text-gray-300', key: 'links' }, [
            React.createElement('li', { key: '1' }, React.createElement('a', { className: 'hover:text-white' }, 'Решения')),
            React.createElement('li', { key: '2' }, React.createElement('a', { className: 'hover:text-white' }, 'API'))
          ])
        ]),
        React.createElement('div', { key: '3' }, [
          React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Поддержка'),
          React.createElement('ul', { className: 'space-y-2 text-gray-300', key: 'links' }, [
            React.createElement('li', { key: '1' }, React.createElement('a', { className: 'hover:text-white' }, 'Помощь')),
            React.createElement('li', { key: '2' }, React.createElement('a', { className: 'hover:text-white' }, 'Контакты'))
          ])
        ]),
        React.createElement('div', { key: '4' }, [
          React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Подписка'),
          React.createElement('div', { className: 'flex flex-col sm:flex-row lg:flex-col space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-0 lg:space-y-2', key: 'subscribe' }, [
            React.createElement('input', { placeholder: 'Email', className: 'flex-1 px-3 py-2 rounded bg-gray-700 text-white', key: 'input' }),
            React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600', key: 'btn' }, 'Подписаться')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Адаптивное позиционирование',
    code: 'relative sm:absolute top-0 sm:top-4 right-0 sm:right-4',
    component: React.createElement('div', { className: 'relative bg-gray-100 rounded-lg p-8 h-64' }, [
      React.createElement('div', { className: 'relative sm:absolute top-0 sm:top-4 right-0 sm:right-4 bg-blue-500 text-white px-4 py-2 rounded', key: 'element' }, 'Адаптивная позиция'),
      React.createElement('div', { className: 'mt-4 sm:mt-0', key: 'content' }, 'Основное содержимое блока')
    ])
  },
  {
    name: 'Адаптивные breakpoints',
    code: 'bg-red-400 sm:bg-yellow-400 md:bg-green-400 lg:bg-blue-400 xl:bg-purple-400',
    component: React.createElement('div', { className: 'bg-red-500 sm:bg-yellow-500 md:bg-green-500 lg:bg-blue-500 xl:bg-purple-500 text-white p-8 rounded-lg text-center font-bold' }, [
      React.createElement('div', { className: 'block sm:hidden', key: 'xs' }, 'XS (< 640px)'),
      React.createElement('div', { className: 'hidden sm:block md:hidden', key: 'sm' }, 'SM (640px+)'),
      React.createElement('div', { className: 'hidden md:block lg:hidden', key: 'md' }, 'MD (768px+)'),
      React.createElement('div', { className: 'hidden lg:block xl:hidden', key: 'lg' }, 'LG (1024px+)'),
      React.createElement('div', { className: 'hidden xl:block', key: 'xl' }, 'XL (1280px+)')
    ])
  },
  {
    name: 'Адаптивные flexbox утилиты',
    code: 'flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start',
    component: React.createElement('div', { className: 'bg-gray-100 rounded-lg p-6' }, [
      React.createElement('div', { className: 'flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4', key: 'flex' }, [
        React.createElement('div', { className: 'bg-blue-500 text-white p-4 rounded text-center', key: '1' }, 'Элемент 1'),
        React.createElement('div', { className: 'bg-green-500 text-white p-4 rounded text-center', key: '2' }, 'Элемент 2'),
        React.createElement('div', { className: 'bg-red-500 text-white p-4 rounded text-center', key: '3' }, 'Элемент 3')
      ])
    ])
  },
  {
    name: 'Адаптивная карточка продукта',
    code: 'flex-col sm:flex-row',
    component: React.createElement('div', { className: 'bg-white border rounded-lg overflow-hidden shadow-sm' }, [
      React.createElement('div', { className: 'flex flex-col sm:flex-row', key: 'layout' }, [
        React.createElement('div', { className: 'h-48 sm:h-32 sm:w-32 lg:h-40 lg:w-40 bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0', key: 'image' }),
        React.createElement('div', { className: 'p-4 flex-1', key: 'content' }, [
          React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Название продукта'),
          React.createElement('p', { className: 'text-gray-600 text-sm mb-4', key: 'desc' }, 'Описание продукта адаптируется под размер экрана'),
          React.createElement('div', { className: 'flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0', key: 'footer' }, [
            React.createElement('span', { className: 'text-xl font-bold text-blue-600', key: 'price' }, '₽1,999'),
            React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600', key: 'buy' }, 'Купить')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Адаптивная статистика',
    code: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    component: React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4' }, [
      React.createElement('div', { className: 'bg-white border rounded-lg p-6 text-center', key: '1' }, [
        React.createElement('div', { className: 'text-2xl md:text-3xl font-bold text-blue-600 mb-2', key: 'number' }, '1,234'),
        React.createElement('p', { className: 'text-gray-600 text-sm md:text-base', key: 'label' }, 'Пользователи')
      ]),
      React.createElement('div', { className: 'bg-white border rounded-lg p-6 text-center', key: '2' }, [
        React.createElement('div', { className: 'text-2xl md:text-3xl font-bold text-green-600 mb-2', key: 'number' }, '567'),
        React.createElement('p', { className: 'text-gray-600 text-sm md:text-base', key: 'label' }, 'Продажи')
      ])
    ])
  },
  {
    name: 'Адаптивное видео',
    code: 'aspect-video w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl',
    component: React.createElement('div', { className: 'bg-gray-100 rounded-lg p-4' }, [
      React.createElement('div', { className: 'aspect-video w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-gray-800 rounded-lg flex items-center justify-center text-white', key: 'video' }, [
        React.createElement('div', { className: 'text-center', key: 'placeholder' }, [
          React.createElement('div', { className: 'text-4xl mb-2', key: 'icon' }, '▶️'),
          React.createElement('p', { className: 'text-sm', key: 'text' }, 'Адаптивное видео')
        ])
      ])
    ])
  },
  {
    name: 'Адаптивная pricing таблица',
    code: 'grid-cols-1 md:grid-cols-3',
    component: React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-3 gap-6' }, [
      React.createElement('div', { className: 'bg-white border rounded-lg p-6 text-center', key: 'basic' }, [
        React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Базовый'),
        React.createElement('div', { className: 'text-3xl font-bold mb-4', key: 'price' }, '₽99'),
        React.createElement('ul', { className: 'text-sm text-gray-600 space-y-2 mb-6', key: 'features' }, [
          React.createElement('li', { key: '1' }, '✓ 10 проектов'),
          React.createElement('li', { key: '2' }, '✓ Базовая поддержка')
        ]),
        React.createElement('button', { className: 'w-full bg-gray-500 text-white py-2 rounded', key: 'btn' }, 'Выбрать')
      ]),
      React.createElement('div', { className: 'bg-white border-2 border-blue-500 rounded-lg p-6 text-center relative', key: 'pro' }, [
        React.createElement('div', { className: 'absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold', key: 'badge' }, 'ПОПУЛЯРНЫЙ'),
        React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Pro'),
        React.createElement('div', { className: 'text-3xl font-bold mb-4', key: 'price' }, '₽299'),
        React.createElement('ul', { className: 'text-sm text-gray-600 space-y-2 mb-6', key: 'features' }, [
          React.createElement('li', { key: '1' }, '✓ 100 проектов'),
          React.createElement('li', { key: '2' }, '✓ Приоритетная поддержка')
        ]),
        React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded', key: 'btn' }, 'Выбрать')
      ]),
      React.createElement('div', { className: 'bg-white border rounded-lg p-6 text-center', key: 'enterprise' }, [
        React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Enterprise'),
        React.createElement('div', { className: 'text-3xl font-bold mb-4', key: 'price' }, '₽999'),
        React.createElement('ul', { className: 'text-sm text-gray-600 space-y-2 mb-6', key: 'features' }, [
          React.createElement('li', { key: '1' }, '✓ Безлимит проектов'),
          React.createElement('li', { key: '2' }, '✓ Персональный менеджер')
        ]),
        React.createElement('button', { className: 'w-full bg-gray-500 text-white py-2 rounded', key: 'btn' }, 'Связаться')
      ])
    ])
  },
  {
    name: 'Адаптивный profile card',
    code: 'flex-col sm:flex-row items-center sm:items-start',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-6' }, [
      React.createElement('div', { className: 'flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4', key: 'profile' }, [
        React.createElement('div', { className: 'w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl', key: 'avatar' }, 'АБ'),
        React.createElement('div', { className: 'text-center sm:text-left', key: 'info' }, [
          React.createElement('h3', { className: 'font-bold text-lg', key: 'name' }, 'Анна Борисова'),
          React.createElement('p', { className: 'text-gray-600', key: 'role' }, 'UI/UX Designer'),
          React.createElement('p', { className: 'text-sm text-gray-500 mt-2', key: 'location' }, 'Москва, Россия')
        ]),
        React.createElement('div', { className: 'flex sm:ml-auto space-x-2', key: 'actions' }, [
          React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600', key: 'follow' }, 'Подписаться'),
          React.createElement('button', { className: 'bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200', key: 'message' }, 'Сообщение')
        ])
      ])
    ])
  },
  {
    name: 'Адаптивные кнопки',
    code: 'flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-6' }, [
      React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Действия с товаром'),
      React.createElement('div', { className: 'flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2', key: 'buttons' }, [
        React.createElement('button', { className: 'flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600', key: 'primary' }, 'Добавить в корзину'),
        React.createElement('button', { className: 'flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200', key: 'secondary' }, 'В избранное'),
        React.createElement('button', { className: 'sm:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600', key: 'action' }, 'Купить сейчас')
      ])
    ])
  },
  {
    name: 'Адаптивная timeline',
    code: 'space-y-6 md:space-y-0 md:flex md:space-x-8',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-6' }, [
      React.createElement('h3', { className: 'font-bold mb-6', key: 'title' }, 'История заказа'),
      React.createElement('div', { className: 'space-y-6 md:space-y-0 md:flex md:space-x-8', key: 'timeline' }, [
        React.createElement('div', { className: 'flex md:flex-col items-center md:items-center text-center', key: '1' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2', key: 'icon' }, '✓'),
          React.createElement('div', { key: 'content' }, [
            React.createElement('p', { className: 'font-medium', key: 'status' }, 'Заказ создан'),
            React.createElement('p', { className: 'text-sm text-gray-500', key: 'time' }, '10:00')
          ])
        ]),
        React.createElement('div', { className: 'flex md:flex-col items-center md:items-center text-center', key: '2' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2', key: 'icon' }, '📦'),
          React.createElement('div', { key: 'content' }, [
            React.createElement('p', { className: 'font-medium', key: 'status' }, 'В обработке'),
            React.createElement('p', { className: 'text-sm text-gray-500', key: 'time' }, '11:30')
          ])
        ]),
        React.createElement('div', { className: 'flex md:flex-col items-center md:items-center text-center', key: '3' }, [
          React.createElement('div', { className: 'w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center mr-4 md:mr-0 md:mb-2', key: 'icon' }, '🚚'),
          React.createElement('div', { key: 'content' }, [
            React.createElement('p', { className: 'font-medium text-gray-500', key: 'status' }, 'Доставка'),
            React.createElement('p', { className: 'text-sm text-gray-400', key: 'time' }, 'Ожидание')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Адаптивный dashboard layout',
    code: 'grid-cols-1 lg:grid-cols-4 gap-6',
    component: React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-4 gap-6' }, [
      React.createElement('div', { className: 'lg:col-span-3 space-y-6', key: 'main' }, [
        React.createElement('div', { className: 'bg-white border rounded-lg p-6', key: 'chart' }, [
          React.createElement('h3', { className: 'font-bold mb-4', key: 'title' }, 'Аналитика'),
          React.createElement('div', { className: 'h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-center justify-center text-white', key: 'content' }, 'График')
        ]),
        React.createElement('div', { className: 'grid grid-cols-1 sm:grid-cols-2 gap-4', key: 'stats' }, [
          React.createElement('div', { className: 'bg-white border rounded-lg p-4', key: 'stat1' }, [
            React.createElement('h4', { className: 'font-medium text-gray-600', key: 'label' }, 'Продажи'),
            React.createElement('p', { className: 'text-2xl font-bold', key: 'value' }, '₽15,432')
          ]),
          React.createElement('div', { className: 'bg-white border rounded-lg p-4', key: 'stat2' }, [
            React.createElement('h4', { className: 'font-medium text-gray-600', key: 'label' }, 'Заказы'),
            React.createElement('p', { className: 'text-2xl font-bold', key: 'value' }, '128')
          ])
        ])
      ]),
      React.createElement('div', { className: 'space-y-6', key: 'sidebar' }, [
        React.createElement('div', { className: 'bg-white border rounded-lg p-4', key: 'widget1' }, [
          React.createElement('h4', { className: 'font-bold mb-3', key: 'title' }, 'Активность'),
          React.createElement('div', { className: 'space-y-2', key: 'list' }, [
            React.createElement('p', { className: 'text-sm', key: '1' }, '• Новый заказ'),
            React.createElement('p', { className: 'text-sm', key: '2' }, '• Отзыв клиента')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Адаптивная pagination',
    code: 'flex-col sm:flex-row justify-between items-center',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-4' }, [
      React.createElement('div', { className: 'flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0', key: 'pagination' }, [
        React.createElement('p', { className: 'text-sm text-gray-600', key: 'info' }, 'Показано 1-10 из 50 записей'),
        React.createElement('div', { className: 'flex items-center space-x-1', key: 'controls' }, [
          React.createElement('button', { className: 'px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200', key: 'prev' }, '‹'),
          React.createElement('button', { className: 'px-3 py-2 bg-blue-500 text-white rounded', key: '1' }, '1'),
          React.createElement('button', { className: 'px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200', key: '2' }, '2'),
          React.createElement('span', { className: 'px-2 text-gray-500', key: 'dots' }, '...'),
          React.createElement('button', { className: 'px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200', key: '5' }, '5'),
          React.createElement('button', { className: 'px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200', key: 'next' }, '›')
        ])
      ])
    ])
  },
  {
    name: 'Адаптивные social icons',
    code: 'flex-wrap justify-center sm:justify-start',
    component: React.createElement('div', { className: 'bg-white border rounded-lg p-6' }, [
      React.createElement('h3', { className: 'font-bold mb-4 text-center sm:text-left', key: 'title' }, 'Следите за нами'),
      React.createElement('div', { className: 'flex flex-wrap justify-center sm:justify-start gap-3', key: 'icons' }, [
        React.createElement('a', { className: 'w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600', key: 'vk' }, 'VK'),
        React.createElement('a', { className: 'w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500', key: 'tg' }, 'TG'),
        React.createElement('a', { className: 'w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600', key: 'wa' }, 'WA'),
        React.createElement('a', { className: 'w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600', key: 'yt' }, 'YT')
      ])
    ])
  },
  {
    name: 'Адаптивная contact form',
    code: 'grid-cols-1 md:grid-cols-2 gap-6',
    component: React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
      React.createElement('div', { className: 'space-y-4', key: 'form' }, [
        React.createElement('h3', { className: 'font-bold text-xl mb-4', key: 'title' }, 'Свяжитесь с нами'),
        React.createElement('input', { type: 'text', placeholder: 'Имя', className: 'w-full border rounded px-3 py-2', key: 'name' }),
        React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full border rounded px-3 py-2', key: 'email' }),
        React.createElement('textarea', { placeholder: 'Сообщение', rows: 4, className: 'w-full border rounded px-3 py-2 resize-none', key: 'message' }),
        React.createElement('button', { className: 'w-full sm:w-auto bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600', key: 'submit' }, 'Отправить')
      ]),
      React.createElement('div', { className: 'bg-gray-100 rounded-lg p-6', key: 'info' }, [
        React.createElement('h4', { className: 'font-bold mb-4', key: 'title' }, 'Контактная информация'),
        React.createElement('div', { className: 'space-y-3 text-sm', key: 'details' }, [
          React.createElement('p', { key: 'phone' }, '📞 +7 (999) 123-45-67'),
          React.createElement('p', { key: 'email' }, '✉️ info@example.com'),
          React.createElement('p', { key: 'address' }, '📍 Москва, ул. Примерная, 123')
        ])
      ])
    ])
  }
] 