export type ISurveyModel = {
  _id: string
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
}

type ISurveyAnswerModel = {
  image?: string
  answer: string
}
