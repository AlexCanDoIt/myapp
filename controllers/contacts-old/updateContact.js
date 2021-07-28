const contactSchema = require('../../utils/validate/schemas/contacts')
const contacts = require('../../data/contacts.json')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const index = contacts.findIndex(({ id }) => String(id) === contactId)

  if (index === -1) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
    return
  }

  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }

  contacts[index] = { ...req.body, id: contactId }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts[index]
    }
  })
}

module.exports = updateContact
