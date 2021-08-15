
const sgMail = require('@sendgrid/mail')
require('dotenv').config()
const { SENDGRID_API_KEY } = process.env

sgMail.setApiKey(SENDGRID_API_KEY)

const sendMail = async({ to, subject, text, html }) => {
  const mail = {
    to,
    from: 'mr.archibaldd@gmail.com',
    subject,
    text,
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
