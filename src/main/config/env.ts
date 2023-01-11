/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import * as dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT || 5050
}
