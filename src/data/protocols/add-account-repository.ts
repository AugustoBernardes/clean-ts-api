import { IAddAccountModel } from '../../domain/usecases/add-account'
import { IAccountModel, IAddAccountResponse } from '../../domain/models/account'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IAddAccountResponse>
  findById: (id: string) => Promise<IAccountModel>
}
