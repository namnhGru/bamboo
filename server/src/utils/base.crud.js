export const createOne = collection => (req, res) => {
  collection.createOne(req.body)
    .then(data => {
      res.status(200).json({ data: data })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ err: err.errmsg })
    })
}

export const getAll = collection => (req, res) => {
  collection.getAll()
    .then(data => {
      res.status(200).json({ data: data })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ err: err.errmsg })
    })
}

export const updateOne = collection => (req, res) => {
  collection.updateOne({ _id: req.params.id }, req.body)
    .then(data => {
      res.status(200).json({ data: data })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ err: err.errmsg })
    })
}

export const deleteOne = collection => (req, res) => {
  collection.deleteOne(data)
    .then(data => {
      res.status(200).json({ data: data })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({ err: err.errmsg })
    })
}

export default collection => ({
  createOne: createOne(collection),
  getAll: getAll(collection),
  updateOne: updateOne(collection),
  deleteOne: deleteOne(collection)
})