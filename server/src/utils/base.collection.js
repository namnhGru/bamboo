// utility to make a model a collection
export const getAll = model => async () => await model.find().exec()
export const getMany = model => async condition => await model.find(condition).exec()
export const getOne = model => async uniqueCondition => await model.findOne(uniqueCondition).exec()
export const createOne = model => async createParams => await model.create(createParams)
export const updateOne = model => async (condition, updater, callback) => await model.findOneAndUpdate(condition, updater, { new: true, useFindAndModify: false , upsert: true}, callback).exec()
export const deleteOne = model => async deleteParams => await model.findOneAndRemove(deleteParams)

export default model => ({
  getAll: getAll(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
})
