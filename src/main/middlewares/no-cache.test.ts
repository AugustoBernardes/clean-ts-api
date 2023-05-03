import request from 'supertest'
import { noCache } from './no-cache'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should disable cache', async () => {
    app.get('/test_nocache', noCache, (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_nocache')
      .expect('cache-contol', 'no-store, no-cache, must-revalidate, proxy-revalidate')
      .expect('pragma', 'no-cache')
      .expect('expires', '0')
      .expect('surrogate-control', 'no-store')
  })
})
