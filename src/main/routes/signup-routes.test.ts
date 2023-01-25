import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an Account with success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'John Doe',
        email: 'john@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})