import Joi from 'joi';

export const validateBedrooms = Joi.object({
  bedrooms: Joi.number()
    .integer()
    .min(1)
    .max(8)
    .required()
    .messages({
      'number.base': 'The number of bedrooms must be a number.',
      'number.integer': 'The number of bedrooms must be an integer.',
      'number.min': 'The number of bedrooms must be at least 1.',
      'number.max': 'The number of bedrooms must be at most 8.',
      'any.required': 'The number of bedrooms is required.'
    }),
});
