import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  bordered?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  footer,
  bordered = true,
  hover = false,
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 
        rounded-lg overflow-hidden 
        shadow-sm
        ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}
        ${hover ? 'transition-all duration-200 hover:shadow-md' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};