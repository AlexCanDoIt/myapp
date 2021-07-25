const contacts = require('../contacts.json')

const listContacts = (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts
    }
  })
}

module.exports = listContacts
