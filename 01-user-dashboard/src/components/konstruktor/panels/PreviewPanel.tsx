'use client';

import { useState, useEffect } from 'react';
import TelegramBannerBlock from '@/blocks/TelegramBannerBlock';
import TelegramProductBlock from '@/blocks/TelegramProductBlock';
import TelegramCategoriesBlock from '@/blocks/TelegramCategoriesBlock';
import TelegramSliderBlock from '@/blocks/TelegramSliderBlock';
import TelegramContactsBlock from '@/blocks/TelegramContactsBlock';
import TelegramMapBlock from '@/blocks/TelegramMapBlock';

interface PreviewPanelProps {
  blocks: any[];
  selectedBlockId: string | null;
  onBlockSelect: (blockId: string | null) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockDuplicate: (blockId: string) => void;
  onBlockMove: (fromIndex: number, toIndex: number) => void;
  activeMode: 'mobile' | 'tablet';
  onModeChange: (mode: 'mobile' | 'tablet') => void;
}

export default function PreviewPanel({
  blocks,
  selectedBlockId,
  onBlockSelect,
  onBlockDelete,
  onBlockDuplicate,
  onBlockMove,
  activeMode,
  onModeChange
}: PreviewPanelProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'new-block' | 'existing-block' | null>(null);
  const [lastDropEventId, setLastDropEventId] = useState<string | null>(null);

  const [onBlockAdd, setOnBlockAdd] = useState<((blockType: string, blockData: any, insertIndex?: number) => void) | null>(null);

  // Глобальные обработчики для отслеживания drag операций из других компонентов
  useEffect(() => {
    const handleGlobalDragStart = () => {
      setIsDragging(true);
      
      // Проверяем наличие класса на body для определения типа
      setTimeout(() => {
        if (document.body.classList.contains('dragging-new-block')) {
          setDragType('new-block');
        } else {
          setDragType('existing-block');
        }
      }, 0);
    };

    const handleGlobalDragEnd = () => {
      setIsDragging(false);
      setDragType(null);
      
      // Очищаем классы
      document.body.classList.remove('dragging-new-block');
    };

    // Слушаем drag события на всем документе
    document.addEventListener('dragstart', handleGlobalDragStart);
    document.addEventListener('dragend', handleGlobalDragEnd);

    return () => {
      document.removeEventListener('dragstart', handleGlobalDragStart);
      document.removeEventListener('dragend', handleGlobalDragEnd);
    };
  }, []);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    setIsDragging(true);
    setDragType('existing-block');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({
      type: 'existing-block',
      index: index
    }));
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '1';
    setDraggedIndex(null);
    setDragOverIndex(null);
    setIsDragging(false);
    setDragType(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation(); // ОСТАНАВЛИВАЕМ ВСПЛЫТИЕ!
    
    // Создаем уникальный ID для этого события
    const eventId = `${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Проверяем, не обрабатывали ли мы уже это событие недавно
    if (lastDropEventId && Date.now() - parseInt(lastDropEventId.split('_')[0]) < 100) {
      return;
    }
    
    setLastDropEventId(eventId);
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (dragData.type === 'existing-block') {
        // Перемещение существующего блока
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
          onBlockMove(draggedIndex, dropIndex);
        }
      } else if (dragData.type === 'new-block') {
        // Добавление нового блока из левой панели
        window.dispatchEvent(new CustomEvent('addBlock', {
          detail: { blockType: dragData.blockType, insertIndex: dropIndex }
        }));
      }
    } catch (error) {
      console.error('❌ Error parsing drag data:', error);
    }
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Обработчики для drop зоны в пустой области
  const handleEmptyAreaDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ОСТАНАВЛИВАЕМ ВСПЛЫТИЕ!
    
    // Создаем уникальный ID для этого события
    const eventId = `empty_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    // Проверяем, не обрабатывали ли мы уже это событие недавно
    if (lastDropEventId && Date.now() - parseInt(lastDropEventId.split('_')[1]) < 100) {
      return;
    }
    
    setLastDropEventId(eventId);
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
      
      if (dragData.type === 'new-block') {
        window.dispatchEvent(new CustomEvent('addBlock', {
          detail: { blockType: dragData.blockType }
        }));
      }
    } catch (error) {
      console.error('❌ Error parsing empty area drag data:', error);
    }
  };

  const handleEmptyAreaDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const renderBlock = (block: any, index: number) => {
    const isSelected = block.id === selectedBlockId;
    
    return (
      <div
        className={`preview-block ${isSelected ? 'selected' : ''}`}
        onClick={() => onBlockSelect(block.id)}
      >
        <div className="p-2">
          {renderBlockContent(block)}
        </div>

        <div className="block-controls">
          <button
            className="block-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              onBlockDuplicate(block.id);
            }}
            title="Дублировать"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            className="block-control-btn"
            onClick={(e) => {
              e.stopPropagation();
              onBlockDelete(block.id);
            }}
            title="Удалить"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderBlockContent = (block: any) => {
    const data = block.data || {};
    const isSelected = block.id === selectedBlockId;
    
    switch (block.type) {
      // Telegram блоки
      case 'telegram-banner':
        return <TelegramBannerBlock data={data} isSelected={isSelected} />;
      case 'telegram-product':
        return <TelegramProductBlock data={data} isSelected={isSelected} />;
      case 'telegram-categories':
        return <TelegramCategoriesBlock data={data} isSelected={isSelected} />;
      case 'telegram-slider':
        return <TelegramSliderBlock data={data} isSelected={isSelected} />;
      case 'telegram-contacts':
        return <TelegramContactsBlock data={data} isSelected={isSelected} />;
      case 'telegram-map':
        return <TelegramMapBlock data={data} isSelected={isSelected} />;
      
      case 'banner':
        return (
          <div className="text-center" style={{ backgroundColor: data.backgroundColor || '#f8f9fa', padding: '16px 12px' }}>
            <h2 className="text-lg font-bold mb-1">{data.title || 'Заголовок баннера'}</h2>
            <p className="text-gray-600 text-sm">{data.description || 'Описание баннера'}</p>
          </div>
        );
      
      case 'text':
        return (
          <div className="p-2">
            <p style={{ color: data.color || '#333' }}>
              {data.content || 'Текстовый блок'}
            </p>
          </div>
        );
      
      case 'button':
        return (
          <div className="p-2 text-center">
            <button className="bg-gray-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm">
              {data.text || 'Кнопка'}
            </button>
          </div>
        );
      
      case 'product':
        return (
          <div className="p-2 border rounded-lg">
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{data.name || 'Название товара'}</h3>
                <p className="text-gray-600 text-xs">{data.description || 'Описание товара'}</p>
                <p className="text-base font-bold text-gray-900">{data.price || 1000} ₽</p>
              </div>
            </div>
          </div>
        );
      
      case 'spacer':
        return (
          <div 
            className="bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 text-xs"
            style={{ height: data.height || '20px' }}
          >
            Отступ {data.height || '20px'}
          </div>
        );
      
      default:
        return (
          <div className="p-2 bg-gray-50 rounded-lg text-center">
            <div className="text-lg mb-1">🧩</div>
            <div className="text-xs font-medium text-gray-700">
              {block.type}
            </div>
            <div className="text-xs text-gray-500">
              Блок конструктора
            </div>
          </div>
        );
    }
  };

  // Функция для рендеринга drop-зоны
  const renderDropZone = (index: number, label: string) => {
    const isActive = dragOverIndex === index;
    const isHighlighted = isDragging;
    
    return (
      <div
        key={`drop-zone-${index}`}
        className={`drop-zone ${isHighlighted ? 'visible' : ''} ${isActive ? 'active' : ''}`}
        onDrop={(e) => handleDrop(e, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        data-drop-index={index}
      >
        <div className="drop-zone-content">
          <div className="drop-zone-icon">⊞</div>
          <div className="drop-zone-text">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div className="preview-modes">
          <button
            onClick={() => onModeChange('mobile')}
            className={`preview-mode-btn ${activeMode === 'mobile' ? 'active' : ''}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
            </svg>
            Мобильный
          </button>
          <button
            onClick={() => onModeChange('tablet')}
            className={`preview-mode-btn ${activeMode === 'tablet' ? 'active' : ''}`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a1 1 0 001-1V4a1 1 0 00-1-1H7a1 1 0 00-1 1v16a1 1 0 001 1z" />
            </svg>
            Планшет
          </button>
        </div>

        <div className="preview-meta">
          {blocks.length} блоков
        </div>
      </div>

      <div className="preview-canvas">
        <div 
          className={`preview-device ${activeMode} ${isDragging ? 'dragging-active' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          }}
        >
          {/* Кнопки громкости */}
          <div className="volume-buttons"></div>
          
          {/* Экран */}
          <div 
            className="screen"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
          >
            {blocks.length === 0 ? (
              <div 
                className="preview-empty"
                onDrop={handleEmptyAreaDrop}
                onDragOver={handleEmptyAreaDragOver}
              >
                <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                  <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Перетащите блок сюда</h3>
                  <p className="text-sm max-w-xs">Выберите блок из левой панели и перетащите его сюда или кликните для добавления</p>
                </div>
              </div>
            ) : (
              <div className="blocks-container">
                {blocks
                  .sort((a, b) => a.order - b.order)
                  .map((block, index) => (
                    <div key={block.id}>
                      {renderBlock(block, index)}
                    </div>
                  ))}
                
                {/* Одна drop-зона в конце для новых блоков */}
                {isDragging && dragType === 'new-block' && (
                  <div 
                    className="drop-zone visible"
                    onDrop={handleEmptyAreaDrop}
                    onDragOver={handleEmptyAreaDragOver}
                  >
                    <div className="drop-zone-content">
                      <div className="drop-zone-icon">⊞</div>
                      <div className="drop-zone-text">Добавить новый блок</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 