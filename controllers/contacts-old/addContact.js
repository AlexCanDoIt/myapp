const { v4 } = require('uuid')
const contactSchema = require('../../utils/validate/schemas/contacts')
const contacts = require('../../data/contacts.json')

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }

  const newContact = { ...req.body, id: v4() }
  contacts.push(newContact)

  res.json({
    status: 'success',
    code: 201,
    data: {
      result: newContact
    }
  })
}

module.exports = addContact
