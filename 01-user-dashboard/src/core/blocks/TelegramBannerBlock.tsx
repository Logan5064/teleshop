'use client'

interface TelegramBannerBlockProps {
  data: {
    title?: string
    subtitle?: string
    description?: string  
    image?: string
    buttonText?: string
    buttonUrl?: string
    backgroundColor?: string
    textColor?: string
    buttonColor?: string
  }
  isSelected?: boolean
  onEdit?: () => void
}

export default function TelegramBannerBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramBannerBlockProps) {
  const {
    title = "Добро пожаловать!",
    subtitle = "Премиум качество",
    description = "Откройте для себя лучшие товары по выгодным ценам",
    image = "",
    buttonText = "Смотреть каталог",
    buttonUrl = "",
    backgroundColor = "#f8fafc",
    textColor = "#1e293b", 
    buttonColor = "#3b82f6"
  } = data

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ backgroundColor }}
      onClick={onEdit}
    >
      {/* Фоновое изображение */}
      {image && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      
      {/* Градиент оверлей для лучшей читаемости */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20" />
      
      {/* Контент */}
      <div className="relative p-6 text-center">
        {/* Подзаголовок */}
        {subtitle && (
          <div 
            className="text-sm font-medium mb-2 opacity-80"
            style={{ color: textColor }}
          >
            {subtitle}
          </div>
        )}
        
        {/* Основной заголовок */}
        <h1 
          className="text-2xl font-bold mb-3 leading-tight"
          style={{ color: textColor }}
        >
          {title}
        </h1>
        
        {/* Описание */}
        {description && (
          <p 
            className="text-base mb-6 opacity-90 max-w-sm mx-auto leading-relaxed"
            style={{ color: textColor }}
          >
            {description}
          </p>
        )}
        
        {/* Кнопка действия */}
        {buttonText && (
          <button
            className="inline-flex items-center px-6 py-3 rounded-full font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Декоративные элементы */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
    </div>
  )
} 
