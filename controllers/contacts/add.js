const { contact: service } = require('../../services')

const add = async (req, res, next) => {
  const { body } = req

  try {
    const result = await service.add(body)

    // if (!result) {
    //   res.status(400).json({
    //     status: 'error',
    //     code: 400,
    //     message: 'Bad request'
    //   })
    // }

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports = add
