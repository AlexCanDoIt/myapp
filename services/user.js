const { User } = require('../model')

const getById = id => User.findById(id)

const getOne = (filter) => User.findOne(filter)

const add = ({ email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, body) => User.findByIdAndUpdate(id, body)

module.exports = {
  getById,
  getOne,
  add,
  updateById
}
