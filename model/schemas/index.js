const { userSchema, validateEmail, validateUser } = require('./user')
const { contactSchema, validateContact } = require('./contact')

module.exports = {
  userSchema,
  validateEmail,
  validateUser,
  contactSchema,
  validateContact
}
