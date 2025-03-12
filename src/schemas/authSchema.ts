import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup.string().email('auth.errors.invalidEmail').required('auth.errors.requiredEmail'),
  password: yup.string().required('auth.errors.requiredPassword'),
}).required();

export const registerSchema = yup.object({
  name: yup.string().required('auth.errors.requiredName'),
  email: yup.string().email('auth.errors.invalidEmail').required('auth.errors.requiredEmail'),
  password: yup
    .string()
    .min(6, 'auth.errors.passwordTooShort')
    .required('auth.errors.requiredPassword'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'auth.errors.passwordsDoNotMatch')
    .required('auth.errors.requiredConfirmPassword'),
  role: yup.string().oneOf(['customer', 'worker'], 'auth.errors.invalidRole').required('auth.errors.requiredRole'),
  termsAccepted: yup.boolean().oneOf([true], 'auth.errors.termsRequired'),
}).required();

export const forgotPasswordSchema = yup.object({
  email: yup.string().email('auth.errors.invalidEmail').required('auth.errors.requiredEmail'),
}).required();

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, 'auth.errors.passwordTooShort')
    .required('auth.errors.requiredPassword'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'auth.errors.passwordsDoNotMatch')
    .required('auth.errors.requiredConfirmPassword'),
}).required();