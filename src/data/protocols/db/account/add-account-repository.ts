import { IAddAccountParams } from '@/domain/usecases/account/add-account'
import { IInsertOneModel } from '@/domain/models/insert-one-model'

export interface IAddAccountRepository {
  add: (accountData: IAddAccountParams) => Promise<IInsertOneModel>
}
