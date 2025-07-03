import React from 'react';

import { ProductFormProps } from '@/types/product'

interface StatusPanelProps extends ProductFormProps {}

export const StatusPanel = ({ productForm, setProductForm }: StatusPanelProps) => {
  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="inStock"
              checked={productForm.inStock}
              onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="inStock" className="text-sm font-semibold text-gray-700">
              В наличии
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isNew"
              checked={productForm.isNew}
              onChange={(e) => setProductForm(prev => ({ ...prev, isNew: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isNew" className="text-sm font-semibold text-gray-700">
              Новинка
            </label>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPopular"
              checked={productForm.isPopular}
              onChange={(e) => setProductForm(prev => ({ ...prev, isPopular: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPopular" className="text-sm font-semibold text-gray-700">
              Популярный
            </label>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isOnOrder"
              checked={productForm.isOnOrder}
              onChange={(e) => setProductForm(prev => ({ ...prev, isOnOrder: e.target.checked }))}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isOnOrder" className="text-sm font-semibold text-gray-700">
              Под заказ
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}; 