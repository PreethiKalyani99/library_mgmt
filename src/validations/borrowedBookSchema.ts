import Joi from "joi";

export const bookSchema = Joi.object().keys({
    id: Joi.string().uuid({ version: 'uuidv4' }),
    title: Joi.string(),
}).or('id', 'title')

export const userSchema = Joi.object().keys({
    id: Joi.string().uuid({ version: 'uuidv4' }),
    email:  Joi.string().email(),
}).or('id', 'email')

export const borrowedBookCreationSchema = Joi.object({
    book: bookSchema.required().error(new Error("Either Book ID or Title is required")),
    user: userSchema.required().error(new Error("Either User ID or Email is required")),
    borrowDate: Joi.date()
    .iso()
    .required()
    .error(new Error("Borrow date must be a valid date (YYYY-MM-DD)")),
})

export const borrowedBookUpdateSchema = Joi.object({
    returnDate: Joi.date()
    .iso()
    .required()
    .messages({
        'date.base': 'Return date must be a valid date (YYYY-MM-DD)',
        'date.format': 'Return date must be in ISO format (YYYY-MM-DD)',
        'any.required': 'Return date is required',
      })
})

export const borrowedBookIdSchema = Joi.object({
    id: Joi.string()
        .uuid({ version: 'uuidv4' })
        .required()
        .messages({
            'any.required': 'Borrowed Book ID is required',
            'string.guid': 'Borrowed Book ID must be a valid UUID',
        })
})