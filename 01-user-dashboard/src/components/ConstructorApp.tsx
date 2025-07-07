'use client'

import React, { useState, useCallback } from 'react'
import { useAutoSave } from '@/core/hooks/useAutoSave'
import { useUndoRedo } from '@/core/hooks/useUndoRedo'
import { BlockData, BlockType, BlockDataType } from '@/types/blocks'
import TopPanel from './constructor/panels/TopPanel'
import BlockSelector from './constructor/panels/BlockSelector'
import PreviewPanel from './constructor/panels/PreviewPanel'
import SettingsPanel from './constructor/panels/SettingsPanel'
import TemplateModal from './modals/TemplateModal'

interface Template {
  id: string;
  name: string;
  description: string;
  blocks: BlockData[];
}

interface AutoSaveResult {
  lastSaved: Date | undefined;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  save: () => Promise<void>;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: Template) => void;
}

export default function ConstructorApp() {
  // Состояние блоков
  const [blocks, setBlocks] = useState<BlockData[]>([])
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null)
  const [shopName, setShopName] = useState('')
  
  // История изменений
  const { canUndo, canRedo, undo, redo, addToHistory } = useUndoRedo(blocks, setBlocks)
  
  // Автосохранение
  const { lastSaved, saveStatus, save } = useAutoSave(blocks) as AutoSaveResult

  // Модальные окна
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)

  // Обработчики блоков
  const handleBlockAdd = useCallback((blockType: BlockType, blockData: BlockDataType) => {
    const newBlock: BlockData = {
      id: `block_${Date.now()}`,
      type: blockType,
      order: blocks.length,
      data: blockData
    }
    
    setBlocks(prev => {
      const newBlocks = [...prev, newBlock]
      addToHistory(newBlocks)
      return newBlocks
    })
  }, [addToHistory, blocks.length])

  const handleBlocksReorder = useCallback((newBlocks: BlockData[]) => {
    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index
    }))
    setBlocks(reorderedBlocks)
    addToHistory(reorderedBlocks)
  }, [addToHistory])

  const handleBlockSelect = useCallback((index: number) => {
    setSelectedBlockIndex(index)
  }, [])

  const handleBlockUpdate = useCallback((blockData: BlockData) => {
    setBlocks(prev => {
      if (selectedBlockIndex === null) return prev
      
      const newBlocks = [...prev]
      newBlocks[selectedBlockIndex] = blockData
      addToHistory(newBlocks)
      return newBlocks
    })
  }, [selectedBlockIndex, addToHistory])

  const handleBlockDelete = useCallback((index: number) => {
    setBlocks(prev => {
      const newBlocks = prev.filter((_, i) => i !== index).map((block, i) => ({
        ...block,
        order: i
      }))
      addToHistory(newBlocks)
      return newBlocks
    })
    setSelectedBlockIndex(null)
  }, [addToHistory])

  const handleBlockDuplicate = useCallback((index: number) => {
    setBlocks(prev => {
      const blockToDuplicate = prev[index]
      const newBlock: BlockData = {
        ...blockToDuplicate,
        id: `block_${Date.now()}`,
        order: index + 1
      }
      
      const newBlocks = [...prev]
      newBlocks.splice(index + 1, 0, newBlock)
      const reorderedBlocks = newBlocks.map((block, i) => ({
        ...block,
        order: i
      }))
      addToHistory(reorderedBlocks)
      return reorderedBlocks
    })
  }, [addToHistory])

  // Обработчики шаблонов
  const handleTemplateSelect = useCallback((template: Template) => {
    const blocksWithOrder = template.blocks.map((block, index) => ({
      ...block,
      order: index
    }))
    setBlocks(blocksWithOrder)
    addToHistory(blocksWithOrder)
    setIsTemplateModalOpen(false)
  }, [addToHistory])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Верхняя панель */}
      <TopPanel
        canUndo={canUndo}
        canRedo={canRedo}
        lastSaved={lastSaved}
        saveStatus={saveStatus}
        blocksCount={blocks.length}
        shopName={shopName}
        onShopNameChange={setShopName}
        onUndo={undo}
        onRedo={redo}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onSave={save}
        onPublish={() => {}}
        onExport={() => {}}
        onImport={() => {}}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Левая панель - блоки */}
        <BlockSelector
          onBlockAdd={handleBlockAdd}
        />

        {/* Центральная панель - предпросмотр */}
        <PreviewPanel
          blocks={blocks}
          onBlocksReorder={handleBlocksReorder}
          onBlockSelect={handleBlockSelect}
          selectedBlockIndex={selectedBlockIndex}
          onBlockDelete={handleBlockDelete}
          onBlockDuplicate={handleBlockDuplicate}
        />

        {/* Правая панель - настройки */}
        <SettingsPanel
          selectedBlock={selectedBlockIndex !== null ? blocks[selectedBlockIndex] : null}
          onEditBlock={(id: string, newData: Partial<BlockDataType>) => {
            if (selectedBlockIndex !== null) {
              const updatedBlock: BlockData = {
                ...blocks[selectedBlockIndex],
                data: {
                  ...blocks[selectedBlockIndex].data,
                  ...newData
                }
              }
              handleBlockUpdate(updatedBlock)
            }
          }}
          blocks={blocks}
          onBlockSelect={(id: string | null) => {
            if (id === null) {
              setSelectedBlockIndex(null)
            } else {
              const index = blocks.findIndex(block => block.id === id)
              if (index !== -1) {
                setSelectedBlockIndex(index)
              }
            }
          }}
          onDeleteBlock={(id: string) => {
            const index = blocks.findIndex(block => block.id === id)
            if (index !== -1) {
              handleBlockDelete(index)
            }
          }}
          onDuplicateBlock={(id: string) => {
            const index = blocks.findIndex(block => block.id === id)
            if (index !== -1) {
              handleBlockDuplicate(index)
            }
          }}
          shopName={shopName}
          onShopNameChange={setShopName}
          onBlockMove={(fromIndex: number, toIndex: number) => {
            const newBlocks = [...blocks]
            const [movedBlock] = newBlocks.splice(fromIndex, 1)
            newBlocks.splice(toIndex, 0, movedBlock)
            handleBlocksReorder(newBlocks)
          }}
        />
      </div>

      {/* Модальные окна */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  )
} 
