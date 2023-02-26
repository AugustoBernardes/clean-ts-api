import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, IHttpRequest, IHttpResponse, IValidation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }
    return await new Promise(resolve => resolve({
      statusCode: 400,
      body: null
    }))
  }
}
