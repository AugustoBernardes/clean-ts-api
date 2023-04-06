import { IAccountModel } from '@/domain/models/account'

export type IAddAccountParams = Omit<IAccountModel, '_id'>

export interface IAddAccount {
  add: (account: IAddAccountParams) => Promise<IAccountModel | null>
}
