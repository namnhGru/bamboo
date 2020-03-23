import { JWT_SECRET, JWT_EXPIRES } from './base.config'
import { lang_EN } from './base.lang'
import UserCollection from '../collection/user.collection'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: lang_EN.missingAuth })
  }
  try {
    UserCollection.createOne(req.body)
    .then(user => 
      res.status(201).send({ token: newToken(user) })
    )
    .catch(err => {
      console.error(err)
      res.status(401).json({ err: err.errmsg });
    })
  } catch (e) {
    console.error(e)
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: lang_EN.missingAuth })
  }

  try {
    UserCollection.getOne({ email: req.body.email, password: req.body.password })
      .then(user => {
        user ? res.status(200).send({ token: newToken(user) }) : res.status(401).send(lang_EN.invalidAuth)
      } 
      )
      .catch(e => {
        console.log(e)
        res.status(401).send(lang_EN.invalidAuth)
      })
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization
  console.log(bearer)
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send(lang_EN.invalidAuth)
  }
  verifyToken(bearer.split('Bearer ')[1].trim())
  .then(payload => 
    UserCollection.getOne({ _id: payload.id})
    .then(user => {
      req.user = user;
      next()
    })
      .catch(e => res.status(401).send(lang_EN.invalidAuth))
  )
  .catch(e => res.status(401).json({ status: false }))
}