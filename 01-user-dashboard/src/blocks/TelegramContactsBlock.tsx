'use client'

interface Contact {
  type: 'phone' | 'email' | 'telegram' | 'whatsapp' | 'instagram' | 'address'
  label: string
  value: string
  icon: string
  color: string
}

interface TelegramContactsBlockProps {
  data: {
    title?: string
    description?: string
    contacts?: Contact[]
    layout?: 'grid' | 'list'
    showIcons?: boolean
  }
  isSelected?: boolean
  onEdit?: () => void
}

const defaultContacts: Contact[] = [
  {
    type: 'phone',
    label: 'Телефон',
    value: '+7 (999) 123-45-67',
    icon: '📞',
    color: '#10b981'
  },
  {
    type: 'telegram',
    label: 'Telegram',
    value: '@myshop_bot',
    icon: '💬',
    color: '#0088cc'
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+7 (999) 123-45-67',
    icon: '📱',
    color: '#25d366'
  },
  {
    type: 'email',
    label: 'Email',
    value: 'info@myshop.ru',
    icon: '✉️',
    color: '#f59e0b'
  },
  {
    type: 'address',
    label: 'Адрес',
    value: 'г. Москва, ул. Примерная, д. 123',
    icon: '📍',
    color: '#ef4444'
  }
]

export default function TelegramContactsBlock({ 
  data = {}, 
  isSelected = false, 
  onEdit 
}: TelegramContactsBlockProps) {
  const {
    title = "Связаться с нами",
    description = "Мы всегда готовы ответить на ваши вопросы",
    contacts = defaultContacts,
    layout = 'list',
    showIcons = true
  } = data

  const getContactIcon = (contact: Contact) => {
    if (!showIcons) return null

    return (
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm"
        style={{ backgroundColor: `${contact.color}20` }}
      >
        {contact.icon}
      </div>
    )
  }

  return (
    <div 
      className={`p-4 ${isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
      onClick={onEdit}
    >
      {/* Заголовок */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-gray-600 text-sm">{description}</p>
        )}
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-3" />
      </div>

      {/* Контакты */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-2 gap-3">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 text-center"
            >
              {/* Иконка */}
              {showIcons && (
                <div className="flex justify-center mb-3">
                  {getContactIcon(contact)}
                </div>
              )}
              
              {/* Информация */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {contact.label}
                </h3>
                <p className="text-xs text-gray-600 break-all">
                  {contact.value}
                </p>
              </div>
              
              {/* Hover эффект */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div 
                  className="h-0.5 w-full rounded-full"
                  style={{ backgroundColor: contact.color }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200"
            >
              <div className="flex items-center">
                {/* Иконка */}
                {showIcons && (
                  <div className="mr-4 flex-shrink-0">
                    {getContactIcon(contact)}
                  </div>
                )}
                
                {/* Информация */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {contact.label}
                  </h3>
                  <p className="text-sm text-gray-600 break-all">
                    {contact.value}
                  </p>
                </div>
                
                {/* Кнопка действия */}
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    title={`Открыть ${contact.label}`}
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Дополнительная информация */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 mb-3">
          Время работы: Пн-Пт 9:00-18:00, Сб-Вс 10:00-16:00
        </p>
        
        {/* Кнопка обратного звонка */}
        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Заказать звонок
        </button>
      </div>
    </div>
  )
} 
