import { badRequest, serverError } from '../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IEmailValidator, Controller } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: IEmailValidator
  ) {}

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: 'ok'
      }
    } catch (error) {
      return serverError()
    }
  }
}
