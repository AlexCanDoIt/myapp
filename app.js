const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./configs/passport-config')

const api = require('./routes/api')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// =================================================================================================

// const nodemailer = require('nodemailer')
// // require('dotenv').config()

// const { EMAIL_PASSWORD } = process.env

// const nodemailerConfig = {
//   host: 'smtp.meta.ua',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'alexcandoit@meta.ua',
//     pass: EMAIL_PASSWORD
//   },
// }

// const transporter = nodemailer.createTransport(nodemailerConfig)

// const mail = {
//   from: 'alexcandoit@meta.ua',
//   to: 'alexcandoitt@gmail.com',
//   subject: 'Test email subject',
//   text: 'Test email text',
//   html: '<h2>Test message in html</h2>'
// }

// transporter.sendMail(mail)
//   .then(info => console.log(info))
//   .catch(err => console.log(err))

// =================================================================================================

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(logger(formatsLogger))
app.use(cors())

app.use('/api/v1/auth', api.auth)
app.use('/api/v1/users', api.users)
app.use('/api/v1/contacts', api.contacts)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  })
})

app.use((err, _, res, __) => {
  const { code = 500, message = 'Server error' } = err

  res.status(code).json({
    status: 'fail',
    code,
    message
  })
})

module.exports = app
