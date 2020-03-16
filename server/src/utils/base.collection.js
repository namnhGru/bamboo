// utility to make a model a collection
const getAll = model => async () => await model.find().exec()
const getMany = model => async condition => await model.find(condition).exec()
const getOne = model => async uniqueCondition => await model.find(uniqueCondition).exec()
const createOne = model => async createParams => await model.create(createParams)
const updateOne = model => async (condition, updater) => await model.findOneAndUpdate(condition, updater, { new: true, useFindAndModify: false }).exec()
const deleteOne = model => async deleteParams => await model.findOneAndRemove(deleteParams)

const makeCollection = model => ({
  getAll: getAll(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})

export default makeCollection;

