import { IAuthentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { ILoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  constructor (private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository) {}
  async auth (authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
