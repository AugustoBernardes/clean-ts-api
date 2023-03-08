import { ISurveyModel } from '../../../domain/models/survey'
import { ILoadSurveys } from '../../../domain/usecases/load-surveys'
import { ILoadSurveysRepository } from '../../protocols/db/survey/load-survey-repository'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (private readonly loadSurveysRepository: ILoadSurveysRepository) {}

  async load (): Promise<ISurveyModel[] | null> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
