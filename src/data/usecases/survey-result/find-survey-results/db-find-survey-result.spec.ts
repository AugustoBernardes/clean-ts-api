import { IFindSurveyResultModel } from '@/domain/models/survey-result'
import { mockResultSurveyById } from '@/domain/test'
import { DbFindSurveyResult } from './db-find-survey-result'
import { IFindSurveyResultRepository, IFindSurveyResultParams } from './db-find-survey-result-protocols'

const mockFindSurveyResultRepositoryStub = (): IFindSurveyResultRepository => {
  class FindSurveyResultRepositoryStub implements IFindSurveyResultRepository {
    async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel[]> {
      return await Promise.resolve(mockResultSurveyById())
    }
  }

  return new FindSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbFindSurveyResult
  findSurveyResultRepositoryStub: IFindSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const findSurveyResultRepositoryStub = mockFindSurveyResultRepositoryStub()
  const sut = new DbFindSurveyResult(findSurveyResultRepositoryStub)
  return {
    sut,
    findSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult useCase', () => {
  test('should call FindSurveyResultRepository with correct values', async () => {
    const { sut, findSurveyResultRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(findSurveyResultRepositoryStub, 'findSurveyResult')
    await sut.findSurveyResult({ surveyId: 'any_survey_id' })
    expect(loadByIdSpy).toHaveBeenCalledWith({ surveyId: 'any_survey_id' })
  })
})
