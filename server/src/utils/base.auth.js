import { JWT_SECRET, JWT_EXPIRES, REFRESH_TOKEN_EXPIRES } from './base.config'
import TokenCollection from '../collection/token.collection'
import { lang_EN } from './base.lang'
import UserCollection from '../collection/user.collection'
import jwt from 'jsonwebtoken'
import { uuid } from 'uuidv4'

export const newToken = user => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: `${JWT_EXPIRES}m`
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const newTokenExpiry = () => new Date(new Date().getTime() + JWT_EXPIRES * 60 * 1000)

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: lang_EN.missingAuth })
  }
  try {
    const user = await UserCollection.createOne(req.body)
    res.status(201).send({ token: newToken(user) })
  } catch (err) {
    console.error(err)
    res.status(401).json({ err: err.errmsg });
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: lang_EN.missingAuth })
  }

  try {
    const user = await UserCollection.getOne({ email: req.body.email, password: req.body.password })
    console.log(user, req.body)
    const refresh_token = uuid()
    TokenCollection.updateOne({user: user._id}, {
      token: refresh_token,
      user: user._id,
      exp: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES * 60 * 1000)
    })
    res.cookie('refresh_token', refresh_token, {
      maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert mins to milliseconds,
      httpOnly: true,
      secure: false
    });
    res.status(200).json({ 
      token: newToken(user),
      tokenExpiry: newTokenExpiry()
    }) 
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization
  console.log(bearer)
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send(lang_EN.invalidAuth)
  }
  try {
    const payload = await verifyToken(bearer.split('Bearer ')[1].trim())
    req.user = await UserCollection.getOne({ _id: payload.id})
    next()
  } catch (e) { 
    console.error(e)
    res.status(401).json({ status: 'token error' })
  }
}