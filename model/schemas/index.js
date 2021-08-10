const { userSchema, validateUser } = require('./user')
const { contactSchema, validateContact } = require('./contact')

module.exports = {
  userSchema,
  validateUser,
  contactSchema,
  validateContact
}
