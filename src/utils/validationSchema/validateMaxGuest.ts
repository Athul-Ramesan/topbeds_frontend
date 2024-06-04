import Joi from 'joi';

export const validateMaxGuests = Joi.object({
  maxGuests: Joi.number()
    .integer()
    .min(1)
    .max(20)
    .required()
    .messages({
      'number.base': 'The number of guests must be a number.',
      'number.integer': 'The number of guests must be an integer.',
      'number.min': 'The number of guests must be at least 1.',
      'number.max': 'The number of guests must be at most 8.',
      'any.required': 'The number of guests is required.'
    }),
});
