import { unauthorized, serverError, badRequest, notFound } from './components'
import { accountSchema, errorSchema, loginParamsSchema } from './schemas'
import { loginPath } from './paths'

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
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    unauthorized,
    serverError,
    notFound
  }
}
