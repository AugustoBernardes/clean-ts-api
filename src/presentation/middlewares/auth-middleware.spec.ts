import { AuthMiddleware } from './auth-middleware'
import { forbidden } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { IAccountModel } from '../../domain/models/account'

const makeFakeAccount = (): IAccountModel => ({
  _id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
}
)

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token is exists in headers', async () => {
    class LoadAccoutByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string | undefined): Promise<IAccountModel | null> {
        return makeFakeAccount()
      }
    }
    const loadAccoutByTokenStub = new LoadAccoutByTokenStub()
    const sut = new AuthMiddleware(loadAccoutByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccoutByToken with correct accessToken', async () => {
    class LoadAccoutByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string | undefined): Promise<IAccountModel | null> {
        return makeFakeAccount()
      }
    }
    const loadAccoutByTokenStub = new LoadAccoutByTokenStub()
    const loadSpy = jest.spyOn(loadAccoutByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccoutByTokenStub)
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
