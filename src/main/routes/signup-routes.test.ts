import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
