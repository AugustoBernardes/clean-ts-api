import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLoginValidation } from '../login/login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
