import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection
describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Add', () => {
    test('Should return an account on success', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.acknowledged).toBeTruthy()
      expect(account.insertedId).toBeTruthy()
    })
  })

  describe('LoadByEmail', () => {
    test('Should return an loadByEmail on success', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeTruthy()
      expect(account._id).toBeTruthy()
      expect(account.email).toBe('any_email@mail.com')
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeFalsy()
    })
  })

  describe('UpdateAccessToken', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = new AccountMongoRepository()
      const result = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await sut.updateAccessToken(result.insertedId.toString(), 'any_token')
      const account = await accountCollection.findOne({
        _id: result.insertedId
      })

      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe('any_token')
    })
  })

  describe('LoadByToken', () => {
    test('Should return an account on loadByToken without role success', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account._id).toBeTruthy()
      expect(account.email).toBe('any_email@mail.com')
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('Should return an account on loadByToken with admin role success', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeTruthy()
      expect(account._id).toBeTruthy()
      expect(account.email).toBe('any_email@mail.com')
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('Should return null on loadByToken with invalid role success', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token', 'admin')

      expect(account).toBeFalsy()
    })

    test('Should return an account on loadByToken if user is admin', async () => {
      const sut = new AccountMongoRepository()
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin'
      })
      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account._id).toBeTruthy()
      expect(account.email).toBe('any_email@mail.com')
      expect(account.name).toBe('any_name')
      expect(account.password).toBe('any_password')
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = new AccountMongoRepository()
      const account = await sut.loadByToken('any_token')

      expect(account).toBeFalsy()
    })
  })
})
