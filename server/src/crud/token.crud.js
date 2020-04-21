import TokenCollection from '../collection/token.collection'
import UserCollection from '../collection/user.collection'
import makeCRUD from '../utils/base.crud'
import { uuid } from 'uuidv4'
import { REFRESH_TOKEN_EXPIRES, JWT_EXPIRES} from '../utils/base.config'
import { newToken, newTokenExpiry } from '../utils/base.auth'

export default makeCRUD(TokenCollection)

export const deleteRefreshToken = (req, res) => {
  res.cookie('refresh_token', 'delete refresh', {
    maxAge: new Date(new Date().getTime()), // convert mins to milliseconds,
    httpOnly: true,
    secure: false
  });
  res.status(200).end();
}

export const refreshToken = async (req, res) => {
  try {
    const oldRefresh = req.cookies['refresh_token']
    console.log(oldRefresh)
    const token = await TokenCollection.getOne({
      token: oldRefresh,
    })

    if (token) {
      const newRefresh = uuid()
      await TokenCollection.updateOne({_id: token._id}, {
        $set: {
          token: newRefresh,
          exp: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000)
        }
      })

      res.cookie('refresh_token', newRefresh, {
        maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert mins to milliseconds,
        httpOnly: true,
        secure: false
      });

      const newRefreshToken = await TokenCollection.getOne({token: newRefresh})
      const user = await UserCollection.getOne({_id: newRefreshToken.user})

      res.status(200).json({ 
        token: newToken(user),
        tokenExpiry: newTokenExpiry(),
        userInfo: user.email
      }) 
    } else {
      res.status(400).end()
    }
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}