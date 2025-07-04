import { useEffect, useState, useRef } from 'react';

interface UseAutoSaveOptions {
  interval: number;
  onSave: (data: any) => Promise<void>;
}

interface UseAutoSaveReturn {
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
}

export function useAutoSave(
  data: any,
  options: UseAutoSaveOptions
): UseAutoSaveReturn {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastDataRef = useRef<string>('');

  useEffect(() => {
    const currentDataString = JSON.stringify(data);
    
    // Проверяем, изменились ли данные
    if (currentDataString === lastDataRef.current) {
      return;
    }

    lastDataRef.current = currentDataString;

    // Очищаем предыдущий таймер
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Устанавливаем новый таймер для автосохранения
    timeoutRef.current = setTimeout(async () => {
      if (data && data.length >= 0) { // Проверяем что есть данные для сохранения
        setSaveStatus('saving');
        
        try {
          await options.onSave(data);
          setSaveStatus('saved');
          setLastSaved(new Date());
          
          // Через 3 секунды убираем статус "saved"
          setTimeout(() => {
            setSaveStatus('idle');
          }, 3000);
        } catch (error) {
          console.error('Ошибка автосохранения:', error);
          setSaveStatus('error');
          
          // Через 3 секунды убираем статус ошибки
          setTimeout(() => {
            setSaveStatus('idle');
          }, 3000);
        }
      }
    }, options.interval);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, options.interval, options.onSave]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    saveStatus,
    lastSaved
  };
}