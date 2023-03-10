import { IAddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { ILoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { ISurveyModel } from '../../../../domain/models/survey'
import { IAddSurveyModel } from '../../../../domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository {
  async add (surveyData: IAddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as ISurveyModel[]
    return surveys
  }
}
