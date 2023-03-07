import { noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { IHttpRequest, IHttpResponse, Controller, ILoadSurveys } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: ILoadSurveys) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys?.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
