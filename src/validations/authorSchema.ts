import Joi from "joi"

export const authorCreationSchema = Joi.object({
    name: Joi.string().required().error(new Error("Author name is required")),
    country: Joi.string(),
})

export const authorIdSchema = Joi.object({
    id: Joi.string()
    .uuid({ version: 'uuidv4' })
    .required()
    .messages({
        'any.required': 'Author ID is required',
        'string.guid': 'Author ID must be a valid UUID',
    })
})

export const authorUpdateSchema = Joi.object().keys({
    name: Joi.string(),
    country: Joi.string(),
}).or('name', 'country')
.error(new Error("Either name or country is required"))
