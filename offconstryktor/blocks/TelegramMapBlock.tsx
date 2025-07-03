'use client'

interface TelegramMapBlockProps {
  data: {
    title?: string
    address?: string
    latitude?: number
    longitude?: number
    workingHours?: string
    phone?: string
    showRouteButton?: boolean
    showCallButton?: boolean
    mapStyle?: 'default' | 'satellite' | 'hybrid'
  }
  isSelected?: boolean
  onEdit?: () => void
}

export default function TelegramMapBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramMapBlockProps) {
  const {
    title = "Как нас найти",
    address = "г. Москва, ул. Тверская, д. 1",
    latitude = 55.7558,
    longitude = 37.6173,
    workingHours = "Пн-Пт: 9:00-18:00\nСб-Вс: 10:00-16:00",
    phone = "+7 (999) 123-45-67",
    showRouteButton = true,
    showCallButton = true,
    mapStyle = 'default'
  } = data

  const openInMaps = () => {
    const url = `https://maps.yandex.ru/?pt=${longitude},${latitude}&z=17&l=map`
    window.open(url, '_blank')
  }

  const buildRoute = () => {
    const url = `https://maps.yandex.ru/?rtext=~${latitude},${longitude}&rtt=auto`
    window.open(url, '_blank')
  }

  const callPhone = () => {
    window.open(`tel:${phone}`, '_self')
  }

  return (
    <div 
      className={`overflow-hidden rounded-2xl ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      onClick={onEdit}
    >
      {/* Заголовок */}
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      {/* Карта (имитация) */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100 overflow-hidden">
        {/* Сетка карты */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-300" />
            ))}
          </div>
        </div>
        
        {/* "Дороги" */}
        <div className="absolute top-16 left-0 right-0 h-1 bg-gray-400 opacity-60" />
        <div className="absolute top-32 left-0 right-0 h-1 bg-gray-400 opacity-60" />
        <div className="absolute top-0 bottom-0 left-16 w-1 bg-gray-400 opacity-60" />
        <div className="absolute top-0 bottom-0 left-32 w-1 bg-gray-400 opacity-60" />
        
        {/* Маркер местоположения */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="relative">
            {/* Тень маркера */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-6 h-3 bg-black/20 rounded-full blur-sm" />
            
            {/* Маркер */}
            <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            
            {/* Стрелка маркера */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500" />
          </div>
          
          {/* Пульсирующий эффект */}
          <div className="absolute top-0 left-0 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-30" />
        </div>
        
        {/* Кнопка открытия в картах */}
        <button 
          onClick={(e) => {
            e.stopPropagation()
            openInMaps()
          }}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:bg-white transition-all duration-200"
          title="Открыть в картах"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
      </div>

      {/* Информация */}
      <div className="p-4 bg-white">
        {/* Адрес */}
        <div className="flex items-start mb-4">
          <div className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Адрес</p>
            <p className="text-gray-600 text-sm">{address}</p>
          </div>
        </div>

        {/* Время работы */}
        <div className="flex items-start mb-4">
          <div className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Режим работы</p>
            <p className="text-gray-600 text-sm whitespace-pre-line">{workingHours}</p>
          </div>
        </div>

        {/* Телефон */}
        <div className="flex items-start mb-6">
          <div className="w-6 h-6 text-gray-500 mr-3 flex-shrink-0 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Телефон</p>
            <p className="text-gray-600 text-sm">{phone}</p>
          </div>
        </div>

        {/* Кнопки действий */}
        <div className="grid grid-cols-2 gap-3">
          {showRouteButton && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                buildRoute()
              }}
              className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Маршрут
            </button>
          )}
          
          {showCallButton && (
            <button 
              onClick={(e) => {
                e.stopPropagation()
                callPhone()
              }}
              className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Позвонить
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 