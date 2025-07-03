import React from 'react'

export const advancedEffectsData = [
  {
    name: 'Floating Glass Card',
    className: 'ts-card-glass ts-animate-float',
    code: 'ts-card-glass ts-animate-float',
    component: (
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-lg">
        <div className="ts-card-glass ts-animate-float text-white">
          <h3 className="font-bold text-lg mb-2">Плавающая стеклянная карточка</h3>
          <p className="text-white/90 text-sm">Комбинация стекломорфизма и анимации</p>
        </div>
      </div>
    ),
    description: 'Комбинация стеклянного стиля и анимации плавания'
  },
  {
    name: 'Neumorphic Button with Pulse',
    className: 'ts-btn-neumorphic ts-animate-pulse',
    code: 'ts-btn-neumorphic ts-animate-pulse',
    component: (
      <button className="ts-btn-neumorphic ts-animate-pulse">
        Пульсирующий неоморф
      </button>
    ),
    description: 'Неоморфная кнопка с эффектом пульсации'
  },
  {
    name: 'Brutal Card with Bounce',
    className: 'ts-card-brutalist ts-animate-bounce-in',
    code: 'ts-card-brutalist ts-animate-bounce-in',
    component: (
      <div className="ts-card-brutalist ts-animate-bounce-in">
        <h3 className="font-bold text-lg mb-2">БРУТАЛЬНАЯ КАРТОЧКА</h3>
        <p className="text-gray-800 text-sm">С АНИМАЦИЕЙ ПОДСКОКА</p>
      </div>
    ),
    description: 'Брутальная карточка с анимацией появления'
  },
  {
    name: 'Glass Input + Soft Shadow',
    className: 'ts-input-glass ts-shadow-soft',
    code: 'ts-input-glass ts-shadow-soft',
    component: (
      <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-lg">
        <input className="ts-input-glass ts-shadow-soft" placeholder="Стеклянный инпут с мягкой тенью" />
      </div>
    ),
    description: 'Комбинация стеклянного инпута и мягкой тени'
  },
  {
    name: 'Gradient Border + Lift Effect',
    className: 'ts-card-gradient-border ts-card-lift',
    code: 'ts-card-gradient-border ts-card-lift',
    component: (
      <div className="ts-card-gradient-border ts-card-lift">
        <h3 className="font-bold text-lg mb-2">Градиентная рамка + подъем</h3>
        <p className="text-gray-600 text-sm">Наведите для эффекта подъема</p>
      </div>
    ),
    description: 'Карточка с градиентной рамкой и эффектом подъема'
  },
  {
    name: 'Multi-Shadow Stack',
    className: 'ts-shadow-soft ts-shadow-medium ts-shadow-hard',
    code: 'ts-shadow-soft ts-shadow-medium ts-shadow-hard',
    component: (
      <div className="bg-white p-6 rounded-lg ts-shadow-hard">
        <p className="text-gray-700 font-medium">Многослойные тени</p>
        <p className="text-gray-500 text-sm mt-2">Комбинация нескольких теней</p>
      </div>
    ),
    description: 'Комбинация нескольких типов теней'
  },
  {
    name: 'Glowing Neon Effect',
    className: 'glow-neon',
    code: 'shadow-lg shadow-cyan-500/50 bg-cyan-400 text-white animate-pulse',
    component: (
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="shadow-lg shadow-cyan-500/50 bg-cyan-400 text-white animate-pulse p-4 rounded-lg text-center font-bold">
          Неоновое свечение
        </div>
      </div>
    ),
    description: 'Эффект неонового свечения с тенью'
  },
  {
    name: 'Holographic Card',
    className: 'holographic',
    code: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent',
    component: (
      <div className="bg-black p-6 rounded-lg">
        <h3 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent font-bold text-xl mb-2">
          Голографический текст
        </h3>
        <p className="text-gray-300 text-sm">Радужный градиентный эффект</p>
      </div>
    ),
    description: 'Голографический эффект с градиентным текстом'
  },
  {
    name: 'Morphing Button',
    className: 'morph-button',
    code: 'transition-all duration-500 hover:rounded-full hover:scale-110',
    component: (
      <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-500 hover:rounded-full hover:scale-110 hover:bg-purple-500">
        Морфинг кнопка
      </button>
    ),
    description: 'Кнопка с морфинг анимацией'
  },
  {
    name: 'Parallax Card',
    className: 'parallax-card',
    code: 'transform hover:rotateY-12 hover:rotateX-6 transition-transform duration-300',
    component: (
      <div className="perspective-1000">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl transform hover:rotateY-12 hover:rotateX-6 transition-transform duration-300 shadow-xl">
          <h3 className="font-bold text-lg mb-2">3D Поворот</h3>
          <p className="text-white/90 text-sm">Наведите для 3D эффекта</p>
        </div>
      </div>
    ),
    description: '3D трансформация с параллаксом'
  },
  {
    name: 'Liquid Animation',
    className: 'liquid-animation',
    code: 'animate-blob bg-gradient-to-r from-yellow-400 to-pink-400',
    component: (
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full animate-blob relative">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
            Жидкость
          </div>
        </div>
      </div>
    ),
    description: 'Эффект жидкой анимации'
  },
  {
    name: 'Glitch Effect',
    className: 'glitch-effect',
    code: 'animate-glitch relative',
    component: (
      <div className="bg-black p-6 rounded-lg">
        <div className="text-red-500 font-bold text-xl animate-glitch relative">
          GLITCH EFFECT
          <div className="absolute inset-0 text-cyan-500 animate-glitch-2">GLITCH EFFECT</div>
        </div>
      </div>
    ),
    description: 'Эффект цифрового глитча'
  },
  {
    name: 'Ripple Effect',
    className: 'ripple-effect',
    code: 'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:animate-ripple',
    component: (
      <button className="relative overflow-hidden bg-blue-500 text-white px-6 py-3 rounded-lg font-medium before:absolute before:inset-0 before:bg-white/20 before:scale-0 before:rounded-full before:animate-ripple hover:before:scale-150">
        Кликните для эффекта
      </button>
    ),
    description: 'Эффект расходящихся кругов'
  },
  {
    name: 'Magnetic Field',
    className: 'magnetic-field',
    code: 'transition-transform hover:scale-105 cursor-pointer',
    component: (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-8 h-8 bg-purple-500 rounded transition-transform hover:scale-105 cursor-pointer hover:z-10 relative"></div>
        ))}
      </div>
    ),
    description: 'Магнитное притяжение элементов'
  },
  {
    name: 'Breathing Card',
    className: 'breathing-card',
    code: 'animate-breath',
    component: (
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl animate-breath shadow-lg">
        <h3 className="text-white font-bold text-lg mb-2">Дышащая карточка</h3>
        <p className="text-white/90 text-sm">Эффект дыхания</p>
      </div>
    ),
    description: 'Эффект плавного дыхания'
  },
  {
    name: 'Aurora Background',
    className: 'aurora-bg',
    code: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-aurora',
    component: (
      <div className="relative h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-aurora rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 animate-aurora-2"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          Северное сияние
        </div>
      </div>
    ),
    description: 'Эффект северного сияния'
  },
  {
    name: 'Magnetic Hover',
    className: 'magnetic-hover',
    code: 'transition-all duration-300 hover:scale-110 hover:rotate-3',
    component: (
      <div className="bg-yellow-400 p-4 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer">
        <div className="text-center font-bold">Магнитный эффект</div>
      </div>
    ),
    description: 'Магнитное притяжение при наведении'
  },
  {
    name: 'Elastic Transform',
    className: 'elastic-transform',
    code: 'transition-transform duration-500 hover:scale-x-150 hover:scale-y-75',
    component: (
      <div className="bg-red-500 text-white p-4 rounded-lg transition-transform duration-500 hover:scale-x-150 hover:scale-y-75 cursor-pointer text-center font-bold">
        Эластичная трансформация
      </div>
    ),
    description: 'Эластичная деформация'
  },
  {
    name: 'Floating Islands',
    className: 'floating-islands',
    code: 'animate-float-slow',
    component: (
      <div className="relative">
        <div className="w-16 h-16 bg-green-400 rounded-full animate-float-slow shadow-lg"></div>
        <div className="w-12 h-12 bg-blue-400 rounded-full animate-float-delayed absolute top-4 left-8 shadow-lg"></div>
        <div className="w-8 h-8 bg-purple-400 rounded-full animate-float-fast absolute top-8 left-4 shadow-lg"></div>
      </div>
    ),
    description: 'Плавающие острова с разной скоростью'
  },
  {
    name: 'Particle System',
    className: 'particle-system',
    code: 'relative overflow-hidden',
    component: (
      <div className="relative overflow-hidden bg-gray-900 rounded-lg h-24 w-full">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          Система частиц
        </div>
      </div>
    ),
    description: 'Анимированная система частиц'
  },
  {
    name: 'Wave Animation',
    className: 'wave-animation',
    code: 'animate-wave-slow',
    component: (
      <div className="relative overflow-hidden bg-blue-500 rounded-lg h-24">
        <div className="absolute bottom-0 left-0 w-full h-8 bg-blue-300 animate-wave opacity-75"></div>
        <div className="absolute bottom-0 left-0 w-full h-6 bg-blue-200 animate-wave-2 opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          Волновая анимация
        </div>
      </div>
    ),
    description: 'Эффект океанских волн'
  },
  {
    name: 'Matrix Rain',
    className: 'matrix-rain',
    code: 'bg-black text-green-400 font-mono',
    component: (
      <div className="bg-black text-green-400 font-mono p-4 rounded-lg h-24 overflow-hidden relative">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-matrix-rain"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Math.random().toString(36).substr(2, 8)}
          </div>
        ))}
        <div className="relative z-10 flex items-center justify-center h-full font-bold">
          Matrix Rain
        </div>
      </div>
    ),
    description: 'Эффект дождя из Матрицы'
  },
  {
    name: 'Kinetic Typography',
    className: 'kinetic-typography',
    code: 'animate-kinetic-text',
    component: (
      <div className="text-center p-6">
        <h3 className="text-3xl font-bold">
          {'КИНЕТИЧЕСКАЯ'.split('').map((letter, i) => (
            <span 
              key={i} 
              className="inline-block animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {letter}
            </span>
          ))}
        </h3>
        <p className="text-gray-600 mt-2">Анимированная типографика</p>
      </div>
    ),
    description: 'Кинетическая анимация текста'
  },
  {
    name: 'Tilt Perspective',
    className: 'tilt-perspective',
    code: 'transform-gpu hover:rotate-6 hover:scale-105 transition-transform',
    component: (
      <div className="perspective-1000 cursor-pointer">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl transform-gpu hover:rotate-6 hover:scale-105 transition-transform duration-300 shadow-xl">
          <h3 className="font-bold text-lg mb-2">Наклон перспективы</h3>
          <p className="text-white/90 text-sm">3D наклон с GPU ускорением</p>
        </div>
      </div>
    ),
    description: 'Наклон с 3D перспективой'
  },
  {
    name: 'Cyberpunk Glow',
    className: 'cyberpunk-glow',
    code: 'bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 text-cyan-400',
    component: (
      <div className="bg-black border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 text-cyan-400 p-6 rounded-lg font-mono">
        <h3 className="font-bold text-lg mb-2">CYBERPUNK 2077</h3>
        <p className="text-cyan-300 text-sm">Неоновое киберпанк свечение</p>
      </div>
    ),
    description: 'Киберпанк стиль с неоновым свечением'
  },
  {
    name: 'Liquid Gradient Flow',
    className: 'liquid-gradient-flow',
    code: 'bg-gradient-to-r animate-gradient-flow',
    component: (
      <div className="h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-flow rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-500 via-purple-500 to-pink-500 animate-gradient-flow-reverse opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          Жидкий градиент
        </div>
      </div>
    ),
    description: 'Плавный перелив градиентов'
  },
  {
    name: 'Hologram Flicker',
    className: 'hologram-flicker',
    code: 'animate-hologram-flicker bg-gradient-to-r from-transparent via-cyan-400 to-transparent',
    component: (
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="relative">
          <h3 className="text-cyan-400 font-bold text-xl animate-hologram-flicker">
            ГОЛОГРАММА
          </h3>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-hologram-scan"></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">Эффект мерцающей голограммы</p>
      </div>
    ),
    description: 'Голограмма с эффектом мерцания'
  },
  {
    name: 'Quantum Entanglement',
    className: 'quantum-entanglement',
    code: 'relative animate-quantum-spin',
    component: (
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-quantum-spin"></div>
        <div className="absolute inset-2 border-4 border-purple-500 rounded-full animate-quantum-spin-reverse"></div>
        <div className="absolute inset-4 border-4 border-pink-500 rounded-full animate-quantum-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">
          QUANTUM
        </div>
      </div>
    ),
    description: 'Квантовое запутывание с вращением'
  },
  {
    name: 'DNA Helix Animation',
    className: 'dna-helix',
    code: 'animate-dna-rotation',
    component: (
      <div className="relative w-16 h-24 mx-auto">
        <div className="absolute left-0 w-2 h-full bg-gradient-to-b from-green-400 to-blue-500 rounded-full animate-dna-strand-1"></div>
        <div className="absolute right-0 w-2 h-full bg-gradient-to-b from-blue-400 to-green-500 rounded-full animate-dna-strand-2"></div>
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-0.5 bg-white opacity-75"
            style={{ top: `${i * 16 + 8}%`, animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    ),
    description: 'Анимация спирали ДНК'
  },
  {
    name: 'Electric Current',
    className: 'electric-current',
    code: 'relative overflow-hidden',
    component: (
      <div className="relative overflow-hidden bg-gray-900 rounded-lg p-6 h-24">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-full bg-yellow-400 animate-electric-bolt opacity-75"
              style={{ 
                left: `${i * 20}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: '0.5s'
              }}
            ></div>
          ))}
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-yellow-400 font-bold">
          ⚡ ЭЛЕКТРИЧЕСТВО ⚡
        </div>
      </div>
    ),
    description: 'Эффект электрического тока'
  },
  {
    name: 'Origami Fold',
    className: 'origami-fold',
    code: 'transform-style-preserve-3d hover:rotateX-90 transition-transform duration-700',
    component: (
      <div className="perspective-1000 cursor-pointer">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 transform-style-preserve-3d hover:rotateX-90 transition-transform duration-700 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 transform rotateX-90 origin-bottom"></div>
          <div className="flex items-center justify-center h-full text-white font-bold text-xs">
            ОРИГАМИ
          </div>
        </div>
      </div>
    ),
    description: 'Эффект складывания оригами'
  },
  {
    name: 'Meteor Shower',
    className: 'meteor-shower',
    code: 'relative overflow-hidden',
    component: (
      <div className="relative overflow-hidden bg-gray-900 rounded-lg h-24 w-full">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-8 h-0.5 bg-gradient-to-r from-transparent to-white animate-meteor"
            style={{
              top: `${Math.random() * 60}%`,
              right: '100%',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: '1.5s'
            }}
          ></div>
        ))}
        <div className="relative z-10 flex items-center justify-center h-full text-white font-bold">
          ☄️ МЕТЕОРИТНЫЙ ДОЖДЬ
        </div>
      </div>
    ),
    description: 'Эффект метеоритного дождя'
  },
  {
    name: 'Prism Split',
    className: 'prism-split',
    code: 'hover:transform hover:skew-x-12 hover:scale-110',
    component: (
      <div className="cursor-pointer hover:transform hover:skew-x-12 hover:scale-110 transition-transform duration-500">
        <div className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 p-6 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-2">ПРИЗМА</h3>
          <p className="text-white/90 text-sm">Разложение света на спектр</p>
        </div>
      </div>
    ),
    description: 'Эффект призматического разложения'
  },
  {
    name: 'Magnetized Attraction',
    className: 'magnetized-attraction',
    code: 'relative hover:children:transform hover:children:translate-x-4',
    component: (
      <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg group cursor-pointer">
        <div className="w-8 h-8 bg-red-500 rounded transition-transform group-hover:translate-x-2">🧲</div>
        <div className="w-6 h-6 bg-gray-400 rounded transition-transform group-hover:translate-x-4"></div>
        <div className="w-6 h-6 bg-gray-400 rounded transition-transform group-hover:translate-x-6"></div>
        <div className="w-6 h-6 bg-gray-400 rounded transition-transform group-hover:translate-x-8"></div>
        <div className="text-gray-700 font-medium ml-4">Магнитное притяжение</div>
      </div>
    ),
    description: 'Эффект магнитного притяжения элементов'
  }
] 