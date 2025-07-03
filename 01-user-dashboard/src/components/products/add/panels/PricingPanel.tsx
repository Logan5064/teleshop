import React from 'react';

import { ProductFormProps } from '@/types/product'

interface PricingPanelProps extends ProductFormProps {}

export const PricingPanel = ({ productForm, setProductForm }: PricingPanelProps) => {
  return (
    <div className="space-y-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Цена *</label>
          <input
            type="number"
            value={productForm.price}
            onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(Number(e.target.value) || 0) || 0 }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Старая цена</label>
          <input
            type="number"
            value={productForm.oldPrice}
            onChange={(e) => setProductForm(prev => ({ ...prev, oldPrice: Number(Number(e.target.value) || 0) || 0 }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Количество</label>
          <input
            type="number"
            value={productForm.quantity}
            onChange={(e) => setProductForm(prev => ({ ...prev, quantity: Number(Number(e.target.value) || 0) || 0 }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}; 

