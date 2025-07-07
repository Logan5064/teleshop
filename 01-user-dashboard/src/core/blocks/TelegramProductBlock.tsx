'use client'

interface TelegramProductBlockProps {
  data: {
    name?: string
    price?: number
    oldPrice?: number
    description?: string
    image?: string
    badge?: string
    rating?: number
    reviewsCount?: number
    inStock?: boolean
    buttonText?: string
    showButton?: boolean
  }
  isSelected?: boolean
  onEdit?: () => void
}

export default function TelegramProductBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramProductBlockProps) {
  const {
    name = "iPhone 15 Pro",
    price = 89990,
    oldPrice = 99990,
    description = "Новый iPhone с титановым корпусом и улучшенной камерой для профессиональной съемки",
    image = "",
    badge = "Хит продаж",
    rating = 4.8,
    reviewsCount = 124,
    inStock = true,
    buttonText = "Заказать",
    showButton = true
  } = data

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
  }

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" clipPath="polygon(0 0, 50% 0, 50% 100%, 0 100%)" />
        </svg>
      )
    }

    return stars
  }

  return (
    <div 
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden border border-gray-100 ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onEdit}
    >
      {/* Изображение товара */}
      <div className="relative aspect-square bg-gray-100">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Бейдж */}
        {badge && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
              {badge}
            </span>
          </div>
        )}
        
        {/* Статус наличия */}
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'} shadow-sm`} />
        </div>
      </div>

      {/* Информация о товаре */}
      <div className="p-4">
        {/* Название */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>
        
        {/* Рейтинг и отзывы */}
        {rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center mr-2">
              {renderStars(rating)}
            </div>
            <span className="text-sm text-gray-600">
              {rating} ({reviewsCount} отзывов)
            </span>
          </div>
        )}
        
        {/* Описание */}
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Цена */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            {oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatPrice(oldPrice)}
              </span>
            )}
          </div>
          
          {oldPrice && (
            <div className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              -{Math.round((1 - price / oldPrice) * 100)}%
            </div>
          )}
        </div>
        
        {/* Кнопка заказа */}
        {showButton && (
          <button 
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md ${
              inStock 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!inStock}
          >
            {inStock ? buttonText : 'Нет в наличии'}
          </button>
        )}
      </div>
    </div>
  )
} 
