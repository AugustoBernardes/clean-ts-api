import { IAccountModel, IAddAccountModel, IHasher, IAddAccountRepository, IAddAccount } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const createdAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    const account = await this.addAccountRepository.findById(createdAccount.insertedId)
    return account
  }
}
