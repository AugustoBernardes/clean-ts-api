
import { IAccountModel } from '@/domain/models/account'
import { ISurveyModel } from '@/domain/models/survey'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeAccount = async (): Promise<IAccountModel> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any_password'
  })
  const account = await accountCollection.findOne({
    _id: res.insertedId
  }) as unknown as IAccountModel

  return account
}

const makeSurvey = async (): Promise<ISurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'other_answer'
      },
      {
        answer: 'any_answer'
      }
    ],
    date: new Date()
  })
  const survey = await surveyCollection.findOne({
    _id: res.insertedId
  }) as unknown as ISurveyModel

  return survey
}

describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Save', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey._id,
        accountId: account._id,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      console.log(surveyResult)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult._id).toBeTruthy()
    })

    test('Should update a survey result if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      await sut.save({
        surveyId: survey._id,
        accountId: account._id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const surveyResult = await sut.save({
        surveyId: survey._id,
        accountId: account._id,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
