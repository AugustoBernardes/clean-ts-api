import { IFindSurveyResultModel, ISaveSurveyResultParams, ISaveSurveyResultRepository, ISurveyResultModel } from '@/data/usecases/survey-result/save-survey-result/db-save-survey-result-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'
import { IFindSurveyResultRepository, IFindSurveyResultParams } from '@/data/usecases/survey-result/find-survey-results/db-find-survey-result-protocols'

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository, IFindSurveyResultRepository {
  async save (data: ISaveSurveyResultParams): Promise<ISurveyResultModel> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultsCollection.findOneAndUpdate({
      surveyId: new ObjectId(data.surveyId),
      accountId: new ObjectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true,
      returnDocument: 'after'
    }) as unknown as { value: ISurveyResultModel }
    return res.value
  }

  // @TODO: Refactor and create e2e tests
  async findSurveyResult (data: IFindSurveyResultParams): Promise<IFindSurveyResultModel> {
    const surveyResultsCollection = await MongoHelper.getCollection('surveyResults')
    const res = await surveyResultsCollection.aggregate([
      { $match: { surveyId: new ObjectId(data.surveyId) } },
      {
        $group: {
          _id: '$answer',
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$count' },
          results: { $push: { answer: '$_id', count: '$count' } }
        }
      },
      {
        $unwind: '$results'
      },
      {
        $project: {
          _id: 0,
          answer: '$results.answer',
          count: '$results.count',
          percentage: { $multiply: [{ $divide: ['$results.count', '$total'] }, 100] }
        }
      }
    ]) as unknown as { value: IFindSurveyResultModel }
    return res.value
  }
}
