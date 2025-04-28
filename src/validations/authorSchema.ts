import Joi from "joi"

export const authorCreationSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string(),
})

export const authorIdSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required().error(new Error("Author ID is required")),
})

export const authorUpdateSchema = Joi.object({
    name: Joi.string(),
    country: Joi.string(),
})
