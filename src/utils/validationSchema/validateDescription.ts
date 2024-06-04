import Joi from 'joi'


export const validateDescription = Joi.object({
    description: Joi.string().required().min(3).max(100),
})