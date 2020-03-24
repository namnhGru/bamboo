import TokenCollection from '../collection/token.collection'
import UserCollection from '../collection/user.collection'
import makeCRUD from '../utils/base.crud'
import { uuid } from 'uuidv4'
import { REFRESH_TOKEN_EXPIRES, JWT_EXPIRES} from '../utils/base.config'
import { newToken, newTokenExpiry } from '../utils/base.auth'

export default makeCRUD(TokenCollection)


export const refreshToken = async (req, res) => {
  try {
    console.log(req.headers.cookie)
    const user = await UserCollection.getOne({
      email: req.body.email,
      password: req.body.password
    })
    const token = await TokenCollection.getOne({
      token: req.headers.cookie,
      user: user._id
    })
    const newRefresh = uuid()

    TokenCollection.updateOne({user: user._id}, {
      token: newRefresh,
      user: user._id,
      exp: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000)
    })
    res.cookie('refresh_token', newRefresh, {
      maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert mins to milliseconds,
      httpOnly: true,
      secure: false
    });
    res.status(200).json({ 
      token: newToken(user),
      tokenExpiry: newTokenExpiry()
    }) 
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}