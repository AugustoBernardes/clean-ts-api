import { IFindSurveyResultModel } from '@/domain/models/survey-result'
import { IFindSurveyResultParams } from '@/domain/usecases/survey-result/find-survey-result'

export interface IFindSurveyResultRepository {
  findSurveyResult: (data: IFindSurveyResultParams) => Promise<IFindSurveyResultModel[]>
}
