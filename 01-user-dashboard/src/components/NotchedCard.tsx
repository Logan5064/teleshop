import React, { ReactNode } from 'react';

interface NotchedCardProps {
  onClick?: () => void;
  glow?: boolean;
  cornerButton?: ReactNode;
  className?: string;
  children: ReactNode;
}

export const NotchedCard = ({ onClick, glow, cornerButton, className = '', children }: NotchedCardProps) => {
  return (
    <div 
      className={`relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${glow ? 'hover:shadow-orange-100 hover:border-orange-200' : ''} ${className}`}
      onClick={onClick}
    >
      {cornerButton && (
        <div className="absolute -top-2 -right-2 z-10">
          {cornerButton}
        </div>
      )}
      {children}
    </div>
  );
}; 
