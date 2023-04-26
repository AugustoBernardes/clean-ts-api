import { ISaveSurveyResult, ISaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { ISurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}
