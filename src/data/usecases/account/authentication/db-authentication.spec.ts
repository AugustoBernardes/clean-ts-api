import { mockEncrypter, mockHashCompare, mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository } from '@/data/test'
import { DbAuthentication } from './db-authentication'
import {
  IHashCompare,
  IEncrypter,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository
} from './db-authentication-protocols'
import { mockFakeAuthentication, throwError } from '@/domain/test/index'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashCompareStub: IHashCompare
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const hashCompareStub = mockHashCompare()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  )
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth(mockFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(mockFakeAuthentication())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashCompare throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockFakeAuthentication())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypt throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Should call UdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
