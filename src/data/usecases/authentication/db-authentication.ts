import { IAuthentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { IHashCompare } from '../../protocols/criptography/hash-compare'
import { ITokenGenerator } from '../../protocols/criptography/token-generator'
import { ILoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashCompare: IHashCompare,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account._id)
    }
    return null
  }
}
