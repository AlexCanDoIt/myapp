const express = require('express')

const router = express.Router()

const users = [
  { _id: '1', name: 'Archibald' },
  { _id: '2', name: 'Batman' },
  { _id: '3', name: 'Jim' }
]

router.get('/', async (req, res, next) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: users
    }
  })
})

module.exports = router
