'use client'

import { useState } from 'react'

interface SliderItem {
  id: string
  title: string
  description?: string
  image: string
  buttonText?: string
  buttonUrl?: string
  backgroundColor?: string
}

interface TelegramSliderBlockProps {
  data: {
    title?: string
    items?: SliderItem[]
    autoPlay?: boolean
    showDots?: boolean
    showArrows?: boolean
  }
  isSelected?: boolean
  onEdit?: () => void
}

const defaultItems: SliderItem[] = [
  {
    id: '1',
    title: 'Скидки до 50%',
    description: 'На все товары категории "Электроника"',
    image: '',
    buttonText: 'Смотреть товары',
    backgroundColor: '#3b82f6'
  },
  {
    id: '2', 
    title: 'Новая коллекция',
    description: 'Стильная одежда на любой вкус',
    image: '',
    buttonText: 'К новинкам',
    backgroundColor: '#ef4444'
  },
  {
    id: '3',
    title: 'Бесплатная доставка',
    description: 'При заказе от 2000 рублей',
    image: '',
    buttonText: 'Заказать',
    backgroundColor: '#10b981'
  }
]

export default function TelegramSliderBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramSliderBlockProps) {
  const {
    title = "Специальные предложения",
    items = defaultItems,
    autoPlay = true,
    showDots = true,
    showArrows = true
  } = data

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentItem = items[currentSlide] || items[0]

  return (
    <div 
      className={`p-4 ${isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
      onClick={onEdit}
    >
      {/* Заголовок */}
      {title && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
      )}

      {/* Слайдер */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Контент слайда */}
        <div 
          className="relative h-48 flex items-center justify-center text-white transition-all duration-500"
          style={{ backgroundColor: currentItem.backgroundColor }}
        >
          {/* Фоновое изображение */}
          {currentItem.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${currentItem.image})` }}
            />
          )}
          
          {/* Градиент оверлей */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
          
          {/* Контент */}
          <div className="relative text-center p-6 max-w-sm">
            <h3 className="text-2xl font-bold mb-3 leading-tight">
              {currentItem.title}
            </h3>
            
            {currentItem.description && (
              <p className="text-base mb-4 opacity-95 leading-relaxed">
                {currentItem.description}
              </p>
            )}
            
            {currentItem.buttonText && (
              <button className="inline-flex items-center px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full font-medium hover:bg-white/30 transition-all duration-200 hover:scale-105">
                {currentItem.buttonText}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Стрелки навигации */}
          {showArrows && items.length > 1 && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  prevSlide()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  nextSlide()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        
        {/* Индикаторы точек */}
        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  goToSlide(index)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Превью слайдов */}
      {items.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={(e) => {
                e.stopPropagation()
                goToSlide(index)
              }}
              className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentSlide 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ backgroundColor: item.backgroundColor }}
            >
              <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium p-1">
                <span className="truncate">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 