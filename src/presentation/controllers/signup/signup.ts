import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IEmailValidator, Controller, IAddAccount } from './signup-protocols'
import { InvalidParamError, MissingParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IAddAccount
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

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
