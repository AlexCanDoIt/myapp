const { nanoid } = require('nanoid')
const { user: service } = require('../../services')
const sendMail = require('../../utils/send-mail')

const signup = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const result = await service.getOne({ email })

    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use'
      })
      return
    }

    const verifyToken = nanoid()
    const { subscription, avatar } = await service.add({ email, password, verifyToken })

    const mail = {
      to: email,
      subject: 'Confirm your email',
      html: `<a href="http://localhost:3000/api/v1/auth/verify/${verifyToken}">Click to confirm email</a>`
    }

    await sendMail(mail)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: {
          email,
          verifyToken,
          subscription,
          avatar
        }
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = signup
