import Joi from 'joi';

export const validatePrice = Joi.object({
  price : Joi.string()
    .pattern(/^(8[9][9]\d*|9\d{2,}|[1-9]\d{3,})$/)
    .required()
    .messages({
      'string.pattern.base': 'The price must be a positive number and at least 899.'
    }),
});
