import { ISurveyAnswerModel } from '../models/survey'

export type IAddSurveyModel = {
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
}

export interface IAddSurvey {
  add: (data: IAddSurveyModel) => Promise<void>
}
