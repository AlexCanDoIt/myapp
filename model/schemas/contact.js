const { Schema } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    minlength: 2,
    required: [true, 'Set name for contact']
  },
  email: {
    type: String,
    minlength: 4,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please fill a valid email address'
    ]
  },
  phone: {
    type: String,
    minlength: 6,
    match: [
      /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
      'Please fill a valid phone number'
    ],
  },
  favorite: {
    type: Boolean,
    default: false
  }
},
{
  versionKey: false,
  timestamps: true
})

// contactSchema.methods.validateData = function (newContact) {
//   const schema = Joi.object({
//     name: Joi.string().min(2).required(),
//     email: Joi.string().email(),
//     phone: Joi.string(),
//     favorite: Joi.boolean()
//   })
//   const { error } = schema.validate(newContact)
//   return error
// }

const validateContact = (newContact) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean()
  })
  const { error } = schema.validate(newContact)
  return error
}

module.exports = { contactSchema, validateContact }
