'use client'

import { useParams } from 'next/navigation'

export default function ShopPreviewPage() {
  const params = useParams()
  const shopId = params.id as string

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Магазин #{shopId}</h2>
          <p className="text-gray-600 mb-6">Предварительный просмотр магазина</p>
          <div className="space-y-4">
            <button 
              onClick={() => window.open(`http://77.73.232.46:3001/constructor`, '_blank')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Открыть конструктор
            </button>
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 