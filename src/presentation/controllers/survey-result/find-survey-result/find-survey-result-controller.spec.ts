import { Controller, IHttpRequest, forbidden, serverError, ok, IFindResultBySurveyId, MissingParamError } from './find-survey-result-controller-protocols'
import { mockResultSurveyById, throwError } from '@/domain/test/index'
import { FindSurveyResultController } from './find-survey-result-controller'
import { mockFindResultBySurveyId } from '@/presentation/test'

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  sut: Controller
  findResultBySurveyIdStub: IFindResultBySurveyId
}

const makeSut = (): SutTypes => {
  const findResultBySurveyIdStub = mockFindResultBySurveyId()
  const sut = new FindSurveyResultController(findResultBySurveyIdStub)
  return {
    sut,
    findResultBySurveyIdStub
  }
}

describe('FindSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, findResultBySurveyIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(findResultBySurveyIdStub, 'findSurveyResult')
    await sut.handle(makeFakeRequest())

    expect(loadByIdSpy).toBeCalledWith('any_survey_id')
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, findResultBySurveyIdStub } = makeSut()
    jest.spyOn(findResultBySurveyIdStub, 'findSurveyResult').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return error 403 if surveyId is not provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {}
    })
    expect(httpResponse).toEqual(forbidden(new MissingParamError('surveyId')))
  })

  test('Should return error 200 request was a success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(mockResultSurveyById()))
  })
})
