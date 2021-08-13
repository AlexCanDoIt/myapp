const { Schema } = require('mongoose')
const bcrypt = require('bcryptjs')
const Joi = require('joi')
const gravatar = require('gravatar')

const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    }
  },
  idCloudAvatar: {
    type: String,
    default: null
  }
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const validateUser = (newUser) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required()
  })

  const { error } = schema.validate(newUser)
  return error
}

module.exports = { userSchema, validateUser }
