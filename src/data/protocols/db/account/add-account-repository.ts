import { IAddAccountParams } from '@/domain/usecases/account/add-account'
import { IAccountModel } from '@/domain/models/account'
import { IInsertOneResponse } from '@/domain/models/insert-one-response'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountParams) => Promise<IInsertOneResponse>
  findById: (id: string) => Promise<IAccountModel>
}
