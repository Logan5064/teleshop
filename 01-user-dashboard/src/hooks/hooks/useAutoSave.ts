import { useEffect, useRef } from 'react'
import { BlockData } from '@/blocks'

interface UseAutoSaveProps {
  blocks: BlockData[]
  delay?: number
}

export const useAutoSave = ({ blocks, delay = 2000 }: UseAutoSaveProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastSavedRef = useRef<string>('')

  useEffect(() => {
    const currentData = JSON.stringify(blocks)
    
    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Если данные изменились
    if (currentData !== lastSavedRef.current) {
      timeoutRef.current = setTimeout(() => {
        // Сохраняем в localStorage
        localStorage.setItem('teleshop_constructor_autosave', currentData)
        lastSavedRef.current = currentData
        console.log('🔄 Автосохранение:', new Date().toLocaleTimeString())
      }, delay)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [blocks, delay])

  // Функция для загрузки сохраненных данных
  const loadAutoSave = (): BlockData[] | null => {
    try {
      const saved = localStorage.getItem('teleshop_constructor_autosave')
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.error('Ошибка загрузки автосохранения:', error)
      return null
    }
  }

  // Функция для очистки автосохранения
  const clearAutoSave = () => {
    localStorage.removeItem('teleshop_constructor_autosave')
    lastSavedRef.current = ''
  }

  return { loadAutoSave, clearAutoSave }
} 