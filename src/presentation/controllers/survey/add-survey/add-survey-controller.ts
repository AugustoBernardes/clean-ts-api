import { Controller, IHttpRequest, IHttpResponse, IValidation } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => resolve({
      statusCode: 400,
      body: null
    }))
  }
}
