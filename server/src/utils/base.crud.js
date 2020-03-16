export const createOne = collection => (req, res) => {
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

export const getAll = collection => (req, res) => {
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

export const updateOne = collection => (req, res) => {
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

export const deleteOne = collection => (req, res) => {
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

export default collection => ({
  createOne: createOne(collection),
  getAll: getAll(collection),
  updateOne: updateOne(collection),
  deleteOne: deleteOne(collection)
})