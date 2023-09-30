import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { FindSurveyResultController } from '@/presentation/controllers/survey-result/find-survey-result/find-survey-result-controller'
import { makeDbFindSurveyResult } from '@/main/factories/usecases/survey/survey-result/find-survey-result/db-find-survey-result-factory'

export const makeFindSurveyResultController = (): Controller => {
  const controller = new FindSurveyResultController(makeDbFindSurveyResult())
  return makeLogControllerDecorator(controller)
}
