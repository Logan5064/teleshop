'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useAutoSave } from '@/core/hooks/useAutoSave'
import { useUndoRedo } from '@/core/hooks/useUndoRedo'
import TemplateModal from '@/components/modals/TemplateModal'
import BlockSelector from '@/components/panels/BlockSelector'
import PreviewPanel from '@/components/panels/PreviewPanel'
import SettingsPanel from '@/components/panels/SettingsPanel'
import { shopTemplates } from '@/templates/shopTemplates'
import '@/styles/constructor.css'

export default function ConstructorPage() {
  const [blocks, setBlocks] = useState<any[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false)
  const [activeMode, setActiveMode] = useState<'mobile' | 'tablet'>('mobile')
  const [shopName, setShopName] = useState('Мой магазин')
  const [isAddingBlock, setIsAddingBlock] = useState(false) // Защита от дублирования
  
  // Ref для стабильной ссылки на addBlock функцию
  const addBlockRef = useRef<(blockType: string, blockData?: any, insertIndex?: number) => void>();
  
  // Ref для защиты от дублирования событий
  const lastEventRef = useRef<{ type: string, time: number } | null>(null);

  // Автосохранение
  const { saveStatus, lastSaved } = useAutoSave(blocks, {
    interval: 2000,
    onSave: async (data) => {
      try {
        // Импортируем API клиент и утилиты
        const { teleShopAPI } = await import('@/lib/api');
        const { constructorUtils } = await import('@/lib/ssoIntegration');
        
        // Получаем данные пользователя (заглушки)
        const userId = 'demo_user';
        const userName = 'Demo User';
        
        // Формируем данные для сохранения
        const designData = {
          shopId: `shop_${userId}_${Date.now()}`,
          userId: userId,
          blocks: data,
          colors: {
            primary: '#007bff',
            secondary: '#6c757d'
          },
          name: shopName || `Дизайн ${userName}`
        };
        
        // Сохраняем в реальный API
        const result = await teleShopAPI.saveDesign(designData);
        console.log('✅ Автосохранение выполнено:', result);
        
      } catch (error) {
        console.error('❌ Ошибка автосохранения:', error);
        // Не прерываем работу конструктора из-за ошибки сохранения
      }
    }
  });

  // Отмена/Повтор
  const { undo, redo, canUndo, canRedo } = useUndoRedo(blocks, setBlocks, {
    maxHistory: 50
  });

  // Управление блоками - НЕЗАВИСИМАЯ ФУНКЦИЯ
  const addBlock = useCallback((blockType: string, blockData: any = {}, insertIndex?: number) => {
    const newBlock = {
      id: Date.now().toString() + '_' + Math.random().toString(36).substring(7),
      type: blockType,
      data: blockData,
      order: insertIndex !== undefined ? insertIndex : 0
    };
    
    // Используем функциональное обновление - НЕ ЗАВИСИТ ОТ ТЕКУЩЕГО СОСТОЯНИЯ
    setBlocks(prevBlocks => {
      let newBlocks: any[];
      
      if (insertIndex !== undefined && insertIndex >= 0) {
        newBlocks = [
          ...prevBlocks.slice(0, insertIndex),
          newBlock,
          ...prevBlocks.slice(insertIndex)
        ];
        newBlocks = newBlocks.map((block, index) => ({ ...block, order: index }));
      } else {
        newBlocks = [...prevBlocks, { ...newBlock, order: prevBlocks.length }];
      }
      
      return newBlocks;
    });
    
    setSelectedBlockId(newBlock.id);
  }, []); // БЕЗ ЗАВИСИМОСТЕЙ СОВСЕМ

  // Сохраняем ссылку на функцию в ref
  addBlockRef.current = addBlock;

  const updateBlock = (blockId: string, newData: any) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, data: { ...block.data, ...newData } } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    setBlocks(prev => {
      const newBlocks = [...prev];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return newBlocks.map((block, index) => ({ ...block, order: index }));
    });
  };

  const duplicateBlock = (blockId: string) => {
    const blockToDuplicate = blocks.find(b => b.id === blockId);
    if (blockToDuplicate) {
      const newBlock = {
        ...blockToDuplicate,
        id: Date.now().toString(),
        order: blocks.length
      };
      setBlocks(prev => [...prev, newBlock]);
    }
  };

  const selectBlock = (blockId: string | null) => {
    setSelectedBlockId(blockId);
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Применение шаблона
  const applyTemplate = (templateId: string) => {
    const template = shopTemplates.find(t => t.id === templateId);
    if (template) {
      setBlocks(template.blocks);
      setShopName(template.name);
      setSelectedBlockId(null);
      setIsTemplateModalOpen(false);
    }
  };

  // Экспорт/Импорт
  const exportShop = () => {
    const shopData = {
      name: shopName,
      blocks,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(shopData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${shopName}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importShop = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const shopData = JSON.parse(e.target?.result as string);
          setBlocks(shopData.blocks || []);
          setShopName(shopData.name || 'Импортированный магазин');
          setSelectedBlockId(null);
        } catch (error) {
          console.error('Ошибка импорта:', error);
          alert('Ошибка при импорте файла');
        }
      };
      reader.readAsText(file);
    }
  };

  // Клавиатурные сокращения
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            exportShop();
            break;
          case 'o':
            e.preventDefault();
            document.getElementById('import-input')?.click();
            break;
          case 'n':
            e.preventDefault();
            setIsTemplateModalOpen(true);
            break;
        }
      }
      
      if (e.key === 'Delete' && selectedBlockId) {
        deleteBlock(selectedBlockId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedBlockId]);

  // Обработчик событий drag & drop - ОДИН РАЗ БЕЗ ЗАВИСИМОСТЕЙ
  useEffect(() => {
    const handleAddBlock = (event: Event) => {
      if (event instanceof CustomEvent) {
        const { blockType, insertIndex } = event.detail;
        
        // Защита от дублирования событий
        const now = Date.now();
        const eventKey = `${blockType}_${insertIndex}`;
        
        if (lastEventRef.current && 
            lastEventRef.current.type === eventKey && 
            now - lastEventRef.current.time < 1000) {
          return;
        }
        
        lastEventRef.current = { type: eventKey, time: now };
        
        try {
          // Используем ref вместо прямого вызова addBlock
          if (addBlockRef.current) {
            addBlockRef.current(blockType, {}, insertIndex);
          }
        } catch (error) {
          console.error('❌ Error adding block:', error);
        }
      } else {
        console.error('❌ Event is not CustomEvent:', event);
      }
    }

    window.addEventListener('addBlock', handleAddBlock);
    
    return () => {
      window.removeEventListener('addBlock', handleAddBlock);
    }
  }, []); // БЕЗ ЗАВИСИМОСТЕЙ!

  return (
    <div className="constructor-container">
      {/* Верхняя панель */}
      <div className="top-panel">
        <div className="top-panel-left">
          <div className="top-panel-logo">
            TeleShop Constructor
          </div>
          <div className="top-panel-meta">
            {shopName}
          </div>
        </div>

        <div className="top-panel-center">
          <div className="autosave-indicator">
            {saveStatus === 'saving' && (
              <>
                <div className="loading-spinner" />
                Сохранение...
              </>
            )}
            {saveStatus === 'saved' && (
              <>
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Сохранено {lastSaved ? new Date(lastSaved).toLocaleTimeString() : ''}
              </>
            )}
          </div>
        </div>

        <div className="top-panel-right">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="top-panel-btn secondary"
            title="Отменить (Ctrl+Z)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Отменить
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            className="top-panel-btn secondary"
            title="Повторить (Ctrl+Y)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
            </svg>
            Повторить
          </button>

          <button
            onClick={() => setIsTemplateModalOpen(true)}
            className="top-panel-btn secondary"
            title="Шаблоны (Ctrl+N)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Шаблоны
          </button>

          <button
            onClick={async () => {
              try {
                const { teleShopAPI } = await import('@/lib/api');
                
                const userId = 'demo_user';
                const designData = {
                  shopId: `shop_${userId}_${Date.now()}`,
                  userId: userId,
                  blocks: blocks,
                  colors: { primary: '#007bff', secondary: '#6c757d' },
                  name: shopName
                };
                
                const result = await teleShopAPI.saveDesign(designData);
                alert(`✅ Дизайн сохранен! ID: ${result.design_id || 'demo'}`);
              } catch (error) {
                alert(`❌ Ошибка сохранения: ${error}`);
              }
            }}
            className="top-panel-btn primary"
            title="Сохранить (Ctrl+S)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Сохранить
          </button>

          <button
            onClick={exportShop}
            className="top-panel-btn secondary"
            title="Экспорт JSON (Ctrl+E)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Экспорт
          </button>

          <input
            id="import-input"
            type="file"
            accept=".json"
            onChange={importShop}
            className="hidden"
          />

          <button
            onClick={() => document.getElementById('import-input')?.click()}
            className="top-panel-btn secondary"
            title="Импорт (Ctrl+O)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Импорт
          </button>

          <button
            onClick={() => window.open('https://t.me/teleshop_bot', '_blank')}
            className="top-panel-btn primary"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Опубликовать
          </button>
        </div>
      </div>

      {/* Основные панели */}
      <div className="constructor-panels">
        {/* Панель блоков */}
        <BlockSelector
          onBlockAdd={addBlock}
        />

        {/* Панель предпросмотра */}
        <PreviewPanel
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onBlockSelect={selectBlock}
          onBlockDelete={deleteBlock}
          onBlockDuplicate={duplicateBlock}
          onBlockMove={moveBlock}
          activeMode={activeMode}
          onModeChange={setActiveMode}
        />

        {/* Панель настроек */}
        <SettingsPanel
          selectedBlock={selectedBlock}
          onBlockUpdate={updateBlock}
          onBlockDelete={deleteBlock}
          blocks={blocks}
          onBlockSelect={selectBlock}
          shopName={shopName}
          onShopNameChange={setShopName}
          onBlockMove={moveBlock}
        />
      </div>

      {/* Модальное окно шаблонов */}
      {isTemplateModalOpen && (
        <TemplateModal
          onClose={() => setIsTemplateModalOpen(false)}
          onTemplateSelect={applyTemplate}
        />
      )}
    </div>
  )
} 