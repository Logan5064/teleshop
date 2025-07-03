import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'normal' | 'small';
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  icon,
  onClick,
  disabled = false,
  className = ''
}) => {
  const variantClasses = {
    primary: 'ts-btn-primary',
    secondary: 'ts-btn-secondary', 
    success: 'ts-btn-success',
    danger: 'ts-btn-danger'
  };

  const sizeClasses = {
    normal: '',
    small: 'ts-btn-small'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`ts-btn ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`ts-btn-icon ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}; 