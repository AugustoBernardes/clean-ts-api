import { IAddSurveyModel } from '../../../../domain/usecases/survey/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
