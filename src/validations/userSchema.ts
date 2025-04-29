import Joi from "joi";

export const userCreationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export const userUpdateSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password length must be at least 8 characters long',
            'any.required': 'Password is required',
        }),
})

export const userIdSchema = Joi.object({
    id: Joi.string()
            .uuid({ version: 'uuidv4' })
            .required()
            .messages({
                'any.required': 'User ID is required',
                'string.guid': 'User ID must be a valid UUID',
            })
})
