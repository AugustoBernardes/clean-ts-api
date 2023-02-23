import { IAccountModel, IAddAccountModel, IHasher, IAddAccountRepository, IAddAccount, ILoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)
      const createdAccount = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      const newAccount = await this.addAccountRepository.findById(createdAccount.insertedId)
      return newAccount
    }
    return null
  }
}
