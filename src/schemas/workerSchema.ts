import * as yup from 'yup';

export const workerProfileSchema = yup.object({
  fullName: yup.string().required('worker.errors.requiredFullName'),
  phone: yup.string().required('worker.errors.requiredPhone'),
  address: yup.string().required('worker.errors.requiredAddress'),
  city: yup.string().required('worker.errors.requiredCity'),
  state: yup.string().required('worker.errors.requiredState'),
  pincode: yup.string().required('worker.errors.requiredPincode'),
  idProofType: yup.string().required('worker.errors.requiredIdProofType'),
  idProofNumber: yup.string().required('worker.errors.requiredIdProofNumber'),
  bio: yup.string().max(500, 'worker.errors.bioTooLong'),
  skills: yup.array().of(yup.string()).min(1, 'worker.errors.atLeastOneSkill'),
  hourlyRate: yup
    .number()
    .typeError('worker.errors.invalidRate')
    .positive('worker.errors.positiveRate')
    .required('worker.errors.requiredRate'),
  availability: yup.array().of(yup.string()).min(1, 'worker.errors.atLeastOneDay'),
  experienceYears: yup
    .number()
    .typeError('worker.errors.invalidExperience')
    .min(0, 'worker.errors.minExperience')
    .required('worker.errors.requiredExperience'),
  serviceCategories: yup.array().of(yup.string()).min(1, 'worker.errors.atLeastOneCategory'),
}).required();

export const serviceOfferingSchema = yup.object({
  title: yup.string().required('service.errors.requiredTitle'),
  description: yup.string().required('service.errors.requiredDescription').max(1000, 'service.errors.descriptionTooLong'),
  category: yup.string().required('service.errors.requiredCategory'),
  subcategory: yup.string().required('service.errors.requiredSubcategory'),
  price: yup
    .number()
    .typeError('service.errors.invalidPrice')
    .positive('service.errors.positivePrice')
    .required('service.errors.requiredPrice'),
  pricingUnit: yup.string().required('service.errors.requiredPricingUnit'),
  estimatedHours: yup
    .number()
    .typeError('service.errors.invalidHours')
    .positive('service.errors.positiveHours')
    .required('service.errors.requiredHours'),
  location: yup.string().required('service.errors.requiredLocation'),
  tags: yup.array().of(yup.string()),
}).required();