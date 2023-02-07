import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { IHttpRequest, IHttpResponse, Controller, IAddAccount, IValidation } from './signup-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const newAccount = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(newAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
