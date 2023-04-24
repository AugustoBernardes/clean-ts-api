import { ISurveyResultModel } from '@/domain/models/survey-result'
import { ISaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultParams = (): ISaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): ISurveyResultModel => Object.assign({}, mockSaveSurveyResultParams(), {
  _id: 'any_id'
})
