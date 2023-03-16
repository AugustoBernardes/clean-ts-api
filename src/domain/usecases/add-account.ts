import { IAccountModel } from '../models/account'

export type IAddAccountModel = Omit<IAccountModel, '_id'>

export interface IAddAccount {
  add: (account: IAddAccountModel) => Promise<IAccountModel | null>
}
