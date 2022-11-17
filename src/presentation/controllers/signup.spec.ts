import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return 400 if no nome is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        // name: 'jack',
        email: 'jack@email.com',
        password: '123',
        passwordConfirmation: '123'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
