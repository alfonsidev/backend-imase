import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

const validatorHandler = (schema: Schema, property: keyof Request) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))
    }
    next()
  }
}


export default validatorHandler
