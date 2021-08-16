const express = require('express')
const { authenticate, validateMiddleware } = require('../../middleware')
const { validateEmail } = require('../../model/schemas')
const { users: ctrl } = require('../../controllers')
const upload = require('../../utils/upload')
const router = express.Router()

router.post('/verify', express.json(), validateMiddleware(validateEmail), ctrl.repeatEmailVerification)

router.post('/current', authenticate, ctrl.current)

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars)

module.exports = router
