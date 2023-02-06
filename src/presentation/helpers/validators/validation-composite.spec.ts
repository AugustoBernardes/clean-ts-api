import { MissingParamError } from '../../errors'
import { IValidation } from './validation'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): IValidation => {
  class ValidationStub {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: IValidation
}

const makeSut = (): SutTypes => {
  const validationStubs = makeValidation()
  const sut = new ValidationComposite([validationStubs])
  return {
    sut,
    validationStubs
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs, 'validate').mockReturnValueOnce(new MissingParamError('field'))

    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
