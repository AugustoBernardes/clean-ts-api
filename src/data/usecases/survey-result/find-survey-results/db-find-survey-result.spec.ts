import { IFindSurveyResultModel } from '@/domain/models/survey-result'
import { mockResultSurveyById } from '@/domain/test'
import { DbFindSurveyResult } from './db-find-survey-result'
import { IFindSurveyResultRepository, IFindSurveyResultParams } from './db-find-survey-result-protocols'

describe('DbLoadSurveyResult useCase', () => {
  class FindSurveyResultRepositoryStub implements IFindSurveyResultRepository {
    async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel[]> {
      return await Promise.resolve(mockResultSurveyById())
    }
  }

  test('should call FindSurveyResultRepository with correct values', async () => {
    const findSurveyResultRepositoryStub = new FindSurveyResultRepositoryStub()
    const loadByIdSpy = jest.spyOn(findSurveyResultRepositoryStub, 'findSurveyResult')
    const sut = new DbFindSurveyResult(findSurveyResultRepositoryStub)
    await sut.findSurveyResult({ surveyId: 'any_survey_id' })
    expect(loadByIdSpy).toHaveBeenCalledWith({ surveyId: 'any_survey_id' })
  })
})
