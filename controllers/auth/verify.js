const { user: service } = require('../../services')

const verify = async (req, res, next) => {
  const { token } = req.params

  try {
    const user = await service.getOne({ verifyToken: token })

    if (!user) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Verification token is not valid'
      })
    }

    const { _id, email, subscription, avatar } = await service.updateById(user._id, { verify: true, verifyToken: '' })

    res.json({
      status: 'success',
      code: 200,
      data: {
        _id,
        email,
        verify: true,
        subscription,
        avatar
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = verify
