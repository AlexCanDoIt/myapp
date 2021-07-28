const { model } = require('mongoose')
const { contact: { contactSchema } } = require('./schemas')

const Contact = model('contact', contactSchema)

module.exports = Contact
