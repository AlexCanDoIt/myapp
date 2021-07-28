const { contact: service } = require('../../services')

const update = async (req, res, next) => {
  const { id } = req.params
  const { body } = req

  try {
    const result = await service.update(id, body)

    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = update
