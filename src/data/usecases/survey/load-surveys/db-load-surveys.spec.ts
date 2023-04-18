import { ILoadSurveysRepository } from './db-load-surveys-protocols'
import { DbLoadSurveys } from './db-load-surveys'
import { mockSurveysModels, throwError } from '@/domain/test/index'
import MockDate from 'mockdate'
import { mockLoadSurveysRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepository: ILoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepository = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepository)

  return {
    sut,
    loadSurveysRepository
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toBeCalled()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveysModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
