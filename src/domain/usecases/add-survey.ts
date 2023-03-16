import { ISurveyModel } from '../models/survey'

export type IAddSurveyModel = Omit<ISurveyModel, '_id'>

export interface IAddSurvey {
  add: (data: IAddSurveyModel) => Promise<void>
}
