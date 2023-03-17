import { IAccountModel } from '@/domain/models/account'

export type IAddAccountModel = Omit<IAccountModel, '_id'>

export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModel | null>
}
