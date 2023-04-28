import { IInsertOneModel } from '@/domain/models/insert-one-model'
import { IAddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { IAddAccountParams } from '@/domain/usecases/account/add-account'
import { mockAccountModel, mockInsertOneAccount } from '@/domain/test'
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { IAccountModel } from '@/domain/models/account'
import { IFindAccountByIdRepository } from '@/data/protocols/db/account/find-account-by-id-repository'
import { ILoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '@/data/usecases/account/authentication/db-authentication-protocols'

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountParams): Promise<IInsertOneModel> {
      return await Promise.resolve(mockInsertOneAccount())
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockFindAccountByIdRepository = (): IFindAccountByIdRepository => {
  class FindAccountByIdRepositoryStub implements IFindAccountByIdRepository {
    async findById (id: string): Promise<IAccountModel> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new FindAccountByIdRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements ILoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<IAccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByTokenRepository()
}

export const mockUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
