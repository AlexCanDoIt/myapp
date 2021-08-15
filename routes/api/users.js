const express = require('express')
const { authenticate } = require('../../middleware')
const { users: ctrl } = require('../../controllers')
const upload = require('../../utils/upload')
const router = express.Router()

router.post('/current', authenticate, ctrl.current)
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars)
router.get('/verify/:token', ctrl.verify)
// router.post('/verify', ctrl.repeatEmailVerification)

module.exports = router
