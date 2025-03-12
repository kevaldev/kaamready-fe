import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError | undefined;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    error,
    helperText,
    options,
    className = '',
    fullWidth = true,
    ...rest
  },
  ref
) => {
  const selectClasses = `
    block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm appearance-none
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
    focus:outline-none focus:ring-2 focus:ring-offset-0
    bg-white
  `;

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={rest.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;