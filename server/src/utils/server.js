import connectdb from './db'
import { SERVER_PORT, SERVER_HOST } from './config'
import { getAllUser } from './../crud/user.crud'
import express from 'express';

const app = express();
app.disable('x-powered-by')
app.post('/', getAllUser)

export const start = async () => {
  try {
    await connectdb()
    app.listen(SERVER_PORT, () => {
      console.log(`REST API on ${SERVER_HOST}:${SERVER_PORT}`)
    })

  } catch (e) {
    console.error(e)
  }
}