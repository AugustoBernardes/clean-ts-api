import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return badRequest(new MissingParamError('email'))
  }
}
