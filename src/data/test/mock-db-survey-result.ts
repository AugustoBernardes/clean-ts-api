import { mockSurveyResultModel } from '@/domain/test'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { ISaveSurveyResultParams, ISurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return mockSurveyResultModel()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
