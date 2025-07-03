import { useState, useCallback, useRef, useEffect } from 'react';

interface UseUndoRedoOptions {
  maxHistory?: number;
}

interface UseUndoRedoReturn {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
}

export function useUndoRedo<T>(
  state: T,
  setState: (state: T) => void,
  options: UseUndoRedoOptions = {}
): UseUndoRedoReturn {
  const { maxHistory = 50 } = options;
  
  const historyRef = useRef<T[]>([]);
  const indexRef = useRef(-1);
  const isUndoRedoRef = useRef(false);

  // Добавляем новое состояние в историю
  useEffect(() => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      return;
    }

    const currentState = JSON.stringify(state);
    const lastState = indexRef.current >= 0 
      ? JSON.stringify(historyRef.current[indexRef.current])
      : '';

    // Не добавляем если состояние не изменилось
    if (currentState === lastState) {
      return;
    }

    // Удаляем все состояния после текущего индекса (при добавлении нового состояния)
    historyRef.current = historyRef.current.slice(0, indexRef.current + 1);
    
    // Добавляем новое состояние
    historyRef.current.push(JSON.parse(JSON.stringify(state)));
    indexRef.current = historyRef.current.length - 1;

    // Ограничиваем размер истории
    if (historyRef.current.length > maxHistory) {
      historyRef.current.shift();
      indexRef.current--;
    }
  }, [state, maxHistory]);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current--;
      isUndoRedoRef.current = true;
      setState(JSON.parse(JSON.stringify(historyRef.current[indexRef.current])));
    }
  }, [setState]);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current++;
      isUndoRedoRef.current = true;
      setState(JSON.parse(JSON.stringify(historyRef.current[indexRef.current])));
    }
  }, [setState]);

  const clear = useCallback(() => {
    historyRef.current = [];
    indexRef.current = -1;
  }, []);

  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < historyRef.current.length - 1;

  return {
    undo,
    redo,
    canUndo,
    canRedo,
    clear
  };
} 