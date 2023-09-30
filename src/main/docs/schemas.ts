import { signupParamsSchema, errorSchema, surveyAnswerSchema, saveSurveyParamsSchema, surveyResultSchema, addSurveyParamsSchema, surveySchema, surveysSchema, loginParamsSchema, accountSchema, findSurveyResultSchema } from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  error: errorSchema,
  surveys: surveysSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  addSurveyParams: addSurveyParamsSchema,
  saveSurveyParams: saveSurveyParamsSchema,
  surveyResult: surveyResultSchema,
  findSurveyResult: findSurveyResultSchema
}
