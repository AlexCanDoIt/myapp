const contacts = require('../contacts.json')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const selectContact = contacts.find(({ id }) => String(id) === contactId)

  if (!selectContact) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'contact with this id not found'
    })
    return
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      result: selectContact
    }
  })
}

module.exports = getContactById
