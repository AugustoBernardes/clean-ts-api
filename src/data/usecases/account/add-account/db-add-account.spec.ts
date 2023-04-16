import { IAccountModel, IAddAccountParams, IHasher, IAddAccountRepository, ILoadAccountByEmailRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account'
import { IInsertOneModel } from '@/domain/models/insert-one-model'
import { mockAccountModel, mockAddAccountParams, mockInsertOneAccount, throwError } from '@/domain/test/index'
import { mockHasher } from '@/data/test'
import { IFindAccountByIdRepository } from '@/data/protocols/db/account/find-account-by-id-repository'

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (accountData: IAddAccountParams): Promise<IInsertOneModel> {
      return await new Promise(resolve => resolve(mockInsertOneAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

const makeFindAccountByIdRepository = (): IFindAccountByIdRepository => {
  class FindAccountByIdRepositoryStub implements IFindAccountByIdRepository {
    async findById (id: string): Promise<IAccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new FindAccountByIdRepositoryStub()
}

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<IAccountModel | null> {
      return await new Promise(resolve => resolve(null))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  hasherStub: IHasher
  addAccountRepositoryStub: IAddAccountRepository
  findAccountByIdRepositoryStub: IFindAccountByIdRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const findAccountByIdRepositoryStub = makeFindAccountByIdRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, findAccountByIdRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    findAccountByIdRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()

    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if hasher throws', async () => {
    const { sut, hasherStub } = makeSut()

    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call FindAccountByIdRepository with correct values', async () => {
    const { sut, findAccountByIdRepositoryStub } = makeSut()
    const findByIdSpy = jest.spyOn(findAccountByIdRepositoryStub, 'findById')
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    await sut.add(accountData)
    expect(findByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if FindAccountByIdRepository throws', async () => {
    const { sut, findAccountByIdRepositoryStub } = makeSut()

    jest.spyOn(findAccountByIdRepositoryStub, 'findById').mockImplementationOnce(throwError)

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository no return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(mockAccountModel())))

    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })
})
