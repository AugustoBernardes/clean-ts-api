import { serverError, unauthorized, ok, badRequest } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IAuthentication, IValidation } from './login-protocols'
import { Controller } from '../../protocols/controller'

export class LoginController implements Controller {
  private readonly validation: IValidation
  private readonly authentication: IAuthentication
  constructor (authentication: IAuthentication, validation: IValidation) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
