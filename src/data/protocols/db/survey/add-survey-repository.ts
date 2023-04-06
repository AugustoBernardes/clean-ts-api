import { IAddSurveyParams } from '../../../../domain/usecases/survey/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyParams) => Promise<void>
}
