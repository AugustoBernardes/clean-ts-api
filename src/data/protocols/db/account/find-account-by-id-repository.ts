import { IAccountModel } from '@/domain/models/account'

export interface IFindAccountByIdRepository {
  findById: (id: string) => Promise<IAccountModel | null>
}
