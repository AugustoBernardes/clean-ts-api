import { IAuthentication } from '../../../domain/usecases/authentication'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http-helper'
import { IEmailValidator, IHttpRequest, IHttpResponse } from '../../protocols'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  private readonly emailValidator: IEmailValidator
  private readonly authentication: IAuthentication
  constructor (emailValidator: IEmailValidator, authentication: IAuthentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)
      return await new Promise(resolve => resolve({
        statusCode: 200,
        body: {}
      }))
    } catch (error) {
      return serverError(error)
    }
  }
}
