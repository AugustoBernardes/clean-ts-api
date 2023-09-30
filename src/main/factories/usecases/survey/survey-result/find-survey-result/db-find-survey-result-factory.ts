import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { IFindResultBySurveyId } from '@/domain/usecases/survey-result/find-survey-result'
import { DbFindSurveyResult } from '@/data/usecases/survey-result/find-survey-results/db-find-survey-result'

export const makeDbFindSurveyResult = (): IFindResultBySurveyId => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbFindSurveyResult(surveyResultMongoRepository)
}
