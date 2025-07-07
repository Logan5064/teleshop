'use client'

import React from 'react'

interface PhoneFrameProps {
  children: React.ReactNode
  className?: string
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Frame - упрощенный дизайн */}
      <div className="relative mx-auto scale-75">
        {/* Outer frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Inner frame */}
          <div className="bg-gray-800 rounded-[2.5rem] p-1">
            {/* Screen - чистый экран без лишних элементов */}
            <div className="bg-white rounded-[2rem] overflow-hidden relative">
              {/* Content area - увеличенная область для контента */}
              <div className="w-[375px] h-[812px] bg-white overflow-hidden relative">
                <div className="h-full overflow-y-auto px-4 py-6">
                  {children}
                </div>
                
                {/* Home indicator - тонкая полоска внизу */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Side buttons - минимальные кнопки */}
        <div className="absolute -left-1 top-24">
          <div className="w-1 h-12 bg-gray-700 rounded-l"></div>
        </div>
        <div className="absolute -left-1 top-40">
          <div className="w-1 h-16 bg-gray-700 rounded-l"></div>
        </div>
        <div className="absolute -right-1 top-32">
          <div className="w-1 h-20 bg-gray-700 rounded-r"></div>
        </div>
      </div>
    </div>
  )
}

export default PhoneFrame 
