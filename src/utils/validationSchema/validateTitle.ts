import Joi from 'joi'


export const validateTitle = Joi.object({
    title: Joi.string().required().min(3).max(100),
})