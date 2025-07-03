import React from 'react'

export const modalStyles = [
  {
    name: 'Классическое модальное окно',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'flex items-center justify-between mb-4', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Заголовок'),
          React.createElement('button', { className: 'text-gray-400 hover:text-gray-600', key: 'close' }, '✕')
        ]),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'content' }, 'Содержимое модального окна'),
        React.createElement('div', { className: 'flex justify-end space-x-3', key: 'footer' }, [
          React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'confirm' }, 'Подтвердить')
        ])
      ])
    ])
  },
  {
    name: 'Полноэкранное модальное окно',
    code: 'fixed inset-0 bg-white z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-white z-50 overflow-auto' }, [
      React.createElement('div', { className: 'p-6', key: 'container' }, [
        React.createElement('div', { className: 'flex items-center justify-between mb-6', key: 'header' }, [
          React.createElement('h1', { className: 'text-2xl font-bold', key: 'title' }, 'Полноэкранное окно'),
          React.createElement('button', { className: 'text-gray-400 hover:text-gray-600 text-xl', key: 'close' }, '✕')
        ]),
        React.createElement('div', { className: 'prose max-w-none', key: 'content' }, [
          React.createElement('p', { key: 'p1' }, 'Содержимое полноэкранного модального окна.'),
          React.createElement('p', { key: 'p2' }, 'Больше контента...')
        ])
      ])
    ])
  },
  {
    name: 'Боковая панель',
    code: 'fixed inset-y-0 right-0 bg-white shadow-2xl z-50 w-96',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-30 z-50' }, [
      React.createElement('div', { className: 'fixed inset-y-0 right-0 bg-white shadow-2xl w-96 p-6', key: 'sidebar' }, [
        React.createElement('div', { className: 'flex items-center justify-between mb-6', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Боковая панель'),
          React.createElement('button', { className: 'text-gray-400 hover:text-gray-600', key: 'close' }, '✕')
        ]),
        React.createElement('div', { className: 'space-y-4', key: 'content' }, [
          React.createElement('p', { key: 'p' }, 'Содержимое боковой панели'),
          React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600', key: 'btn' }, 'Действие')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно с размытием',
    code: 'fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border border-white/20', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'Стеклянное окно'),
        React.createElement('p', { className: 'text-gray-700 mb-6', key: 'content' }, 'Модальное окно с эффектом размытия'),
        React.createElement('button', { className: 'w-full bg-blue-500/80 text-white py-2 rounded-lg hover:bg-blue-600/80', key: 'btn' }, 'Закрыть')
      ])
    ])
  },
  {
    name: 'Модальное окно снизу',
    code: 'fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 z-50' }, [
      React.createElement('div', { className: 'fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-2xl p-6', key: 'modal' }, [
        React.createElement('div', { className: 'w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4', key: 'handle' }),
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'Нижняя панель'),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'content' }, 'Модальное окно, выдвигающееся снизу'),
        React.createElement('button', { className: 'w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600', key: 'btn' }, 'Действие')
      ])
    ])
  },
  {
    name: 'Предупреждение',
    code: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('div', { className: 'w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4', key: 'icon' }, '⚠️'),
        React.createElement('h3', { className: 'text-lg font-semibold mb-2', key: 'title' }, 'Внимание!'),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'content' }, 'Вы уверены, что хотите продолжить?'),
        React.createElement('div', { className: 'flex space-x-3', key: 'buttons' }, [
          React.createElement('button', { className: 'flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'flex-1 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600', key: 'confirm' }, 'Продолжить')
        ])
      ])
    ])
  },
  {
    name: 'Ошибка',
    code: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('div', { className: 'w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4', key: 'icon' }, '❌'),
        React.createElement('h3', { className: 'text-lg font-semibold text-red-800 mb-2', key: 'title' }, 'Ошибка'),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'content' }, 'Что-то пошло не так. Попробуйте еще раз.'),
        React.createElement('button', { className: 'w-full bg-red-500 text-white py-2 rounded hover:bg-red-600', key: 'btn' }, 'Понятно')
      ])
    ])
  },
  {
    name: 'Успех',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('div', { className: 'w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4', key: 'icon' }, '✅'),
        React.createElement('h3', { className: 'text-lg font-semibold text-green-800 mb-2', key: 'title' }, 'Успешно!'),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'content' }, 'Операция выполнена успешно.'),
        React.createElement('button', { className: 'w-full bg-green-500 text-white py-2 rounded hover:bg-green-600', key: 'btn' }, 'Отлично')
      ])
    ])
  },
  {
    name: 'Галерея изображений',
    code: 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'relative max-w-4xl w-full mx-4', key: 'container' }, [
        React.createElement('button', { className: 'absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10', key: 'close' }, '✕'),
        React.createElement('div', { className: 'bg-gray-200 aspect-video rounded-lg flex items-center justify-center', key: 'image' }, [
          React.createElement('span', { className: 'text-gray-500 text-xl', key: 'placeholder' }, '🖼️ Изображение')
        ]),
        React.createElement('div', { className: 'flex justify-between items-center mt-4', key: 'controls' }, [
          React.createElement('button', { className: 'text-white hover:text-gray-300', key: 'prev' }, '← Предыдущее'),
          React.createElement('span', { className: 'text-white', key: 'counter' }, '1 / 5'),
          React.createElement('button', { className: 'text-white hover:text-gray-300', key: 'next' }, 'Следующее →')
        ])
      ])
    ])
  },
  {
    name: 'Форма в модальном окне',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'Обратная связь'),
        React.createElement('div', { className: 'space-y-4', key: 'form' }, [
          React.createElement('input', { type: 'text', placeholder: 'Ваше имя', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'name' }),
          React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'email' }),
          React.createElement('textarea', { placeholder: 'Сообщение', rows: 4, className: 'w-full border border-gray-300 rounded px-3 py-2 resize-none', key: 'message' }),
          React.createElement('div', { className: 'flex justify-end space-x-3', key: 'buttons' }, [
            React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
            React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'submit' }, 'Отправить')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Видео плеер',
    code: 'fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'relative max-w-4xl w-full mx-4', key: 'container' }, [
        React.createElement('button', { className: 'absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10', key: 'close' }, '✕'),
        React.createElement('div', { className: 'bg-gray-900 aspect-video rounded-lg flex items-center justify-center', key: 'video' }, [
          React.createElement('button', { className: 'w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl hover:bg-opacity-30', key: 'play' }, '▶')
        ]),
        React.createElement('div', { className: 'mt-4 text-white', key: 'info' }, [
          React.createElement('h4', { className: 'font-semibold', key: 'title' }, 'Название видео'),
          React.createElement('p', { className: 'text-sm text-gray-300', key: 'desc' }, 'Описание видео')
        ])
      ])
    ])
  },
  {
    name: 'Тултип большой',
    code: 'absolute bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 max-w-xs',
    component: React.createElement('div', { className: 'relative inline-block' }, [
      React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600', key: 'trigger' }, 'Наведите курсор'),
      React.createElement('div', { className: 'absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white p-4 rounded-lg shadow-xl max-w-xs', key: 'tooltip' }, [
        React.createElement('h4', { className: 'font-semibold mb-2', key: 'title' }, 'Подсказка'),
        React.createElement('p', { className: 'text-sm', key: 'content' }, 'Детальная информация в большом тултипе с дополнительным контентом.'),
        React.createElement('div', { className: 'absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900', key: 'arrow' })
      ])
    ])
  },
  {
    name: 'Модальное окно загрузки',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-8 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('div', { className: 'w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4', key: 'spinner' }),
        React.createElement('h3', { className: 'text-lg font-semibold mb-2', key: 'title' }, 'Загрузка...'),
        React.createElement('p', { className: 'text-gray-600 mb-4', key: 'content' }, 'Пожалуйста, подождите'),
        React.createElement('div', { className: 'w-full bg-gray-200 rounded-full h-2', key: 'progress' }, [
          React.createElement('div', { className: 'bg-blue-500 h-2 rounded-full w-3/4', key: 'bar' })
        ])
      ])
    ])
  },
  {
    name: 'Выбор даты',
    code: 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'Выберите дату'),
        React.createElement('div', { className: 'grid grid-cols-7 gap-1 mb-4', key: 'calendar' }, [
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'mon' }, 'Пн'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'tue' }, 'Вт'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'wed' }, 'Ср'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'thu' }, 'Чт'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'fri' }, 'Пт'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'sat' }, 'Сб'),
          React.createElement('div', { className: 'text-center text-sm font-medium text-gray-500 p-2', key: 'sun' }, 'Вс')
        ]),
        React.createElement('div', { className: 'grid grid-cols-7 gap-1 mb-4', key: 'dates' }, 
          Array.from({ length: 14 }, (_, i) => 
            React.createElement('button', { 
              className: i === 7 ? 'text-center p-2 bg-blue-500 text-white rounded' : 'text-center p-2 hover:bg-gray-100 rounded', 
              key: i 
            }, String(i + 1))
          )
        ),
        React.createElement('div', { className: 'flex justify-end space-x-3', key: 'buttons' }, [
          React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'confirm' }, 'Выбрать')
        ])
      ])
    ])
  },
  {
    name: 'Всплывающее меню',
    code: 'absolute bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2',
    component: React.createElement('div', { className: 'relative inline-block' }, [
      React.createElement('button', { className: 'bg-gray-100 border border-gray-300 px-4 py-2 rounded hover:bg-gray-200', key: 'trigger' }, 'Открыть меню'),
      React.createElement('div', { className: 'absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 w-48', key: 'menu' }, [
        React.createElement('a', { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', key: '1' }, '📝 Редактировать'),
        React.createElement('a', { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', key: '2' }, '📋 Копировать'),
        React.createElement('a', { className: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100', key: '3' }, '📤 Поделиться'),
        React.createElement('hr', { className: 'my-1', key: 'divider' }),
        React.createElement('a', { className: 'block px-4 py-2 text-sm text-red-600 hover:bg-red-50', key: '4' }, '🗑️ Удалить')
      ])
    ])
  },
  {
    name: 'Модальное окно с вкладками',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl max-w-lg w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'flex items-center justify-between p-4 border-b', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Настройки'),
          React.createElement('button', { className: 'text-gray-400 hover:text-gray-600', key: 'close' }, '✕')
        ]),
        React.createElement('div', { className: 'flex border-b', key: 'tabs' }, [
          React.createElement('button', { className: 'px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600', key: 'tab1' }, 'Общие'),
          React.createElement('button', { className: 'px-4 py-2 font-medium text-gray-600 hover:text-gray-800', key: 'tab2' }, 'Уведомления'),
          React.createElement('button', { className: 'px-4 py-2 font-medium text-gray-600 hover:text-gray-800', key: 'tab3' }, 'Безопасность')
        ]),
        React.createElement('div', { className: 'p-4', key: 'content' }, [
          React.createElement('div', { className: 'space-y-4', key: 'form' }, [
            React.createElement('div', { key: '1' }, [
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1', key: 'label' }, 'Имя'),
              React.createElement('input', { type: 'text', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'input' })
            ]),
            React.createElement('div', { key: '2' }, [
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-1', key: 'label' }, 'Email'),
              React.createElement('input', { type: 'email', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'input' })
            ])
          ])
        ]),
        React.createElement('div', { className: 'flex justify-end space-x-3 p-4 border-t', key: 'footer' }, [
          React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'save' }, 'Сохранить')
        ])
      ])
    ])
  },
  {
    name: 'Уведомление toast',
    code: 'fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4',
    component: React.createElement('div', { className: 'fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 max-w-sm' }, [
      React.createElement('div', { className: 'flex items-start', key: 'content' }, [
        React.createElement('div', { className: 'w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3', key: 'icon' }, '✓'),
        React.createElement('div', { className: 'flex-1', key: 'text' }, [
          React.createElement('h4', { className: 'font-semibold text-gray-900', key: 'title' }, 'Успешно!'),
          React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Данные сохранены')
        ]),
        React.createElement('button', { className: 'text-gray-400 hover:text-gray-600 ml-2', key: 'close' }, '✕')
      ])
    ])
  },
  {
    name: 'Подтверждение действия',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'text-center', key: 'content' }, [
          React.createElement('div', { className: 'w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4', key: 'icon' }, '🗑️'),
          React.createElement('h3', { className: 'text-lg font-semibold mb-2', key: 'title' }, 'Удалить элемент?'),
          React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, 'Это действие нельзя будет отменить. Элемент будет удален навсегда.')
        ]),
        React.createElement('div', { className: 'flex space-x-3', key: 'buttons' }, [
          React.createElement('button', { className: 'flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600', key: 'delete' }, 'Удалить')
        ])
      ])
    ])
  },
  {
    name: 'Информационная панель',
    code: 'fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50',
    component: React.createElement('div', { className: 'fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 z-50' }, [
      React.createElement('div', { className: 'max-w-4xl mx-auto flex items-center justify-between', key: 'content' }, [
        React.createElement('div', { className: 'flex items-center', key: 'info' }, [
          React.createElement('div', { className: 'w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3', key: 'icon' }, 'ℹ'),
          React.createElement('p', { key: 'text' }, 'Новое обновление доступно для загрузки')
        ]),
        React.createElement('div', { className: 'flex items-center space-x-4', key: 'actions' }, [
          React.createElement('button', { className: 'text-white hover:text-blue-100', key: 'update' }, 'Обновить'),
          React.createElement('button', { className: 'text-white hover:text-blue-100', key: 'close' }, '✕')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно покупки',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'Подтвердите покупку'),
        React.createElement('div', { className: 'border rounded-lg p-4 mb-4', key: 'product' }, [
          React.createElement('div', { className: 'flex items-center space-x-3', key: 'item' }, [
            React.createElement('div', { className: 'w-12 h-12 bg-blue-200 rounded', key: 'image' }),
            React.createElement('div', { key: 'info' }, [
              React.createElement('h4', { className: 'font-medium', key: 'name' }, 'Товар'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'price' }, '₽1,299')
            ])
          ])
        ]),
        React.createElement('div', { className: 'flex justify-between text-lg font-bold mb-6', key: 'total' }, [
          React.createElement('span', { key: 'label' }, 'Итого:'),
          React.createElement('span', { key: 'amount' }, '₽1,299')
        ]),
        React.createElement('div', { className: 'flex space-x-3', key: 'buttons' }, [
          React.createElement('button', { className: 'flex-1 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600', key: 'buy' }, 'Купить')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно поиска',
    code: 'fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-20 z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center pt-20 z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'p-4 border-b', key: 'search' }, [
          React.createElement('div', { className: 'relative', key: 'input-wrapper' }, [
            React.createElement('input', { type: 'text', placeholder: 'Поиск...', className: 'w-full pl-10 pr-4 py-3 text-lg border-0 focus:outline-none', key: 'input' }),
            React.createElement('div', { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400', key: 'icon' }, '🔍')
          ])
        ]),
        React.createElement('div', { className: 'max-h-96 overflow-y-auto', key: 'results' }, [
          React.createElement('div', { className: 'p-4 hover:bg-gray-50 cursor-pointer border-b', key: '1' }, [
            React.createElement('h4', { className: 'font-medium', key: 'title' }, 'Результат поиска 1'),
            React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Описание результата')
          ]),
          React.createElement('div', { className: 'p-4 hover:bg-gray-50 cursor-pointer border-b', key: '2' }, [
            React.createElement('h4', { className: 'font-medium', key: 'title' }, 'Результат поиска 2'),
            React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Описание результата')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно рейтинга',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-2', key: 'title' }, 'Оцените наш сервис'),
        React.createElement('p', { className: 'text-gray-600 mb-6', key: 'desc' }, 'Ваше мнение важно для нас'),
        React.createElement('div', { className: 'flex justify-center space-x-2 mb-6', key: 'stars' }, [
          React.createElement('span', { className: 'text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '1' }, '★'),
          React.createElement('span', { className: 'text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '2' }, '★'),
          React.createElement('span', { className: 'text-3xl text-yellow-400 cursor-pointer hover:text-yellow-500', key: '3' }, '★'),
          React.createElement('span', { className: 'text-3xl text-gray-300 cursor-pointer hover:text-yellow-500', key: '4' }, '★'),
          React.createElement('span', { className: 'text-3xl text-gray-300 cursor-pointer hover:text-yellow-500', key: '5' }, '★')
        ]),
        React.createElement('textarea', { placeholder: 'Оставьте комментарий (необязательно)...', rows: 3, className: 'w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none', key: 'comment' }),
        React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600', key: 'submit' }, 'Отправить отзыв')
      ])
    ])
  },
  {
    name: 'Модальное окно авторизации',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'text-center mb-6', key: 'header' }, [
          React.createElement('h3', { className: 'text-xl font-semibold mb-2', key: 'title' }, 'Войти в аккаунт'),
          React.createElement('p', { className: 'text-gray-600', key: 'subtitle' }, 'Введите свои данные для входа')
        ]),
        React.createElement('div', { className: 'space-y-4', key: 'form' }, [
          React.createElement('input', { type: 'email', placeholder: 'Email', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'email' }),
          React.createElement('input', { type: 'password', placeholder: 'Пароль', className: 'w-full border border-gray-300 rounded px-3 py-2', key: 'password' }),
          React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600', key: 'login' }, 'Войти'),
          React.createElement('div', { className: 'text-center', key: 'divider' }, [
            React.createElement('span', { className: 'text-gray-500 text-sm', key: 'text' }, 'или')
          ]),
          React.createElement('button', { className: 'w-full bg-red-500 text-white py-2 rounded hover:bg-red-600', key: 'google' }, 'Войти через Google'),
          React.createElement('p', { className: 'text-center text-sm text-gray-600', key: 'signup' }, 'Нет аккаунта? Зарегистрируйтесь')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно share',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4 text-center', key: 'title' }, 'Поделиться'),
        React.createElement('div', { className: 'grid grid-cols-4 gap-4 mb-6', key: 'social' }, [
          React.createElement('button', { className: 'flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded', key: 'vk' }, [
            React.createElement('div', { className: 'w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center', key: 'icon' }, 'VK'),
            React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'VKontakte')
          ]),
          React.createElement('button', { className: 'flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded', key: 'tg' }, [
            React.createElement('div', { className: 'w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center', key: 'icon' }, 'TG'),
            React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'Telegram')
          ]),
          React.createElement('button', { className: 'flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded', key: 'wa' }, [
            React.createElement('div', { className: 'w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center', key: 'icon' }, 'WA'),
            React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'WhatsApp')
          ]),
          React.createElement('button', { className: 'flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded', key: 'email' }, [
            React.createElement('div', { className: 'w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center', key: 'icon' }, '✉'),
            React.createElement('span', { className: 'text-xs text-gray-600', key: 'label' }, 'Email')
          ])
        ]),
        React.createElement('div', { className: 'border-t pt-4', key: 'copy' }, [
          React.createElement('p', { className: 'text-sm text-gray-600 mb-2', key: 'label' }, 'Или скопируйте ссылку:'),
          React.createElement('div', { className: 'flex', key: 'link' }, [
            React.createElement('input', { type: 'text', value: 'https://example.com/share', readOnly: true, className: 'flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm bg-gray-50', key: 'url' }),
            React.createElement('button', { className: 'bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600', key: 'copy-btn' }, 'Копировать')
          ])
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно QR кода',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-4 text-center', key: 'modal' }, [
        React.createElement('h3', { className: 'text-lg font-semibold mb-4', key: 'title' }, 'QR код для оплаты'),
        React.createElement('div', { className: 'w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4', key: 'qr' }, [
          React.createElement('div', { className: 'text-center', key: 'placeholder' }, [
            React.createElement('div', { className: 'text-4xl mb-2', key: 'icon' }, '📱'),
            React.createElement('p', { className: 'text-sm text-gray-600', key: 'text' }, 'QR код')
          ])
        ]),
        React.createElement('p', { className: 'text-gray-600 mb-4', key: 'desc' }, 'Отсканируйте код для быстрой оплаты'),
        React.createElement('div', { className: 'text-lg font-bold text-green-600 mb-4', key: 'amount' }, '₽1,500'),
        React.createElement('button', { className: 'w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200', key: 'close' }, 'Закрыть')
      ])
    ])
  },
  {
    name: 'Модальное окно уведомлений',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'p-4 border-b flex items-center justify-between', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Уведомления'),
          React.createElement('button', { className: 'text-gray-400 hover:text-gray-600', key: 'close' }, '✕')
        ]),
        React.createElement('div', { className: 'max-h-96 overflow-y-auto', key: 'list' }, [
          React.createElement('div', { className: 'p-4 border-b hover:bg-gray-50', key: '1' }, [
            React.createElement('div', { className: 'flex items-start space-x-3', key: 'item' }, [
              React.createElement('div', { className: 'w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center', key: 'icon' }, '💬'),
              React.createElement('div', { className: 'flex-1', key: 'content' }, [
                React.createElement('p', { className: 'font-medium', key: 'text' }, 'Новое сообщение'),
                React.createElement('p', { className: 'text-sm text-gray-600', key: 'time' }, '5 минут назад')
              ])
            ])
          ]),
          React.createElement('div', { className: 'p-4 border-b hover:bg-gray-50', key: '2' }, [
            React.createElement('div', { className: 'flex items-start space-x-3', key: 'item' }, [
              React.createElement('div', { className: 'w-8 h-8 bg-green-100 rounded-full flex items-center justify-center', key: 'icon' }, '✅'),
              React.createElement('div', { className: 'flex-1', key: 'content' }, [
                React.createElement('p', { className: 'font-medium', key: 'text' }, 'Задача выполнена'),
                React.createElement('p', { className: 'text-sm text-gray-600', key: 'time' }, '1 час назад')
              ])
            ])
          ]),
          React.createElement('div', { className: 'p-4 hover:bg-gray-50', key: '3' }, [
            React.createElement('div', { className: 'flex items-start space-x-3', key: 'item' }, [
              React.createElement('div', { className: 'w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center', key: 'icon' }, '⚠️'),
              React.createElement('div', { className: 'flex-1', key: 'content' }, [
                React.createElement('p', { className: 'font-medium', key: 'text' }, 'Требует внимания'),
                React.createElement('p', { className: 'text-sm text-gray-600', key: 'time' }, '2 часа назад')
              ])
            ])
          ])
        ]),
        React.createElement('div', { className: 'p-4 border-t text-center', key: 'footer' }, [
          React.createElement('button', { className: 'text-blue-500 hover:text-blue-600 text-sm', key: 'all' }, 'Посмотреть все')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно настроек приватности',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl max-w-lg w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'p-6 border-b', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Настройки приватности'),
          React.createElement('p', { className: 'text-sm text-gray-600 mt-1', key: 'desc' }, 'Управляйте своими данными и конфиденциальностью')
        ]),
        React.createElement('div', { className: 'p-6 space-y-6', key: 'content' }, [
          React.createElement('div', { className: 'flex items-center justify-between', key: '1' }, [
            React.createElement('div', { key: 'info' }, [
              React.createElement('h4', { className: 'font-medium', key: 'title' }, 'Аналитика'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Разрешить сбор данных для улучшения сервиса')
            ]),
            React.createElement('div', { className: 'relative', key: 'toggle' }, [
              React.createElement('input', { type: 'checkbox', className: 'sr-only', key: 'input' }),
              React.createElement('div', { className: 'w-12 h-6 bg-blue-500 rounded-full', key: 'bg' }),
              React.createElement('div', { className: 'absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5', key: 'thumb' })
            ])
          ]),
          React.createElement('div', { className: 'flex items-center justify-between', key: '2' }, [
            React.createElement('div', { key: 'info' }, [
              React.createElement('h4', { className: 'font-medium', key: 'title' }, 'Cookies'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Разрешить использование cookies')
            ]),
            React.createElement('div', { className: 'relative', key: 'toggle' }, [
              React.createElement('input', { type: 'checkbox', className: 'sr-only', key: 'input' }),
              React.createElement('div', { className: 'w-12 h-6 bg-gray-300 rounded-full', key: 'bg' }),
              React.createElement('div', { className: 'absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5', key: 'thumb' })
            ])
          ]),
          React.createElement('div', { className: 'flex items-center justify-between', key: '3' }, [
            React.createElement('div', { key: 'info' }, [
              React.createElement('h4', { className: 'font-medium', key: 'title' }, 'Персонализация'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Персонализированный контент и реклама')
            ]),
            React.createElement('div', { className: 'relative', key: 'toggle' }, [
              React.createElement('input', { type: 'checkbox', className: 'sr-only', key: 'input' }),
              React.createElement('div', { className: 'w-12 h-6 bg-blue-500 rounded-full', key: 'bg' }),
              React.createElement('div', { className: 'absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5', key: 'thumb' })
            ])
          ])
        ]),
        React.createElement('div', { className: 'p-6 border-t flex justify-end space-x-3', key: 'footer' }, [
          React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'save' }, 'Сохранить')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно выбора языка',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl max-w-sm w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'p-4 border-b', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Выберите язык'),
          React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Choose your language')
        ]),
        React.createElement('div', { className: 'p-4 space-y-2', key: 'languages' }, [
          React.createElement('button', { className: 'w-full flex items-center space-x-3 p-3 hover:bg-blue-50 rounded-lg', key: 'ru' }, [
            React.createElement('span', { className: 'text-2xl', key: 'flag' }, '🇷🇺'),
            React.createElement('div', { className: 'text-left', key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'Русский'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'native' }, 'Russian')
            ]),
            React.createElement('div', { className: 'ml-auto w-4 h-4 bg-blue-500 rounded-full', key: 'check' })
          ]),
          React.createElement('button', { className: 'w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg', key: 'en' }, [
            React.createElement('span', { className: 'text-2xl', key: 'flag' }, '🇺🇸'),
            React.createElement('div', { className: 'text-left', key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'English'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'native' }, 'English')
            ])
          ]),
          React.createElement('button', { className: 'w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg', key: 'es' }, [
            React.createElement('span', { className: 'text-2xl', key: 'flag' }, '🇪🇸'),
            React.createElement('div', { className: 'text-left', key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'Español'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'native' }, 'Spanish')
            ])
          ])
        ]),
        React.createElement('div', { className: 'p-4 border-t', key: 'footer' }, [
          React.createElement('button', { className: 'w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600', key: 'apply' }, 'Применить')
        ])
      ])
    ])
  },
  {
    name: 'Модальное окно экспорта',
    code: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    component: React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50' }, [
      React.createElement('div', { className: 'bg-white rounded-lg shadow-xl max-w-md w-full mx-4', key: 'modal' }, [
        React.createElement('div', { className: 'p-6 border-b', key: 'header' }, [
          React.createElement('h3', { className: 'text-lg font-semibold', key: 'title' }, 'Экспорт данных'),
          React.createElement('p', { className: 'text-sm text-gray-600 mt-1', key: 'desc' }, 'Выберите формат для экспорта')
        ]),
        React.createElement('div', { className: 'p-6 space-y-4', key: 'formats' }, [
          React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer', key: 'pdf' }, [
            React.createElement('input', { type: 'radio', name: 'format', className: 'text-blue-500', key: 'radio' }),
            React.createElement('div', { className: 'w-10 h-10 bg-red-100 text-red-600 rounded flex items-center justify-center text-xs font-bold', key: 'icon' }, 'PDF'),
            React.createElement('div', { key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'PDF'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Портативный документ')
            ])
          ]),
          React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer', key: 'excel' }, [
            React.createElement('input', { type: 'radio', name: 'format', className: 'text-blue-500', key: 'radio' }),
            React.createElement('div', { className: 'w-10 h-10 bg-green-100 text-green-600 rounded flex items-center justify-center text-xs font-bold', key: 'icon' }, 'XLS'),
            React.createElement('div', { key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'Excel'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Таблица Excel')
            ])
          ]),
          React.createElement('label', { className: 'flex items-center space-x-3 cursor-pointer', key: 'csv' }, [
            React.createElement('input', { type: 'radio', name: 'format', className: 'text-blue-500', key: 'radio' }),
            React.createElement('div', { className: 'w-10 h-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center text-xs font-bold', key: 'icon' }, 'CSV'),
            React.createElement('div', { key: 'info' }, [
              React.createElement('p', { className: 'font-medium', key: 'name' }, 'CSV'),
              React.createElement('p', { className: 'text-sm text-gray-600', key: 'desc' }, 'Значения через запятую')
            ])
          ])
        ]),
        React.createElement('div', { className: 'p-6 border-t flex justify-end space-x-3', key: 'footer' }, [
          React.createElement('button', { className: 'px-4 py-2 text-gray-600 hover:text-gray-800', key: 'cancel' }, 'Отмена'),
          React.createElement('button', { className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600', key: 'export' }, 'Экспортировать')
        ])
      ])
    ])
  }
] 