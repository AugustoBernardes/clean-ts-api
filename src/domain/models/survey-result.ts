export type ISurveyResultModel = {
  _id: string
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export type IFindSurveyResultModel = {
  answer: string
  count: number
  percentage: number
}

export type ISurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
}
