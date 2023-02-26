import { badRequest } from '../../../helpers/http/http-helper'
import { Controller, IAddSurvey, IHttpRequest, IHttpResponse, IValidation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)

    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    return {
      statusCode: 204,
      body: null
    }
  }
}
