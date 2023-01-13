import { IAccountModel, IAddAccountModel, IEncrypter, IAddAccountRepository, IAddAccount } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const createdAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    const account = await this.addAccountRepository.findById(createdAccount.insertedId)
    return account
  }
}
