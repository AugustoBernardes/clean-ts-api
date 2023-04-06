import { ISaveSurveyResultRepository, ISurveyResultModel, ISaveSurveyResultParams } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements ISaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
