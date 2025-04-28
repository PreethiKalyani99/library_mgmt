import Joi from "joi"

export const authorSchema = Joi.object().keys({
    id: Joi.string().uuid({ version: 'uuidv4' }),
    name: Joi.string(),
    country: Joi.string(),
}).or('id', 'name')

export const bookCreationSchema = Joi.object({
    title: Joi.string().required().error(new Error("Title is required")),
    publicationYear: Joi.number().integer().positive(),
    author: authorSchema.required().error(new Error("Either author name or id is required")),
    price: Joi.number().precision(2).positive().required().error(new Error("Price must be a positive number with up to 2 decimal places")),
    description: Joi.string().allow(null, '').optional(),
})

export const bookUpdateSchema = Joi.object({
    title: Joi.string(),
    publicationYear: Joi.number().integer().positive(),
    author: authorSchema.optional(),
    price: Joi.number().precision(2).positive(),
    description: Joi.string().allow(null, '').optional(),
})

export const bookIdSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required().error(new Error("Book ID is required")),
})
