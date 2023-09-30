/* eslint-disable @typescript-eslint/no-misused-promises */
import { auth } from '../middlewares/auth'
import { Router } from 'express'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeFindSurveyResultController } from '../factories/controllers/survey-result/find-survey-result/find-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeFindSurveyResultController()))
}
