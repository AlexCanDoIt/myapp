const { contact: service } = require('../../services')

const toggleFavorite = async (req, res, next) => {
  const { id } = req.params
  const { favorite } = req.body

  try {
    const result = await service.update(id, { favorite })

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

module.exports = toggleFavorite
