import { Controller, forbidden, IHttpRequest, IHttpResponse, ILoadSurveyById, InvalidParamError, ok } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return ok(survey)
  }
}
