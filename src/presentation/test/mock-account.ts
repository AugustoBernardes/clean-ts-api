import { IAddAccount, IAddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel } from '@/domain/test'
import { IAccountModel } from '@/domain/models/account'
import { IAuthentication, IAuthenticationParams } from '@/domain/usecases/account/authentication'
import { ILoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAddAccount = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountParams): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth (authentication: IAuthenticationParams): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccoutByTokenStub implements ILoadAccountByToken {
    async load (accessToken: string, role?: string | undefined): Promise<IAccountModel | null> {
      return mockAccountModel()
    }
  }

  return new LoadAccoutByTokenStub()
}
