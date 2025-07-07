import React from 'react'
import { cn } from '@/lib/utils'

interface CornerButtonProps {
  onClick?: () => void
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

export const CornerButton: React.FC<CornerButtonProps> = ({
  onClick,
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false
}) => {
  const baseClasses = 'relative overflow-hidden transition-all duration-200 font-medium rounded-xl border focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-gray-700 text-white border-gray-600 hover:bg-gray-800 focus:ring-gray-500',
    secondary: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 focus:ring-gray-400',
    danger: 'bg-red-600 text-white border-red-500 hover:bg-red-700 focus:ring-red-400'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base', 
    lg: 'px-6 py-3 text-lg'
  }
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer hover:scale-105 active:scale-95'

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
    >
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-white bg-opacity-20 transform rotate-45 translate-x-1.5 -translate-y-1.5" />
    </button>
  )
}

export default CornerButton 
