import { IFindSurveyResultModel } from '@/domain/models/survey-result'
import { IFindResultBySurveyId, IFindSurveyResultParams } from './db-find-survey-result-protocols'

export class DbFindSurveyResult implements IFindResultBySurveyId {
  constructor (private readonly findSurveyResultRepository: IFindResultBySurveyId) {}

  async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel[]> {
    const response = await this.findSurveyResultRepository.findSurveyResult(data)
    return response
  }
}
