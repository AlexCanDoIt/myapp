const contacts = require('../../data/contacts.json')

const removeContact = (req, res) => {
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

  contacts.splice(index, 1)

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Contact deleted'
  })
}

module.exports = removeContact
