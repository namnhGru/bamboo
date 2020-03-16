const createUser = collection => (req, res) => {
  try {
    collection.createOne(req.body)
      .then(data => {
        res.status(200).json({ data: data })
      })
      .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const getAllUser = collection => (req, res) => {
  try {
    collection.getAll()
      .then(data => {
        res.status(200).json({ data: data })
      })
      .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const updateUser = collection => (req, res) => {
  try {
    collection.updateOne(oldData, newData)
      .then(data => {
        res.status(200).json({ data: data })
      })
      .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const deleteUser = collection => (req, res) => {
  try {
    collection.deleteOne(data)
      .then(data => {
        res.status(200).json({ data: data })
      })
      .catch(console.error)
  } catch (err) {
    console.error(err)
    res.status(400).end()
  }
}

const makeCRUDController = collection => ({
  createUser: createUser(collection),
  getAllUser: getAllUser(collection),
  updateUser: updateUser(collection),
  deleteUser: deleteUser(collection)
})

export default makeCRUDController;