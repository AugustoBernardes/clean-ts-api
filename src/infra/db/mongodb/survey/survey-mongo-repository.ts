import { ILoadSurveyByIdRepository } from '@/data/usecases/survey/load-survey-by-id/db-load-survey-by-id-protocols'
import { ObjectId } from 'mongodb'
import { IAddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { ILoadSurveysRepository } from '../../../../data/protocols/db/survey/load-survey-repository'
import { ISurveyModel } from '../../../../domain/models/survey'
import { IAddSurveyParams } from '../../../../domain/usecases/survey/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements IAddSurveyRepository, ILoadSurveysRepository, ILoadSurveyByIdRepository {
  async add (surveyData: IAddSurveyParams): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<ISurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find().toArray() as unknown as ISurveyModel[]
    return surveys
  }

  async loadById (id: string): Promise<ISurveyModel | null> {
    const surveyId = new ObjectId(id)
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({
      _id: surveyId
    }) as unknown as ISurveyModel
    return survey
  }
}
