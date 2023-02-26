import { EmailInUseError } from '../../../errors'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/http-helper'
import { IHttpRequest, IHttpResponse, Controller, IAddAccount, IValidation, IAuthentication } from './signup-controller-protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
