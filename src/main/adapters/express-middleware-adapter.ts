import { IHttpRequest, Middleware } from '../../presentation/protocols'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (controller: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers
    }

    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
