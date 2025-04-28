import Joi from "joi";

export const userCreationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
})

export const userUpdateSchema = Joi.object({
    password: Joi.string().min(8).required(),
})

export const userIdSchema = Joi.object({
    id: Joi.string().uuid({ version: 'uuidv4' }).required().error(new Error("User ID is required")),
})
