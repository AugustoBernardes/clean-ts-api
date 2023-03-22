import { ILoadSurveyByIdRepository, ILoadSurveyById, ISurveyModel } from './db-load-survey-by-id-protocols'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<ISurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey
  }
}
