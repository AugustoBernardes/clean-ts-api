import { ISurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveysModels } from '@/domain/test'
import { IAddSurvey, IAddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { ILoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { ILoadSurveys } from '@/domain/usecases/survey/load-surveys'

export const mockAddSurvey = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (data: IAddSurveyParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<ISurveyModel[]> {
      return await Promise.resolve(mockSurveysModels())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel | null> {
      return mockSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}
