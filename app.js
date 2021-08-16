const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./configs/passport-config')

const api = require('./routes/api')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

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

// const sgMail = require('@sendgrid/mail')
// // require('dotenv').config()
// const { SENDGRID_API_KEY } = process.env

// sgMail.setApiKey(SENDGRID_API_KEY)

// const sendMail = async() => {
//   const mail = {
//     to: 'mr.archibaldd@gmail.com',
//     from: 'alexcandoitt@gmail.com',
//     subject: 'Подтвердите свой email',
//     text: 'hi',
//     html: `<a href="http://localhost:3000/api/v1/auth/verify/${123}">Нажмите для подтверждения email</a>`
//   }

//   try {
//     const answer = await sgMail.send(mail)
//     return answer
//   } catch (err) {
//     console.log(err)
//     throw err
//   }
// }

// sendMail()
