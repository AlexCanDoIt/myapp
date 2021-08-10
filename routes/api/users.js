const express = require('express')
const { authenticate } = require('../../middleware')
const { users: ctrl } = require('../../controllers')
const router = express.Router()

router.post('/current', authenticate, ctrl.current)

module.exports = router
