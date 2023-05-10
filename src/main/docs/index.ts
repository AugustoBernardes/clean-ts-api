import { unauthorized, serverError, badRequest, notFound, forbidden } from './components'
import { accountSchema, apiKeyAuthSchema, errorSchema, loginParamsSchema, surveyAnswerSchema, surveySchema, surveysSchema } from './schemas'
import { loginPath, surveyPath } from './paths'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'Api from course to realize surveys between developers',
    version: '1.0.0'
  },
  license: {
    name: 'GNU General Public License v3.0 or later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [
    {
      url: '/api'
    }
  ],
  tags: [{
    name: 'Login'
  },
  {
    name: 'Survey'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    unauthorized,
    serverError,
    notFound,
    forbidden
  }
}
