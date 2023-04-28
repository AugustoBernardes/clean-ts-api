import { IAddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { IAddSurveyParams } from '@/data/usecases/survey/add-survey/db-add-survey-protocols'
import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-repository'
import { ISurveyModel } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { mockSurveyModel, mockSurveysModels } from '@/domain/test'
import { ILoadSurveysRepository } from '@/data/protocols/db/survey/load-survey-repository'

export const mockAddSurveyRepository = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (surveyData: IAddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveysByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel | null> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[] | null> {
      return mockSurveysModels()
    }
  }
  return new LoadSurveysRepositoryStub()
}
