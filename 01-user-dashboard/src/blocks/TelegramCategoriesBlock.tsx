'use client'

interface Category {
  id: string
  name: string
  icon: string
  count?: number
  color?: string
}

interface TelegramCategoriesBlockProps {
  data: {
    title?: string
    categories?: Category[]
    layout?: 'grid' | 'list'
    columns?: number
  }
  isSelected?: boolean
  onEdit?: () => void
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Электроника', icon: '📱', count: 24, color: '#3b82f6' },
  { id: '2', name: 'Одежда', icon: '👕', count: 156, color: '#ef4444' },
  { id: '3', name: 'Дом и сад', icon: '🏠', count: 89, color: '#10b981' },
  { id: '4', name: 'Спорт', icon: '⚽', count: 42, color: '#f59e0b' },
  { id: '5', name: 'Книги', icon: '📚', count: 78, color: '#8b5cf6' },
  { id: '6', name: 'Красота', icon: '💄', count: 63, color: '#ec4899' }
]

export default function TelegramCategoriesBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramCategoriesBlockProps) {
  const {
    title = "Категории товаров",
    categories = defaultCategories,
    layout = 'grid',
    columns = 2
  } = data

  const gridCols = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-1'

  return (
    <div 
      className={`p-4 ${isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
      onClick={onEdit}
    >
      {/* Заголовок */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      {/* Сетка категорий */}
      {layout === 'grid' ? (
        <div className={`grid ${gridCols} gap-3`}>
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
            >
              {/* Фон с цветом категории */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: category.color }}
              />
              
              {/* Иконка */}
              <div className="relative flex items-center justify-center w-12 h-12 mx-auto mb-3">
                <div 
                  className="w-full h-full rounded-xl flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  {category.icon}
                </div>
              </div>
              
              {/* Название */}
              <h3 className="text-center font-semibold text-gray-900 mb-1 text-sm">
                {category.name}
              </h3>
              
              {/* Количество товаров */}
              {category.count && (
                <p className="text-center text-xs text-gray-500">
                  {category.count} товаров
                </p>
              )}
              
              {/* Стрелка */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Список категорий */
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group flex items-center p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
            >
              {/* Иконка */}
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3 shadow-sm"
                style={{ backgroundColor: `${category.color}20` }}
              >
                {category.icon}
              </div>
              
              {/* Информация */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {category.name}
                </h3>
                {category.count && (
                  <p className="text-xs text-gray-500">
                    {category.count} товаров
                  </p>
                )}
              </div>
              
              {/* Стрелка */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 