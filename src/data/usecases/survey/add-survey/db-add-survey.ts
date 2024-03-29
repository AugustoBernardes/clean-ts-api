import { IAddSurvey, IAddSurveyParams, IAddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements IAddSurvey {
  constructor (
    private readonly addSurveyRepository: IAddSurveyRepository
  ) {}

  async add (data: IAddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
