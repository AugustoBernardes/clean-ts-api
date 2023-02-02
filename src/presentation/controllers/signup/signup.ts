import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { IHttpRequest, IHttpResponse, IEmailValidator, Controller, IAddAccount, IValidation } from './signup-protocols'
import { InvalidParamError } from '../../errors'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
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
