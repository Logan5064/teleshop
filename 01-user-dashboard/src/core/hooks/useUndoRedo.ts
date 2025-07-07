import { useState, useCallback } from 'react';

interface UseUndoRedoOptions {
  maxHistory?: number;
}

interface UseUndoRedoReturn {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  addToHistory: (state: any) => void;
}

export function useUndoRedo(
  initialState: any,
  setState: (state: any) => void,
  options: UseUndoRedoOptions = {}
): UseUndoRedoReturn {
  const { maxHistory = 50 } = options;

  const [history, setHistory] = useState<any[]>([initialState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback((newState: any) => {
    setHistory(prev => {
      // Обрезаем историю до текущего индекса
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Добавляем новое состояние
      newHistory.push(newState);
      
      // Ограничиваем размер истории
      if (newHistory.length > maxHistory) {
        return newHistory.slice(-maxHistory);
      }
      
      return newHistory;
    });
    
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= maxHistory ? maxHistory - 1 : newIndex;
    });
  }, [currentIndex, maxHistory]);

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setState(history[newIndex]);
    }
  }, [currentIndex, history, setState]);

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setState(history[newIndex]);
    }
  }, [currentIndex, history, setState]);

  return {
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
    undo,
    redo,
    addToHistory
  };
} 