// utility to make a model a collection
const getAll = model => async () => await model.find().exec()
const getMany = model => async condition => await model.find(condition).exec()
const getOne = model => async uniqueCondition => await model.find(uniqueCondition).exec()

const makeCollection = model => ({
  getAll: getAll(model),
  getMany: getMany(model),
  getOne: getOne(model)
})

export default makeCollection;

