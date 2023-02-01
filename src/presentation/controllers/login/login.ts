import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helper'
import { IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  private readonly emailValidator: IEmailValidator
  constructor (emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.password) {
      return badRequest(new MissingParamError('password'))
    }

    this.emailValidator.isValid(httpRequest.body.email)

    return await new Promise(resolve => resolve({
      statusCode: 200,
      body: {}
    }))
  }
}
