import connectdb from './base.db'
import { SERVER_PORT, SERVER_HOST } from './base.config'
import UserCRUD from '../crud/user.crud'
import RoleCRUD from '../crud/role.crud'
import PermissionCRUD from '../crud/permission.crud'
import MenuCRUD from '../crud/menu.crud'
import { signin, signup, protect } from './base.auth'
import { json, urlencoded } from 'body-parser'
import express from 'express';
import cors from 'cors'

const app = express();
app.use(json())
app.options('*', cors())
app.use(urlencoded({ extended: true }))
app.disable('x-powered-by')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.post('/signin', signin)
app.post('/signup', signup)

app.use('/', protect)

app.get('/user', UserCRUD.getAll)
app.post('/user/add', UserCRUD.createOne)
app.put('/user/:id', UserCRUD.updateOne)
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