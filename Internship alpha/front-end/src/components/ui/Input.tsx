import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  fullWidth = false,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`
            px-4 py-2 bg-white dark:bg-gray-800 border 
            ${error ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'} 
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0
            w-full
            ${icon && iconPosition === 'left' ? 'pl-10' : ''}
            ${icon && iconPosition === 'right' ? 'pr-10' : ''}
            ${className}
          `}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>}
    </div>
  );
};