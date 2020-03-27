import UserCollection from '../collection/user.collection'
import makeCRUD from '../utils/base.crud'
import bcrypt from 'bcrypt'

const updateOne = collection => async (req, res) => {
  try {
    const saltRound = 10;
    const plaintext = req.body.password;
    const email = req.body.email;
    const salt = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRound, function(err, salt){
        if (err) { reject(err) }
        resolve(salt)
      })
    })
    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(plaintext, salt, function (err, hash) {
        if (err) { reject(err)}
        resolve(hash)
      })
    })
    const data = await collection.updateOne({email: email}, {
      $set: {
        password: hash
      }
    })
    
    res.status(200).json({ data: data })

  } catch (err) {
    console.err(err)
    res.status(400).end()
  }
}

export default {
  ...makeCRUD(UserCollection),
  updateOne: updateOne(UserCollection)
}