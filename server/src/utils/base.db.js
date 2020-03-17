import { connect } from 'mongoose';
import { DB_HOST, DB_PORT, DB_DATABASE } from './base.config'

export default () => connect(`${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})