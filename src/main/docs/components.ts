import { serverError, forbidden, notFound, unauthorized, badRequest } from './components/'
import { apiKeyAuthSchema } from './schemas/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  unauthorized,
  serverError,
  notFound,
  forbidden
}
