import { InvalidParamError } from '@/presentation/errors'
import { IEmailValidator } from '../protocols/email-validator'
import { IValidation } from '@/presentation/protocols'

export class EmailValidation implements IValidation {
  constructor (private readonly fieldName: string, private readonly emailValidator: IEmailValidator) {}
  validate (input: any): Error | null {
    const isValid = this.emailValidator.isValid(input[this.fieldName])

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
