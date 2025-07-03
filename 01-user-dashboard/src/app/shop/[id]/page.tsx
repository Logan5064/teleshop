'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ShopPreviewPage() {
  const params = useParams()
  const shopId = params.id as string

  useEffect(() => {
    // Перенаправляем на shop.html из bot_engine
    const shopHtmlUrl = `/konstruktor/backend/bot_engine/templates/shop.html`
    
    // Заменяем текущую страницу на shop.html
    window.location.replace(shopHtmlUrl)
  }, [shopId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Загружаем магазин...</h2>
        <p className="text-gray-600">Переходим к Telegram Web App</p>
        <p className="text-sm text-gray-500 mt-2">ID магазина: {shopId}</p>
      </div>
    </div>
  )
} 