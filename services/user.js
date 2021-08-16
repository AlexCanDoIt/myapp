const { User } = require('../model')

const getById = id => User.findById(id)

const getOne = (filter) => User.findOne(filter)

const add = ({ password, ...other }) => {
  const newUser = new User(other)
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, body) => User.findByIdAndUpdate(id, body)

const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar })
}

module.exports = {
  getById,
  getOne,
  add,
  updateById,
  updateAvatar,
}
