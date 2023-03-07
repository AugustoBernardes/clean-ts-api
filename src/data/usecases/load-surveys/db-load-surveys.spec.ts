import { ISurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-survey-repository'

const makeFakeSurveys = (): ISurveyModel[] => {
  return [{
    _id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    _id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
      async loadAll (): Promise<ISurveyModel[] | null> {
        return makeFakeSurveys()
      }
    }
    const loadSurveysRepository = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepository)
    await sut.load()
    expect(loadAllSpy).toBeCalled()
  })
})
