import Joi from 'joi';

export const validateBathrooms = Joi.object({
  bathrooms: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required()
    .messages({
      'number.base': 'The number of bathrooms must be a number.',
      'number.integer': 'The number of bathrooms must be an integer.',
      'number.min': 'The number of bathrooms must be at least 1.',
      'number.max': 'The number of bathrooms must be at most 8.',
      'any.required': 'The number of bathrooms is required.'
    }),
});
