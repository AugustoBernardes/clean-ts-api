import { ISurveyResultModel } from '@/domain/models/survey-result'

export type ISaveSurveyResultParams = Omit<ISurveyResultModel, '_id'>

export interface ISaveSurveyResult {
  save: (data: ISaveSurveyResultParams) => Promise<ISurveyResultModel>
}
