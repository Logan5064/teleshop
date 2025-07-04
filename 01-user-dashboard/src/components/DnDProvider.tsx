'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface DnDProviderProps {
  children: React.ReactNode
}

const DnDProviderComponent: React.FC<DnDProviderProps> = ({ children }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  )
}

export default DnDProviderComponent 