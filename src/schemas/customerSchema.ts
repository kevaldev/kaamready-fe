import * as yup from 'yup';

export const customerProfileSchema = yup.object({
  fullName: yup.string().required('customer.errors.requiredFullName'),
  phone: yup.string().required('customer.errors.requiredPhone'),
  email: yup.string().email('customer.errors.invalidEmail').required('customer.errors.requiredEmail'),
  address: yup.string().required('customer.errors.requiredAddress'),
  city: yup.string().required('customer.errors.requiredCity'),
  state: yup.string().required('customer.errors.requiredState'),
  pincode: yup.string().required('customer.errors.requiredPincode'),
  preferredLanguage: yup.string().required('customer.errors.requiredLanguage'),
}).required();

export const serviceBookingSchema = yup.object({
  serviceId: yup.string().required('booking.errors.requiredService'),
  workerId: yup.string().required('booking.errors.requiredWorker'),
  date: yup.date().required('booking.errors.requiredDate').min(new Date(), 'booking.errors.pastDate'),
  timeSlot: yup.string().required('booking.errors.requiredTimeSlot'),
  address: yup.string().required('booking.errors.requiredAddress'),
  city: yup.string().required('booking.errors.requiredCity'),
  state: yup.string().required('booking.errors.requiredState'),
  pincode: yup.string().required('booking.errors.requiredPincode'),
  notes: yup.string().max(500, 'booking.errors.notesTooLong'),
}).required();

export const reviewSchema = yup.object({
  rating: yup
    .number()
    .required('review.errors.requiredRating')
    .min(1, 'review.errors.minRating')
    .max(5, 'review.errors.maxRating'),
  comment: yup.string().max(500, 'review.errors.commentTooLong'),
}).required();

export const paymentSchema = yup.object({
  paymentMethod: yup.string().required('payment.errors.requiredMethod'),
  cardNumber: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('payment.errors.requiredCardNumber').matches(/^\d{16}$/, 'payment.errors.invalidCardNumber'),
    otherwise: (schema) => schema,
  }),
  cardExpiry: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('payment.errors.requiredCardExpiry').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'payment.errors.invalidCardExpiry'),
    otherwise: (schema) => schema,
  }),
  cardCvv: yup.string().when('paymentMethod', {
    is: 'card',
    then: (schema) => schema.required('payment.errors.requiredCardCvv').matches(/^\d{3,4}$/, 'payment.errors.invalidCardCvv'),
    otherwise: (schema) => schema,
  }),
  upiId: yup.string().when('paymentMethod', {
    is: 'upi',
    then: (schema) => schema.required('payment.errors.requiredUpiId').matches(/^[\w.-]+@[\w.-]+$/, 'payment.errors.invalidUpiId'),
    otherwise: (schema) => schema,
  }),
}).required();