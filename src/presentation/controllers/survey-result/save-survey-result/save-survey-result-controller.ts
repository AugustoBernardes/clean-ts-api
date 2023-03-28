import { Controller, IHttpRequest, IHttpResponse, ILoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return {
      statusCode: 200,
      body: ''
    }
  }
}
