export interface ISurveyModel {
  _id: string
  question: string
  answers: ISurveyAnswerModel[]
  date: Date
}

export interface ISurveyAnswerModel {
  image?: string
  answer: string
}
