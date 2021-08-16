const sgMail = require('@sendgrid/mail')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async({ to, subject, html }) => {
  const mail = {
    from: 'alexcandoitt@gmail.com',
    to,
    subject,
    html
  }

  try {
    const answer = await sgMail.send(mail)
    return answer
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = sendMail

/*
* Не работает отправка через nodemailer
* Error: Message failed: 550 Message body: SPAM FOUND

const nodemailer = require('nodemailer')
require('dotenv').config()

const { EMAIL_PASSWORD } = process.env

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'alexcandoit@meta.ua',
    pass: EMAIL_PASSWORD
  },
}

const transporter = nodemailer.createTransport(nodemailerConfig)

const sendMail = async ({ to, subject, text }) => {
  const mail = {
    from: 'alexcandoit@meta.ua',
    to,
    subject,
    text
  }

  try {
    const result = transporter.sendMail(mail)
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = sendMail
*/
