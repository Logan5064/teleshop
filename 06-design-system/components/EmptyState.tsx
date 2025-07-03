import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <div className="ts-empty-state">
      <div className="ts-empty-state-icon">
        {icon}
      </div>
      <h3 className="ts-empty-state-title">{title}</h3>
      {description && (
        <p className="ts-empty-state-description">{description}</p>
      )}
      {action && action}
    </div>
  );
}; 