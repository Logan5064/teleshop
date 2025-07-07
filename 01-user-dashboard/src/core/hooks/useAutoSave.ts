import { useState, useEffect, useCallback } from 'react'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

interface UseAutoSaveOptions {
  interval?: number
  onSave?: (data: any) => Promise<void>
}

interface UseAutoSaveReturn {
  lastSaved: Date | null
  saveStatus: SaveStatus
  save: () => Promise<void>
}

export function useAutoSave(data: any, options: UseAutoSaveOptions = {}): UseAutoSaveReturn {
  const { interval = 2000, onSave } = options
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [saveTimeout, setSaveTimeout] = useState<NodeJS.Timeout | null>(null)

  const save = useCallback(async () => {
    if (saveStatus === 'saving') return

    try {
      setSaveStatus('saving')

      // Сохраняем в localStorage
      const saveKey = `teleshop_constructor_autosave_${Date.now()}`
      localStorage.setItem(saveKey, JSON.stringify(data))

      // Если есть внешний обработчик сохранения, вызываем его
      if (onSave) {
        await onSave(data)
      }

      const now = new Date()
      setLastSaved(now)
      setSaveStatus('saved')

      // Очищаем старые сохранения (оставляем только последние 5)
      const keys = Object.keys(localStorage)
        .filter(key => key.startsWith('teleshop_constructor_autosave_'))
        .sort()
        .reverse()

      keys.slice(5).forEach(key => localStorage.removeItem(key))

    } catch (error) {
      console.error('Ошибка автосохранения:', error)
      setSaveStatus('error')
    }
  }, [data, onSave, saveStatus])

  useEffect(() => {
    // Отменяем предыдущий таймер
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    // Устанавливаем новый таймер
    const timeout = setTimeout(save, interval)
    setSaveTimeout(timeout)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [data, interval, save])

  // Сохраняем при размонтировании компонента
  useEffect(() => {
    return () => {
      if (data) save()
    }
  }, [data, save])

  return {
    lastSaved,
    saveStatus,
    save
  }
} 