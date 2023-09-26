import { mockFindSurveyResultRepositoryStub } from '@/data/test'
import { DbFindSurveyResult } from './db-find-survey-result'
import { IFindSurveyResultRepository } from './db-find-survey-result-protocols'
import { throwError } from '@/domain/test'

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

  test('Should throw if FindSurveyResultRepository throws', async () => {
    const { sut, findSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(findSurveyResultRepositoryStub, 'findSurveyResult').mockImplementationOnce(throwError)
    const promise = sut.findSurveyResult({ surveyId: 'any_survey_id' })
    await expect(promise).rejects.toThrow()
  })
})
