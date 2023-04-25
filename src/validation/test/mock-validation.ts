import { IValidation } from '@/presentation/protocols/validation'

export const mockValidation = (): IValidation => {
  class ValidationStub {
    validate (input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}
