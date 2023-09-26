import { mockResultSurveyById, mockSurveyResultModel } from '@/domain/test'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { IFindSurveyResultModel, ISaveSurveyResultParams, ISurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { IFindSurveyResultRepository } from '@/data/protocols/db/survey-result/find-survey-result-repository'
import { IFindSurveyResultParams } from '@/domain/usecases/survey-result/find-survey-result'

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return mockSurveyResultModel()
    }
  }

  return new SaveSurveyResultRepositoryStub()
}

export const mockFindSurveyResultRepositoryStub = (): IFindSurveyResultRepository => {
  class FindSurveyResultRepositoryStub implements IFindSurveyResultRepository {
    async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel[]> {
      return await Promise.resolve(mockResultSurveyById())
    }
  }

  return new FindSurveyResultRepositoryStub()
}
