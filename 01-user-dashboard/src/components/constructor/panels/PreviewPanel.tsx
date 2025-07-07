'use client';

import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { BlockData } from '@/types/blocks';
import {
  TelegramBanner,
  TelegramProduct,
  TelegramCategories,
  TelegramSlider,
  TelegramContacts,
  TelegramMap
} from '../blocks/TelegramBlocks';
import {
  TextBlock,
  ImageBlock,
  ButtonBlock,
  SpacerBlock,
  TabsBlock,
  FormBlock
} from '../blocks/BasicBlocks';

interface PreviewPanelProps {
  blocks: BlockData[];
  onBlocksReorder: (newBlocks: BlockData[]) => void;
  onBlockSelect: (index: number) => void;
  selectedBlockIndex: number | null;
  onBlockDelete: (index: number) => void;
  onBlockDuplicate: (index: number) => void;
}

export default function PreviewPanel({
  blocks,
  onBlocksReorder,
  onBlockSelect,
  selectedBlockIndex,
  onBlockDelete,
  onBlockDuplicate
}: PreviewPanelProps) {
  const renderBlock = (block: BlockData, index: number) => {
    const isSelected = selectedBlockIndex === index;
    const blockProps = {
      block,
      isEditing: isSelected,
      onEdit: (id: string, newData: any) => {
        // Обработка изменений блока
      },
      onDelete: () => onBlockDelete(index),
      onDuplicate: () => onBlockDuplicate(index)
    };

    switch (block.type) {
      case 'telegram-banner':
        return <TelegramBanner {...blockProps} />;
      case 'telegram-product':
        return <TelegramProduct {...blockProps} />;
      case 'telegram-categories':
        return <TelegramCategories {...blockProps} />;
      case 'telegram-slider':
        return <TelegramSlider {...blockProps} />;
      case 'telegram-contacts':
        return <TelegramContacts {...blockProps} />;
      case 'telegram-map':
        return <TelegramMap {...blockProps} />;
      case 'text':
        return <TextBlock {...blockProps} />;
      case 'image':
        return <ImageBlock {...blockProps} />;
      case 'button':
        return <ButtonBlock {...blockProps} />;
      case 'spacer':
        return <SpacerBlock {...blockProps} />;
      case 'tabs':
        return <TabsBlock {...blockProps} />;
      case 'form':
        return <FormBlock {...blockProps} />;
      default:
        return (
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="text-gray-500">
              Блок типа {block.type} пока не реализован
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <Reorder.Group
          axis="y"
          values={blocks}
          onReorder={onBlocksReorder}
          className="space-y-8"
        >
          {blocks.map((block, index) => (
            <Reorder.Item
              key={block.id}
              value={block}
              className="relative"
            >
              <motion.div
                layoutId={block.id}
                onClick={() => onBlockSelect(index)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedBlockIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {renderBlock(block, index)}
                
                {/* Панель управления блоком */}
                {selectedBlockIndex === index && (
                  <div className="absolute top-2 right-2 flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBlockDuplicate(index);
                      }}
                      className="p-1 text-gray-600 hover:text-gray-900"
                      title="Дублировать"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onBlockDelete(index);
                      }}
                      className="p-1 text-gray-600 hover:text-red-600"
                      title="Удалить"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                )}
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
} 
