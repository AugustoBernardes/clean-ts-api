import { ObjectId } from 'mongodb'
import { IAddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { ILoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { IAccountModel } from '../../../../domain/models/account'
import { IAddAccountModel } from '../../../../domain/usecases/account/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements IAddAccountRepository, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository, ILoadAccountByTokenRepository {
  async add (accountData: IAddAccountModel): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    return result
  }

  async findById (id: string): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({
      _id: id
    })

    return result
  }

  async loadByEmail (email: string): Promise<IAccountModel | null | any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    })
    return account
  }

  async updateAccessToken (id: string, token: string): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: new ObjectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<IAccountModel | null | any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    })
    return account
  }
}
