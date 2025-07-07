'use client'

import { useEffect } from 'react'
import ConstructorApp from '@/components/ConstructorApp'
import '@/styles/constructor.css'

export default function ConstructorPage() {
  // Предотвращаем закрытие страницы при несохраненных изменениях
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const message = 'У вас есть несохраненные изменения. Вы уверены, что хотите покинуть страницу?'
      e.returnValue = message
      return message
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <ConstructorApp />
    </div>
  )
} 
