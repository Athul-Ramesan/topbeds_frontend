import * as Yup from 'yup'


export const subscriptionValidationShcema = Yup.object({
  name: Yup.string().required('Plan name is required'),
  validityPeriod: Yup.number()
    .transform((value, originalValue) => {
      // Ensure the value is a number or return NaN to trigger validation error
      return isNaN(originalValue) ? NaN : value;
    })
    .required('Validity period is required')
    .min(1, 'Validity period must be at least 1 day')
    .typeError('Validity period must be a valid number'),
  amount: Yup.number()
    .transform((value, originalValue) => {
      return isNaN(originalValue) ? NaN : value;
    })
    .required('Amount is required')
    .min(0, 'Amount must be at least 0')
    .typeError('Amount must be a valid number'),
  discount: Yup.number()
    .transform((value, originalValue) => {
      return isNaN(originalValue) ? NaN : value;
    })
    .optional()
    .min(0, 'Discount must be between 0 and 100')
    .max(100, 'Discount must be between 0 and 100')
    .typeError('Discount must be a valid number'),
  description: Yup.string().optional(),
  isActive: Yup.boolean().required('Active status is required'),
  });