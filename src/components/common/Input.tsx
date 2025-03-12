import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | undefined;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = '',
    fullWidth = true,
    ...rest
  },
  ref
) => {
  const inputClasses = `
    block w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md shadow-sm
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    focus:outline-none focus:ring-2 focus:ring-offset-0
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
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
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

Input.displayName = 'Input';

export default Input;