import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-repository'
import { ISurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'

const makeFakeSurvey = (): ISurveyModel => {
  return {
    _id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

const makeLoadSurveysByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel | null> {
      return makeFakeSurvey()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepository: ILoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepository = makeLoadSurveysByIdRepository()
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
    expect(surveys).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepository } = makeSut()
    jest.spyOn(loadSurveyByIdRepository, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
