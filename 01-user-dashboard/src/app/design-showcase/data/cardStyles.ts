import React from 'react'

export const cardStyles = [
  {
    name: 'Стеклянная карточка',
    code: 'ts-card-glass',
    component: React.createElement('div', { className: 'ts-card-glass' }, [
      React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Стеклянная карточка'),
      React.createElement('p', { className: 'text-sm mt-2', key: 'desc' }, 'С эффектом размытия')
    ])
  },
  {
    name: 'Неоморфная карточка',
    code: 'ts-card-neumorphic',
    component: React.createElement('div', { className: 'ts-card-neumorphic' }, [
      React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Неоморфная карточка'),
      React.createElement('p', { className: 'text-sm mt-2', key: 'desc' }, 'Мягкие тени')
    ])
  },
  {
    name: 'Градиентная карточка',
    code: 'bg-gradient-to-br from-purple-400 to-pink-600 text-white p-6 rounded-xl shadow-lg',
    component: React.createElement('div', { 
      className: 'bg-gradient-to-br from-purple-400 to-pink-600 text-white p-6 rounded-xl shadow-lg' 
    }, [
      React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Градиентная карточка'),
      React.createElement('p', { className: 'text-sm mt-2 text-white/90', key: 'desc' }, 'Красивый градиент')
    ])
  },
  {
    name: 'Карточка продукта',
    code: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow' 
    }, [
      React.createElement('div', { className: 'h-32 bg-gradient-to-r from-blue-400 to-purple-500', key: 'image' }),
      React.createElement('div', { className: 'p-4', key: 'content' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Карточка продукта'),
        React.createElement('p', { className: 'text-sm mt-1 text-gray-600', key: 'price' }, '$99.99')
      ])
    ])
  },
  {
    name: 'Карточка статистики',
    code: 'bg-white rounded-xl shadow-lg p-6 text-center',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 text-center' 
    }, [
      React.createElement('div', { className: 'text-3xl font-bold text-blue-600', key: 'stat' }, '1,234'),
      React.createElement('p', { className: 'text-sm text-gray-600', key: 'label' }, 'Пользователи')
    ])
  },
  {
    name: 'Карточка с тенью',
    code: 'bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-shadow duration-300' 
    }, [
      React.createElement('h3', { className: 'font-bold text-gray-800', key: 'title' }, 'Глубокая тень'),
      React.createElement('p', { className: 'text-sm mt-2 text-gray-600', key: 'desc' }, 'Эффект парения')
    ])
  },
  {
    name: 'Карточка профиля',
    code: 'bg-white rounded-xl shadow-lg p-6 text-center',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 text-center' 
    }, [
      React.createElement('div', { className: 'w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-4', key: 'avatar' }),
      React.createElement('h3', { className: 'font-bold', key: 'name' }, 'Иван Иванов'),
      React.createElement('p', { className: 'text-sm text-gray-600', key: 'role' }, 'Разработчик')
    ])
  },
  {
    name: 'Карточка с границей',
    code: 'bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors',
    component: React.createElement('div', { 
      className: 'bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors' 
    }, [
      React.createElement('h3', { className: 'font-bold text-blue-700', key: 'title' }, 'С границей'),
      React.createElement('p', { className: 'text-sm mt-2 text-gray-600', key: 'desc' }, 'Цветная рамка')
    ])
  },
  {
    name: 'Темная карточка',
    code: 'bg-gray-900 text-white rounded-xl p-6 shadow-lg',
    component: React.createElement('div', { 
      className: 'bg-gray-900 text-white rounded-xl p-6 shadow-lg' 
    }, [
      React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Темная карточка'),
      React.createElement('p', { className: 'text-sm mt-2 text-gray-300', key: 'desc' }, 'Ночная тема')
    ])
  },
  {
    name: 'Карточка уведомления',
    code: 'bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg',
    component: React.createElement('div', { 
      className: 'bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg' 
    }, [
      React.createElement('h3', { className: 'font-bold text-yellow-800', key: 'title' }, '⚠️ Внимание'),
      React.createElement('p', { className: 'text-sm mt-1 text-yellow-700', key: 'desc' }, 'Важное уведомление')
    ])
  },
  {
    name: 'Минималистичная карточка',
    code: 'bg-white border border-gray-100 rounded-lg p-6 hover:bg-gray-50 transition-colors',
    component: React.createElement('div', { 
      className: 'bg-white border border-gray-100 rounded-lg p-6 hover:bg-gray-50 transition-colors' 
    }, [
      React.createElement('h3', { className: 'font-semibold text-gray-800', key: 'title' }, 'Минимализм'),
      React.createElement('p', { className: 'text-sm mt-2 text-gray-500', key: 'desc' }, 'Простота и элегантность')
    ])
  },
  {
    name: 'Карточка успеха',
    code: 'bg-green-50 border border-green-200 rounded-xl p-6',
    component: React.createElement('div', { 
      className: 'bg-green-50 border border-green-200 rounded-xl p-6' 
    }, [
      React.createElement('h3', { className: 'font-bold text-green-800', key: 'title' }, '✅ Успех'),
      React.createElement('p', { className: 'text-sm mt-2 text-green-600', key: 'desc' }, 'Операция выполнена')
    ])
  },
  {
    name: 'Карточка ошибки',
    code: 'bg-red-50 border border-red-200 rounded-xl p-6',
    component: React.createElement('div', { 
      className: 'bg-red-50 border border-red-200 rounded-xl p-6' 
    }, [
      React.createElement('h3', { className: 'font-bold text-red-800', key: 'title' }, '❌ Ошибка'),
      React.createElement('p', { className: 'text-sm mt-2 text-red-600', key: 'desc' }, 'Что-то пошло не так')
    ])
  },
  {
    name: 'Карточка с иконкой',
    code: 'bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4' 
    }, [
      React.createElement('div', { className: 'w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold', key: 'icon' }, '🎯'),
      React.createElement('div', { key: 'content' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'С иконкой'),
        React.createElement('p', { className: 'text-sm mt-1 text-gray-600', key: 'desc' }, 'Визуальный акцент')
      ])
    ])
  },
  {
    name: 'Интерактивная карточка',
    code: 'bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer' 
    }, [
      React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Интерактивная'),
      React.createElement('p', { className: 'text-sm mt-2 text-gray-600', key: 'desc' }, 'Наведите курсор')
    ])
  },
  {
    name: 'Карточка с кнопкой',
    code: 'bg-white rounded-xl shadow-lg p-6 space-y-4',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 space-y-4' 
    }, [
      React.createElement('div', { key: 'content' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'С действием'),
        React.createElement('p', { className: 'text-sm mt-2 text-gray-600', key: 'desc' }, 'Карточка с CTA')
      ]),
      React.createElement('button', { className: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors', key: 'button' }, 'Действие')
    ])
  },
  {
    name: 'Карточка цены',
    code: 'bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent hover:border-blue-200 transition-colors',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 text-center border-2 border-transparent hover:border-blue-200 transition-colors' 
    }, [
      React.createElement('h3', { className: 'font-bold text-lg', key: 'title' }, 'Pro Plan'),
      React.createElement('div', { className: 'text-3xl font-bold text-blue-600 my-4', key: 'price' }, '$29'),
      React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'в месяц')
    ])
  },
  {
    name: 'Карточка отзыва',
    code: 'bg-gray-50 rounded-xl p-6 border-l-4 border-blue-400',
    component: React.createElement('div', { 
      className: 'bg-gray-50 rounded-xl p-6 border-l-4 border-blue-400' 
    }, [
      React.createElement('p', { className: 'text-gray-700 italic mb-4', key: 'quote' }, '"Отличный продукт!"'),
      React.createElement('div', { className: 'flex items-center space-x-2', key: 'author' }, [
        React.createElement('div', { className: 'w-8 h-8 bg-blue-400 rounded-full', key: 'avatar' }),
        React.createElement('span', { className: 'text-sm font-medium text-gray-800', key: 'name' }, 'Анна К.')
      ])
    ])
  },
  {
    name: 'Карточка галереи',
    code: 'bg-white rounded-xl shadow-lg overflow-hidden',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg overflow-hidden' 
    }, [
      React.createElement('div', { className: 'h-40 bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600', key: 'image' }),
      React.createElement('div', { className: 'p-4', key: 'content' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Изображение'),
        React.createElement('p', { className: 'text-sm mt-1 text-gray-600', key: 'desc' }, 'Красивая картинка')
      ])
    ])
  },
  {
    name: 'Карточка метрики',
    code: 'bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-400',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-400' 
    }, [
      React.createElement('div', { className: 'flex items-center justify-between', key: 'header' }, [
        React.createElement('h3', { className: 'font-bold text-gray-800', key: 'title' }, 'Продажи'),
        React.createElement('span', { className: 'text-green-500 text-sm font-medium', key: 'change' }, '+12%')
      ]),
      React.createElement('div', { className: 'text-2xl font-bold text-gray-900 mt-2', key: 'value' }, '₽89,432')
    ])
  },
  {
    name: 'Карточка с видео превью',
    code: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow' 
    }, [
      React.createElement('div', { className: 'relative h-32 bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center', key: 'video' }, [
        React.createElement('div', { className: 'w-12 h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center', key: 'play' }, '▶')
      ]),
      React.createElement('div', { className: 'p-4', key: 'content' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Видео превью'),
        React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Карточка с видео контентом')
      ])
    ])
  },
  {
    name: 'Карточка события',
    code: 'bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl p-6',
    component: React.createElement('div', { 
      className: 'bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl p-6' 
    }, [
      React.createElement('div', { className: 'flex items-center justify-between mb-3', key: 'header' }, [
        React.createElement('span', { className: 'text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded', key: 'date' }, '15 МАР'),
        React.createElement('span', { className: 'text-xs', key: 'time' }, '19:00')
      ]),
      React.createElement('h3', { className: 'font-bold text-lg', key: 'title' }, 'Мероприятие'),
      React.createElement('p', { className: 'text-white/90 text-sm', key: 'desc' }, 'Описание события')
    ])
  },
  {
    name: 'Карточка достижения',
    code: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-6 text-center',
    component: React.createElement('div', { 
      className: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-6 text-center' 
    }, [
      React.createElement('div', { className: 'text-4xl mb-3', key: 'icon' }, '🏆'),
      React.createElement('h3', { className: 'font-bold text-lg mb-2', key: 'title' }, 'Золотой уровень'),
      React.createElement('p', { className: 'text-white/90 text-sm', key: 'desc' }, '1000+ баллов')
    ])
  },
  {
    name: 'Карточка погоды',
    code: 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl p-6',
    component: React.createElement('div', { 
      className: 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-xl p-6' 
    }, [
      React.createElement('div', { className: 'flex items-center justify-between', key: 'main' }, [
        React.createElement('div', { key: 'info' }, [
          React.createElement('h3', { className: 'font-bold text-lg', key: 'city' }, 'Москва'),
          React.createElement('p', { className: 'text-white/90', key: 'desc' }, 'Солнечно')
        ]),
        React.createElement('div', { className: 'text-right', key: 'temp' }, [
          React.createElement('div', { className: 'text-3xl font-bold', key: 'value' }, '+22°'),
          React.createElement('div', { className: 'text-sm opacity-75', key: 'feels' }, 'Ощущается +25°')
        ])
      ])
    ])
  },
  {
    name: 'Карточка контакта',
    code: 'bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors',
    component: React.createElement('div', { 
      className: 'bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors' 
    }, [
      React.createElement('div', { className: 'flex items-center space-x-4', key: 'content' }, [
        React.createElement('div', { className: 'w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold', key: 'avatar' }, 'МИ'),
        React.createElement('div', { key: 'info' }, [
          React.createElement('h3', { className: 'font-bold', key: 'name' }, 'Мария Иванова'),
          React.createElement('p', { className: 'text-sm text-gray-600', key: 'role' }, 'Менеджер проектов'),
          React.createElement('p', { className: 'text-xs text-gray-500', key: 'email' }, 'maria@company.com')
        ])
      ])
    ])
  },
  {
    name: 'Карточка прогресса',
    code: 'bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500' 
    }, [
      React.createElement('div', { className: 'flex items-center justify-between mb-4', key: 'header' }, [
        React.createElement('h3', { className: 'font-bold', key: 'title' }, 'Выполнение плана'),
        React.createElement('span', { className: 'text-green-600 font-bold', key: 'percent' }, '75%')
      ]),
      React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-3', key: 'progress' }, [
        React.createElement('div', { className: 'bg-green-500 h-3 rounded-full w-3/4', key: 'bar' })
      ]),
      React.createElement('p', { className: 'text-sm text-gray-600 mt-2', key: 'desc' }, '3 из 4 задач выполнено')
    ])
  },
  {
    name: 'Карточка с тегами',
    code: 'bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow' 
    }, [
      React.createElement('h3', { className: 'font-bold text-lg mb-3', key: 'title' }, 'Статья'),
      React.createElement('p', { className: 'text-gray-600 text-sm mb-4', key: 'desc' }, 'Описание статьи с полезной информацией'),
      React.createElement('div', { className: 'flex flex-wrap gap-2', key: 'tags' }, [
        React.createElement('span', { className: 'px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full', key: '1' }, 'JavaScript'),
        React.createElement('span', { className: 'px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full', key: '2' }, 'React'),
        React.createElement('span', { className: 'px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full', key: '3' }, 'UI/UX')
      ])
    ])
  },
  {
    name: 'Карточка подписки',
    code: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 relative overflow-hidden',
    component: React.createElement('div', { 
      className: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 relative overflow-hidden' 
    }, [
      React.createElement('div', { className: 'absolute top-0 right-0 bg-yellow-400 text-purple-900 px-3 py-1 text-xs font-bold', key: 'badge' }, 'POPULAR'),
      React.createElement('h3', { className: 'font-bold text-xl mb-2', key: 'title' }, 'Premium'),
      React.createElement('div', { className: 'text-3xl font-bold mb-4', key: 'price' }, [
        React.createElement('span', { key: 'amount' }, '₽999'),
        React.createElement('span', { className: 'text-lg font-normal opacity-75', key: 'period' }, '/мес')
      ]),
      React.createElement('ul', { className: 'space-y-2 text-sm', key: 'features' }, [
        React.createElement('li', { key: '1' }, '✓ Безлимитные проекты'),
        React.createElement('li', { key: '2' }, '✓ Приоритетная поддержка'),
        React.createElement('li', { key: '3' }, '✓ Аналитика и отчеты')
      ])
    ])
  },
  {
    name: 'Карточка файла',
    code: 'bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer',
    component: React.createElement('div', { 
      className: 'bg-white border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors cursor-pointer' 
    }, [
      React.createElement('div', { className: 'flex items-center space-x-3', key: 'content' }, [
        React.createElement('div', { className: 'w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-xs font-bold', key: 'icon' }, 'PDF'),
        React.createElement('div', { className: 'flex-1', key: 'info' }, [
          React.createElement('h3', { className: 'font-medium', key: 'name' }, 'Презентация.pdf'),
          React.createElement('p', { className: 'text-sm text-gray-500', key: 'size' }, '2.4 MB • 5 страниц')
        ])
      ])
    ])
  },
  {
    name: 'Карточка новости',
    code: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow',
    component: React.createElement('div', { 
      className: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow' 
    }, [
      React.createElement('div', { className: 'h-32 bg-gradient-to-r from-green-400 to-blue-500', key: 'image' }),
      React.createElement('div', { className: 'p-4', key: 'content' }, [
        React.createElement('div', { className: 'flex items-center justify-between mb-2', key: 'meta' }, [
          React.createElement('span', { className: 'text-xs text-blue-600 font-medium', key: 'category' }, 'ТЕХНОЛОГИИ'),
          React.createElement('span', { className: 'text-xs text-gray-500', key: 'date' }, '2 часа назад')
        ]),
        React.createElement('h3', { className: 'font-bold text-sm', key: 'title' }, 'Новости технологий'),
        React.createElement('p', { className: 'text-xs text-gray-600 mt-1', key: 'desc' }, 'Краткое описание новости')
      ])
    ])
  }
] 