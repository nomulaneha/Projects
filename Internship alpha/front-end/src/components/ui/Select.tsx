import React, { SelectHTMLAttributes } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: Option[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  helperText,
  error,
  fullWidth = false,
  className = '',
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        {...props}
        onChange={handleChange}
        className={`
          px-4 py-2 bg-white dark:bg-gray-800 border 
          ${error ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'} 
          rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0
          block w-full
          ${className}
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>}
    </div>
  );
};