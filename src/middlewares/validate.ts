import { Request, Response, NextFunction } from 'express'

type ValidProperty = 'body' | 'params' | 'query'

export function validate(schema: any, property: ValidProperty) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[property])
        if (error) {
            return res.status(400).json({ message: error.message })
        }
        next()
    }
}