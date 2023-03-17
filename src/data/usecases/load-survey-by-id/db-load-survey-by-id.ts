import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-repository'
import { ISurveyModel } from '@/domain/models/survey'
import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<ISurveyModel | null> {
    return await this.loadSurveyByIdRepository.loadById(id)
  }
}
