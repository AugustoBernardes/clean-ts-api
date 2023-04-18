import { ILoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { mockSurveyModel, throwError } from '@/domain/test/index'
import MockDate from 'mockdate'
import { mockLoadSurveysByIdRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: ILoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepository = mockLoadSurveysByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepository)

  return {
    sut,
    loadSurveyByIdRepository
  }
}

describe('DbLoadSurveysById', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepository, 'loadById')
    await sut.loadById('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById('any_id')
    expect(surveys).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
