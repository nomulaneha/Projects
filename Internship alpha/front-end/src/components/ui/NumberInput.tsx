import React, { useState, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from './Button';

interface NumberInputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 150,
  step = 1,
  helperText,
  error,
  fullWidth = false,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    const parsedValue = parseInt(newValue);
    if (!isNaN(parsedValue) && parsedValue >= min && parsedValue <= max) {
      onChange(parsedValue);
    }
  };

  const handleBlur = () => {
    const parsedValue = parseInt(inputValue);
    if (isNaN(parsedValue)) {
      setInputValue(value.toString());
    } else {
      const clampedValue = Math.min(Math.max(parsedValue, min), max);
      setInputValue(clampedValue.toString());
      onChange(clampedValue);
    }
  };

  const increment = () => {
    const newValue = Math.min(value + step, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - step, min);
    onChange(newValue);
  };

  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={decrement}
          disabled={value <= min}
          className="p-2"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={`
            block w-20 px-3 py-2 text-center
            bg-white dark:bg-gray-800 border
            ${error ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500 focus:border-primary-500'}
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0
          `}
        />
        <Button
          variant="outline"
          onClick={increment}
          disabled={value >= max}
          className="p-2"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {helperText && !error && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
      {error && <p className="mt-1 text-sm text-danger-600 dark:text-danger-400">{error}</p>}
    </div>
  );
}; 