import { MissingParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub {
      validate (input: any): Error | null {
        return new MissingParamError('field')
      }
    }
    const sut = new ValidationComposite([
      new ValidationStub()
    ])
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
