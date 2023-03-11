import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Controller } from '@/presentation/protocols'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Controller => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
