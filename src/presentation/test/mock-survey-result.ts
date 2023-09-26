import { ISaveSurveyResult, ISaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { IFindSurveyResultModel, ISurveyResultModel } from '@/domain/models/survey-result'
import { mockResultSurveyById, mockSurveyResultModel } from '@/domain/test'
import { IFindResultBySurveyId, IFindSurveyResultParams } from '@/domain/usecases/survey-result/find-survey-result'

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new SaveSurveyResultStub()
}

export const mockFindResultBySurveyId = (): IFindResultBySurveyId => {
  class FindResultBySurveyIdStub implements IFindResultBySurveyId {
    async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel[]> {
      return mockResultSurveyById()
    }
  }
  return new FindResultBySurveyIdStub()
}
