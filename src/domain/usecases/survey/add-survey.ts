import { ISurveyModel } from '@/domain/models/survey'

export type IAddSurveyParams = Omit<ISurveyModel, '_id'>

export interface IAddSurvey {
  add: (data: IAddSurveyParams) => Promise<void>
}
