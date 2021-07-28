const { Contact } = require('../model')

const getAll = (query) => {
  return Contact.find(query)
}

const getById = async (id) => {
  try {
    const result = await Contact.findById(id)
    return result
  } catch (err) {
    if (err.message.includes('Cast to ObjectId failed')) {
      return null
    }

    throw err
  }
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const update = async (id, updateContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(id, updateContact, { new: true })
    return result
  } catch (err) {
    if (err.message.includes('Cast to ObjectId failed')) {
      return null
    }

    throw err
  }
}

const del = async (id) => {
  try {
    const result = await Contact.findByIdAndDelete(id)
    return result
  } catch (err) {
    if (err.message.includes('Cast to ObjectId failed')) {
      return null
    }

    throw err
  }
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  del
}
