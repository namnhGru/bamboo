import connectdb from './base.db'
import { SERVER_PORT, SERVER_HOST } from './base.config'
import UserCRUD from '../crud/user.crud'
import RoleCRUD from '../crud/role.crud'
import PermissionCRUD from '../crud/permission.crud'
import MenuCRUD from '../crud/menu.crud'
import TokenCRUD, { refreshToken , deleteRefreshToken } from '../crud/token.crud'
import { signin, signup, protect } from './base.auth'
import { json, urlencoded } from 'body-parser'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(json())
app.use(urlencoded({ extended: true }))
// app.disable('x-powered-by')
app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: "http://localhost:8080"
}))

app.post('/signin', signin)
app.post('/signup', signup)
app.post('/refresh_token', refreshToken)
app.post('/delete_refresh', deleteRefreshToken)

app.use('/', protect)

app.get('/user', UserCRUD.getAll)
app.post('/user/add', UserCRUD.createOne)
app.put('/user/update', UserCRUD.updateOne)
app.delete('/user/:id', UserCRUD.deleteOne)

app.get('/role', RoleCRUD.getAll)
app.post('/role/add', RoleCRUD.createOne)
app.put('/role/:id', RoleCRUD.updateOne)
app.delete('/role/:id', RoleCRUD.deleteOne)

app.get('/permission', PermissionCRUD.getAll)
app.put('/permission/:id', PermissionCRUD.updateOne)

app.get('/menu', MenuCRUD.getAll)
app.post('/menu/add', MenuCRUD.createOne)
app.put('/menu/:id', MenuCRUD.updateOne)
app.delete('/menu/:id', MenuCRUD.deleteOne)

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