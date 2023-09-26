import { IFindSurveyResultModel } from '@/domain/models/survey-result'

export type IFindSurveyResultParams = {
  surveyId: string
}

export interface IFindResultBySurveyId {
  findSurveyResult: (data: IFindSurveyResultParams) => Promise<IFindSurveyResultModel[]>
}
