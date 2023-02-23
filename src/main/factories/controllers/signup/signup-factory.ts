import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLoginValidation } from '../login/login-validation-factory'
import { makeDbAuthentication } from '../../usecases/db-authentication-factory'
import { makeDbAddAccount } from '../../usecases/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeLoginValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
