
import { EmailValidation } from './email-validation'
import { IEmailValidator } from '@/validation/protocols/email-validator'
import { mockEmailValidator } from '@/validation/test'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)

  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  test('Should call email validator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'any@email.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any@email.com')
  })

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })

    expect(sut.validate).toThrow()
  })
})
