import { ISaveSurveyResultRepository, ISurveyResultModel, ISaveSurveyResultModel } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements ISaveSurveyResultRepository {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: ISaveSurveyResultModel): Promise<ISurveyResultModel | null> {
    const surveyResult = await this.saveSurveyResultRepository.save(data)
    return surveyResult
  }
}
