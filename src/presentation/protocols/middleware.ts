import { IHttpRequest, IHttpResponse } from './http'

export interface Middleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
