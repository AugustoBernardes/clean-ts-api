import { IFindSurveyResultModel, ISurveyResultModel } from '@/domain/models/survey-result'
import { ISaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'

export const mockSaveSurveyResultParams = (): ISaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): ISurveyResultModel => ({
  _id: 'any_id',
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer_id',
  date: new Date()
})

export const mockResultSurveyById = (): IFindSurveyResultModel => ({
  answer: 'any_id',
  count: 1,
  percentage: 50
})
