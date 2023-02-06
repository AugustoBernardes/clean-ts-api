import { InvalidParamError } from '../../errors'
import { IValidation } from './validation'

export class CompareFieldsValidation implements IValidation {
  constructor (private readonly fieldName: string, private readonly fieldToCompareName: string) {}
  validate (input: any): Error | null {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }

    return null
  }
}