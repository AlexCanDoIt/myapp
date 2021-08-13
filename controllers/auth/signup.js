const { user: service } = require('../../services')

const signup = async (req, res, next) => {
  try {
    const result = await service.getOne({ email: req.body.email })

    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Email in use'
      })
      return
    }

    const { email, subscription, avatar } = await service.add(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: {
          email,
          subscription,
          avatar,
        }
      }
    })
  } catch (err) {
    next(err)
  }
}

// const signup = async (req, res, next) => {
//   const { email, password, avatar } = req.body

//   try {
//     const result = await service.getOne({ email })

//     if (result) {
//       res.status(409).json({
//         status: 'error',
//         code: 409,
//         message: 'Email in use'
//       })
//       return
//     }

//     await service.add({ email, password })
//     res.status(201).json({
//       status: 'success',
//       code: 201,
//       data: {
//         result: {
//           email,
//           subscription: 'starter',
//           avatar
//         }
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// }

module.exports = signup
