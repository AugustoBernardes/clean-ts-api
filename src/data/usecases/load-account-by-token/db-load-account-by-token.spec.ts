import { IDecrypter } from '../../protocols/criptography/decrypter'
import { IAccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { ILoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string> {
      return 'any_value'
    }
  }
  return new DecrypterStub()
}

const makeFakeAccount = (): IAccountModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
}
)

const makeLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepository implements ILoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<IAccountModel | null> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByTokenRepository()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_roke')
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadAccountRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_roke')
    await expect(promise).rejects.toThrow()
  })
})
