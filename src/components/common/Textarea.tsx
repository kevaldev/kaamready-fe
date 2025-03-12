import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError | undefined;
  helperText?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((
  {
    label,
    error,
    helperText,
    className = '',
    fullWidth = true,
    rows = 4,
    ...rest
  },
  ref
) => {
  const textareaClasses = `
    block w-full px-4 py-2 text-gray-900 placeholder-gray-500 border rounded-md shadow-sm
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
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
        <textarea
          ref={ref}
          className={textareaClasses}
          rows={rows}
          {...rest}
        />
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

Textarea.displayName = 'Textarea';

export default Textarea;