import { ILoadSurveysRepository, ILoadSurveys, ISurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}

  async load (): Promise<ISurveyModel[] | null> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
