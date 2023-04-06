import { IAccountModel } from '@/domain/models/account'
import { IAddAccountParams } from '@/domain/usecases/account/add-account'

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
