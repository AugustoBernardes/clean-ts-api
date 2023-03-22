import { IAddAccountModel } from '@/domain/usecases/add-account'
import { IAccountModel } from '@/domain/models/account'
import { IInsertOneResponse } from '@/domain/models/insert-one-response'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountModel) => Promise<IInsertOneResponse>
  findById: (id: string) => Promise<IAccountModel>
}
