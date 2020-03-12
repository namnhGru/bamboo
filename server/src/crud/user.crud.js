import UserCollection from '../collection/user.collection'

export const getAllUser = (req, res) => {
  try {
    UserCollection.getMany({email: 'xxx2@gmail.com'})
    .then(users => {
      res.status(200).json({data: users})
    })
    .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}