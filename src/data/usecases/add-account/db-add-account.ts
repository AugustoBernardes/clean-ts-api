import { IAccountModel } from '../../../domain/models/account'
import { IAddAccount, IAddAccountModel } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly encrypter: IEncrypter
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(accountData.password)
    return await new Promise(resolve => resolve({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    }))
  }
}
