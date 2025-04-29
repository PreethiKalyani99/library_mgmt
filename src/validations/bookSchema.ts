import Joi from "joi"

export const authorSchema = Joi.object().keys({
    id: Joi.string().uuid({ version: 'uuidv4' }),
    name: Joi.string(),
    country: Joi.string(),
}).or('id', 'name')

export const publicationYearSchema = Joi.number()
    .integer()
    .positive()
    .min(1900)
    .max(new Date().getFullYear())
    .messages({
        'number.positive': 'Publication year must be a positive number',
        'number.min': 'Publication year must be a valid year (greater than or equal to 1900)',
        'number.max': 'Publication year cannot be in the future',
        'any.required': 'Publication year is required'
    })

export const priceSchema = Joi.number()
    .precision(2)
    .positive()
    .error(new Error("Price must be a positive number with up to 2 decimal places"))

export const descriptionSchema = Joi.string().allow(null, '')

export const bookCreationSchema = Joi.object({
    title: Joi.string().required().error(new Error("Title is required")),
    publicationYear: publicationYearSchema,
    author: authorSchema.required().error(new Error("Either author name or ID is required")),
    price: priceSchema.required(),
    description: descriptionSchema,
})

export const bookUpdateSchema = Joi.object({
    title: Joi.string(),
    publicationYear: publicationYearSchema,
    author: authorSchema.optional(),
    price: priceSchema,
    description: descriptionSchema
})

export const bookIdSchema = Joi.object({
    id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'any.required': 'Book ID is required',
            'string.guid': 'Book ID must be a valid UUID',
        })
})
