import connectdb from './base.db'
import { SERVER_PORT, SERVER_HOST } from './base.config'
import UserCRUD from '../crud/user.crud'
import { json, urlencoded } from 'body-parser'
import express from 'express';

const app = express();
app.use(json())
app.use(urlencoded({ extended: true }))
app.disable('x-powered-by')
app.get('/user', UserCRUD.getAllUser)
app.post('/user/add', UserCRUD.createUser)
app.put('/user/:id', UserCRUD.updateUser)
app.delete('/user/:id', UserCRUD.deleteUser)


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