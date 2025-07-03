import { useState, useCallback, useRef } from 'react'
import { BlockData } from '@/blocks'

interface UseUndoRedoProps {
  initialState: BlockData[]
  maxHistorySize?: number
}

export const useUndoRedo = ({ initialState, maxHistorySize = 50 }: UseUndoRedoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const historyRef = useRef<BlockData[][]>([initialState])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < historyRef.current.length - 1

  const addToHistory = useCallback((newState: BlockData[]) => {
    // Удаляем все состояния после текущего индекса
    historyRef.current = historyRef.current.slice(0, currentIndex + 1)
    
    // Добавляем новое состояние
    historyRef.current.push([...newState])
    
    // Ограничиваем размер истории
    if (historyRef.current.length > maxHistorySize) {
      historyRef.current = historyRef.current.slice(-maxHistorySize)
      setCurrentIndex(maxHistorySize - 1)
    } else {
      setCurrentIndex(historyRef.current.length - 1)
    }
  }, [currentIndex, maxHistorySize])

  const undo = useCallback((): BlockData[] | null => {
    if (canUndo) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      return [...historyRef.current[newIndex]]
    }
    return null
  }, [canUndo, currentIndex])

  const redo = useCallback((): BlockData[] | null => {
    if (canRedo) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      return [...historyRef.current[newIndex]]
    }
    return null
  }, [canRedo, currentIndex])

  const getCurrentState = useCallback((): BlockData[] => {
    return [...historyRef.current[currentIndex]]
  }, [currentIndex])

  const resetHistory = useCallback((newInitialState: BlockData[]) => {
    historyRef.current = [newInitialState]
    setCurrentIndex(0)
  }, [])

  return {
    canUndo,
    canRedo,
    undo,
    redo,
    addToHistory,
    getCurrentState,
    resetHistory
  }
} 