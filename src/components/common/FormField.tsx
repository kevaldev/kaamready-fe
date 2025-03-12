import React from 'react';
import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';

type FieldType = 'input' | 'select' | 'textarea';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  fieldType?: FieldType;
  placeholder?: string;
  helperText?: string;
  options?: Array<{ value: string; label: string }>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  rows?: number;
  error?: FieldError;
  [key: string]: any;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  fieldType = 'input',
  placeholder,
  helperText,
  options = [],
  leftIcon,
  rightIcon,
  fullWidth = true,
  rows = 4,
  error,
  ...rest
}: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error: fieldError } }) => {
        const errorToUse = error || fieldError;
        
        switch (fieldType) {
          case 'select':
            return (
              <Select
                {...field}
                id={name}
                label={label}
                options={options}
                error={errorToUse}
                helperText={helperText}
                fullWidth={fullWidth}
                {...rest}
              />
            );
          case 'textarea':
            return (
              <Textarea
                {...field}
                id={name}
                label={label}
                error={errorToUse}
                helperText={helperText}
                placeholder={placeholder}
                rows={rows}
                fullWidth={fullWidth}
                {...rest}
              />
            );
          default:
            return (
              <Input
                {...field}
                id={name}
                type={type}
                label={label}
                error={errorToUse}
                helperText={helperText}
                placeholder={placeholder}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
                fullWidth={fullWidth}
                {...rest}
              />
            );
        }
      }}
    />
  );
};

export default FormField;