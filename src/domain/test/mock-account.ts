import { IAccountModel } from '@/domain/models/account'
import { IAddAccountParams } from '@/domain/usecases/account/add-account'
import { IInsertOneModel } from '../models/insert-one-model'
import { IAuthenticationParams } from '@/domain/usecases/account/authentication'

export const mockAddAccountParams = (): IAddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): IAccountModel => ({
  _id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

export const mockInsertOneAccount = (): IInsertOneModel => ({
  acknowledged: true,
  insertedId: 'any_id'
})

export const mockFakeAuthentication = (): IAuthenticationParams => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
