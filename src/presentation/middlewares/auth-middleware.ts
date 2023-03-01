import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { IHttpRequest, IHttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
