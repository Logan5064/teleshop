'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { BlockData, BlockType } from '@/types/blocks'
import { getBlockDefaults } from '@/core/config/blockDefaults'
import { blockCategories } from '@/core/config/categories'
import { TEMPLATES } from '@/core/config/templates'

// SSO авторизация
import { ConstructorAuth, constructorUtils } from '@/lib/ssoIntegration'

// Компоненты конструктора
import TopPanel from '@/components/panels/TopPanel'
import BlockSelector from '@/components/panels/BlockSelector'
import PreviewPanel from '@/components/panels/PreviewPanel'
import SettingsPanel from '@/components/panels/SettingsPanel'
import TemplateModal from '@/components/modals/TemplateModal'

export default function ConstructorApp() {
  console.log('🚀 ConstructorApp component initialized');
  
  // SSO состояние
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  
  // Состояние конструктора
  const [blocks, setBlocks] = useState<BlockData[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('basic')
  const [previewMode, setPreviewMode] = useState<'mobile' | 'tablet'>('mobile')
  const [lastSaved, setLastSaved] = useState<string>('')
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [shopName, setShopName] = useState<string>('Мой магазин')

  // SSO инициализация
  useEffect(() => {
    async function initializeAuth() {
      try {
        console.log('🔐 Initializing SSO for constructor...')
        const authState = await ConstructorAuth.initialize()
        
        if (authState.isAuthenticated && authState.user) {
          setCurrentUser(authState.user)
          setAuthError(null)
          console.log('✅ SSO initialized successfully:', authState.user)
        } else {
          setAuthError('Не удалось авторизоваться')
        }
      } catch (error) {
        console.error('❌ SSO initialization failed:', error)
        setAuthError('Ошибка авторизации')
      } finally {
        setAuthLoading(false)
      }
    }

    initializeAuth()
  }, [])

  console.log('📊 Current blocks count:', blocks.length);

  // История для undo/redo
  const [history, setHistory] = useState<BlockData[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const maxHistorySize = 50

  // Создание блока
  const createBlock = useCallback((type: BlockType): BlockData => {
    const id = `block_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    
    return {
      id,
      type,
      data: getBlockDefaults(type),
      order: blocks.length
    }
  }, [blocks.length])

  // Добавление блока в историю
  const addToHistory = useCallback((newBlocks: BlockData[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push([...newBlocks])
      
      if (newHistory.length > maxHistorySize) {
        return newHistory.slice(-maxHistorySize)
      }
      return newHistory
    })
    setHistoryIndex(prev => Math.min(prev + 1, maxHistorySize - 1))
  }, [historyIndex])

  // Операции с блоками
  const addBlock = useCallback((type: BlockType, insertIndex?: number) => {
    console.log('🔥 addBlock called with:', { type, insertIndex });
    const newBlock = createBlock(type)
    console.log('🏗️ Created new block:', newBlock);
    
    let newBlocks: BlockData[]
    if (insertIndex !== undefined && insertIndex >= 0 && insertIndex <= blocks.length) {
      // Вставляем блок в определенную позицию
      console.log('📍 Inserting at specific index:', insertIndex);
      newBlocks = [
        ...blocks.slice(0, insertIndex),
        newBlock,
        ...blocks.slice(insertIndex)
      ]
      // Перенумеровываем порядок блоков
      newBlocks = newBlocks.map((block, index) => ({ ...block, order: index }))
    } else {
      // Добавляем в конец
      console.log('📌 Adding to end');
      newBlocks = [...blocks, newBlock]
    }
    
    console.log('📊 New blocks array:', newBlocks);
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlockId(newBlock.id)
    console.log('🎯 Block added and selected:', newBlock.id);
  }, [blocks, createBlock, addToHistory])

  const deleteBlock = useCallback((id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id)
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    if (selectedBlockId === id) {
      setSelectedBlockId(null)
    }
  }, [blocks, selectedBlockId, addToHistory])

  const moveBlockByIndices = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= blocks.length || toIndex < 0 || toIndex >= blocks.length) {
      return
    }
    
    const newBlocks = [...blocks]
    const [movedBlock] = newBlocks.splice(fromIndex, 1)
    newBlocks.splice(toIndex, 0, movedBlock)
    
    // Перенумеровываем порядок блоков
    const reorderedBlocks = newBlocks.map((block, index) => ({ ...block, order: index }))
    setBlocks(reorderedBlocks)
    addToHistory(reorderedBlocks)
  }, [blocks, addToHistory])

  const duplicateBlock = useCallback((id: string) => {
    const blockToDuplicate = blocks.find(block => block.id === id)
    if (!blockToDuplicate) return
    
    const newBlock = createBlock(blockToDuplicate.type)
    newBlock.data = { ...blockToDuplicate.data }
    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlockId(newBlock.id)
  }, [blocks, createBlock, addToHistory])

  const editBlock = useCallback((id: string, newData: Record<string, unknown>) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, data: newData } : block
    )
    setBlocks(newBlocks)
    addToHistory(newBlocks)
  }, [blocks, addToHistory])

  // Undo/Redo
  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  const undo = useCallback(() => {
    if (canUndo) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setBlocks([...history[newIndex]])
    }
  }, [canUndo, historyIndex, history])

  const redo = useCallback(() => {
    if (canRedo) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setBlocks([...history[newIndex]])
    }
  }, [canRedo, historyIndex, history])

  // Шаблоны
  const applyTemplate = useCallback((templateId: string) => {
    const template = TEMPLATES.find(t => t.id === templateId)
    if (!template) return

    const templateBlocks = template.blocks.map((block, index) => ({
      ...block,
      id: `template_${Date.now()}_${index}`,
      order: index
    }))
    
    setBlocks(templateBlocks)
    addToHistory(templateBlocks)
    setSelectedBlockId(null)
    setLastSaved('Шаблон применен')
    setIsTemplateModalOpen(false)
  }, [addToHistory])

  // Автосохранение
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (blocks.length > 0 && currentUser) {
        const saveKey = `teleshop_constructor_autosave_${constructorUtils.getUserId()}`
        localStorage.setItem(saveKey, JSON.stringify(blocks))
        setLastSaved(new Date().toLocaleTimeString())
      }
    }, 2000)

    return () => clearTimeout(autoSaveTimer)
  }, [blocks, currentUser])

  // Обработчик событий drag & drop
  useEffect(() => {
    console.log('🔧 Setting up CustomEvent listener');
    
    const handleAddBlock = (event: Event) => {
      console.log('🎧 Raw event received:', event);
      
      if (event instanceof CustomEvent) {
        console.log('🎧 CustomEvent received:', event.detail);
        const { blockType, insertIndex } = event.detail;
        console.log('📝 Adding block:', blockType, 'at index:', insertIndex);
        
        try {
          addBlock(blockType as BlockType, insertIndex);
          console.log('✅ Block added successfully');
        } catch (error) {
          console.error('❌ Error adding block:', error);
        }
      } else {
        console.error('❌ Event is not CustomEvent:', event);
      }
    }

    window.addEventListener('addBlock', handleAddBlock);
    console.log('👂 Listener attached to window');
    
    return () => {
      console.log('🧹 Cleaning up CustomEvent listener');
      window.removeEventListener('addBlock', handleAddBlock);
    }
  }, [addBlock])

  // Горячие клавиши
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') || 
                 ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault()
        redo()
      } else if (e.key === 'Delete' && selectedBlockId) {
        e.preventDefault()
        deleteBlock(selectedBlockId)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, selectedBlockId, deleteBlock])

  // Адаптеры для компонентов
  const handleBlockAdd = useCallback((blockType: string, blockData: any) => {
    addBlock(blockType as BlockType)
  }, [addBlock])

  const handleBlockMove = useCallback((fromIndex: number, toIndex: number) => {
    moveBlockByIndices(fromIndex, toIndex)
  }, [moveBlockByIndices])

  const handleBlockChange = useCallback((newData: Record<string, unknown>) => {
    if (selectedBlockId) {
      editBlock(selectedBlockId, newData)
    }
  }, [selectedBlockId, editBlock])

  const handleBlockUpdate = useCallback((blockId: string, newData: Record<string, unknown>) => {
    editBlock(blockId, newData)
  }, [editBlock])

  const handleTemplateSelect = useCallback((templateId: string) => {
    applyTemplate(templateId)
  }, [applyTemplate])

  // Показываем загрузку авторизации
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Проверяем авторизацию...</h2>
          <p className="text-gray-600">Подождите пожалуйста</p>
        </div>
      </div>
    )
  }

  // Показываем ошибку авторизации
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Ошибка авторизации</h2>
          <p className="text-gray-600 mb-4">{authError}</p>
          <button
            onClick={() => ConstructorAuth.redirectToLogin()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Авторизоваться
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="ts-page-bg constructor-container">
      {/* Верхняя панель */}
      <TopPanel
        canUndo={canUndo}
        canRedo={canRedo}
        lastSaved={lastSaved}
        blocksCount={blocks.length}
        blocks={blocks}
        currentUser={currentUser}
        onUndo={undo}
        onRedo={redo}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
        onSave={() => {
          if (currentUser) {
            const saveKey = `teleshop_constructor_saved_${constructorUtils.getUserId()}`
            localStorage.setItem(saveKey, JSON.stringify(blocks))
            setLastSaved(new Date().toLocaleTimeString())
            alert('✅ Проект сохранен!')
          }
        }}
        onPublish={() => {
          if (blocks.length === 0) {
            alert('⚠️ Нельзя опубликовать пустой магазин')
            return
          }
          alert(`🚀 Магазин опубликован! Блоков: ${blocks.length}`)
        }}
      />

      <div className="flex flex-1">
        {/* Левая панель - блоки */}
        <BlockSelector
          onBlockAdd={handleBlockAdd}
        />

        {/* Центральная панель - предпросмотр */}
        <PreviewPanel
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onBlockSelect={setSelectedBlockId}
          onBlockDelete={deleteBlock}
          onBlockDuplicate={duplicateBlock}
          onBlockMove={handleBlockMove}
          activeMode={previewMode}
          onModeChange={setPreviewMode}
        />

        {/* Правая панель - настройки */}
        <SettingsPanel
          selectedBlock={blocks.find(b => b.id === selectedBlockId) || null}
          onBlockUpdate={handleBlockUpdate}
          onBlockDelete={deleteBlock}
          blocks={blocks}
          onBlockSelect={setSelectedBlockId}
          shopName={shopName}
          onShopNameChange={setShopName}
        />
      </div>

      {/* Модальное окно шаблонов */}
      {isTemplateModalOpen && (
        <TemplateModal
          onTemplateSelect={handleTemplateSelect}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </div>
  )
} 