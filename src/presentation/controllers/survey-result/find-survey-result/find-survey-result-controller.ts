
import { Controller, forbidden, IFindResultBySurveyId, IHttpRequest, IHttpResponse, MissingParamError, ok, serverError } from './find-survey-result-controller-protocols'

export class FindSurveyResultController implements Controller {
  constructor (
    private readonly findSurveyResult: IFindResultBySurveyId
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      if (!surveyId) {
        return forbidden(new MissingParamError('surveyId'))
      }
      const surveyResult = await this.findSurveyResult.findSurveyResult(surveyId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
