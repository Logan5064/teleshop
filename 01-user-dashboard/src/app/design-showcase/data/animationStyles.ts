import React from 'react'

export const animationStyles = [
  {
    name: 'Плавное появление',
    code: 'animate-fade-in',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold animate-fade-in' 
    }, 'FadeIn')
  },
  {
    name: 'Масштабирование',
    code: 'hover:scale-110 transition-transform duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold hover:scale-110 transition-transform duration-300 cursor-pointer' 
    }, 'Scale')
  },
  {
    name: 'Поворот',
    code: 'hover:rotate-12 transition-transform duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold hover:rotate-12 transition-transform duration-300 cursor-pointer' 
    }, 'Rotate')
  },
  {
    name: 'Пульсация',
    code: 'animate-pulse',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold animate-pulse' 
    }, 'Pulse')
  },
  {
    name: 'Подпрыгивание',
    code: 'animate-bounce',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold animate-bounce' 
    }, 'Bounce')
  },
  {
    name: 'Встряхивание',
    code: 'hover:animate-shake transition-all duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold hover:animate-shake transition-all duration-300 cursor-pointer' 
    }, 'Shake')
  },
  {
    name: 'Вращение',
    code: 'animate-spin',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold animate-spin' 
    }, 'Spin')
  },
  {
    name: 'Скольжение слева',
    code: 'animate-slide-in-left',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold animate-slide-in-left' 
    }, 'SlideL')
  },
  {
    name: 'Скольжение справа',
    code: 'animate-slide-in-right',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold animate-slide-in-right' 
    }, 'SlideR')
  },
  {
    name: 'Флип горизонтальный',
    code: 'hover:scale-x-[-1] transition-transform duration-500',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-lime-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold hover:scale-x-[-1] transition-transform duration-500 cursor-pointer' 
    }, 'FlipX')
  },
  {
    name: 'Флип вертикальный',
    code: 'hover:scale-y-[-1] transition-transform duration-500',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold hover:scale-y-[-1] transition-transform duration-500 cursor-pointer' 
    }, 'FlipY')
  },
  {
    name: 'Исчезновение',
    code: 'hover:opacity-0 transition-opacity duration-500',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold hover:opacity-0 transition-opacity duration-500 cursor-pointer' 
    }, 'Fade')
  },
  {
    name: 'Качание',
    code: 'animate-swing',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold animate-swing origin-top' 
    }, 'Swing')
  },
  {
    name: 'Резиновый эффект',
    code: 'hover:animate-rubber-band transition-all duration-1000',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold hover:animate-rubber-band transition-all duration-1000 cursor-pointer' 
    }, 'Rubber')
  },
  {
    name: 'Мигание',
    code: 'animate-flash',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold animate-flash' 
    }, 'Flash')
  },
  {
    name: 'Головокружение',
    code: 'hover:animate-wobble transition-all duration-1000',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold hover:animate-wobble transition-all duration-1000 cursor-pointer' 
    }, 'Wobble')
  },
  {
    name: 'Желе эффект',
    code: 'hover:animate-jello transition-all duration-1000',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold hover:animate-jello transition-all duration-1000 cursor-pointer' 
    }, 'Jello')
  },
  {
    name: 'Сердцебиение',
    code: 'animate-heartbeat',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold animate-heartbeat' 
    }, '💖')
  },
  {
    name: 'Парение',
    code: 'hover:shadow-2xl hover:-translate-y-2 transition-all duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer' 
    }, 'Hover')
  },
  {
    name: 'Загрузка точки',
    code: 'animate-loading-dots',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center space-x-1' 
    }, [
      React.createElement('div', { className: 'w-3 h-3 bg-blue-500 rounded-full animate-bounce', key: '1' }),
      React.createElement('div', { className: 'w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200', key: '2' }),
      React.createElement('div', { className: 'w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-400', key: '3' })
    ])
  },
  {
    name: 'Морфинг формы',
    code: 'hover:rounded-full transition-all duration-500',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold hover:rounded-full transition-all duration-500 cursor-pointer' 
    }, 'Morph')
  },
  {
    name: 'Глитч эффект',
    code: 'hover:animate-glitch transition-all duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold hover:animate-glitch transition-all duration-300 cursor-pointer relative' 
    }, 'Glitch')
  },
  {
    name: 'Неон свечение',
    code: 'hover:shadow-neon transition-all duration-300',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold hover:shadow-neon transition-all duration-300 cursor-pointer' 
    }, 'Neon')
  },
  {
    name: 'Волновой эффект',
    code: 'animate-wave',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold animate-wave' 
    }, '🌊')
  },
  {
    name: 'Прокрутка текста',
    code: 'animate-marquee',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden' 
    }, [
      React.createElement('div', { 
        className: 'text-white font-bold animate-marquee whitespace-nowrap', 
        key: 'text' 
      }, 'SCROLL TEXT')
    ])
  },
  {
    name: 'Тайпрайтер эффект',
    code: 'animate-typewriter',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center' 
    }, [
      React.createElement('span', { 
        className: 'text-green-400 font-mono text-sm animate-typewriter', 
        key: 'text' 
      }, 'Type...')
    ])
  },
  {
    name: 'Голографический',
    code: 'animate-holographic',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold animate-holographic' 
    }, 'HOLO')
  },
  {
    name: 'Конфетти',
    code: 'animate-confetti',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold animate-confetti relative' 
    }, '🎉')
  },
  {
    name: 'Матричный дождь',
    code: 'animate-matrix',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-black rounded-lg flex items-center justify-center text-green-400 font-mono text-xs animate-matrix overflow-hidden' 
    }, '01101010')
  },
  {
    name: 'Огненный эффект',
    code: 'animate-fire',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-lg flex items-center justify-center text-white font-bold animate-fire' 
    }, '🔥')
  },
  {
    name: 'Водная рябь',
    code: 'animate-ripple',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold animate-ripple relative' 
    }, '💧')
  },
  {
    name: 'Телепортация',
    code: 'hover:animate-teleport transition-all duration-500',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center text-white font-bold hover:animate-teleport transition-all duration-500 cursor-pointer' 
    }, '⚡')
  },
  {
    name: 'Кубик льда',
    code: 'hover:animate-freeze transition-all duration-1000',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-400 rounded-lg flex items-center justify-center text-white font-bold hover:animate-freeze transition-all duration-1000 cursor-pointer' 
    }, '❄️')
  },
  {
    name: 'Лазерный луч',
    code: 'animate-laser',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gray-900 rounded-lg flex items-center justify-center text-red-500 font-bold animate-laser relative overflow-hidden' 
    }, 'LASER')
  },
  {
    name: 'Магический круг',
    code: 'animate-magic-circle',
    component: React.createElement('div', { 
      className: 'w-24 h-24 bg-gradient-to-br from-purple-700 to-pink-600 rounded-full flex items-center justify-center text-white font-bold animate-magic-circle border-4 border-yellow-400' 
    }, '✨')
  }
]
