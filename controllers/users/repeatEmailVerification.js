const { user: service } = require('../../services')
const sendEmail = require('../../utils/send-mail')

const repeatEmailVerification = async (req, res, next) => {
  try {
    const user = await service.getOne({ email: req.body.email })

    if (user) {
      const { email, verify, verifyToken } = user

      if (verify) {
        res.status(400).json({
          message: 'Verification has already been passed',
        })
        return
      }

      const mail = {
        to: email,
        subject: 'Confirm your email',
        html: `<a href="http://localhost:3000/api/v1/auth/verify/${verifyToken}">Click to confirm email</a>`
      }

      sendEmail(mail)

      res.json({
        message: 'Verification email sent',
      })
    }
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = repeatEmailVerification
