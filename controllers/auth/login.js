const jwt = require('jsonwebtoken')
require('dotenv').config()
const { user: service } = require('../../services')

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await service.getOne({ email })

    if (!user || !user.comparePassword(password)) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Email or password is wrong'
      })
      return
    }

    const { SECRET_KEY } = process.env
    const payload = { id: user._id }
    const token = jwt.sign(payload, SECRET_KEY)

    await service.updateById(user._id, { token })

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: {
          email,
          subscription: 'starter',
          token
        }
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = login
