const express = require('express')
const { authenticate } = require('../../middleware')
const { users: ctrl } = require('../../controllers')
const upload = require('../../helpers/upload')
const router = express.Router()

router.post('/current', authenticate, ctrl.current)
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars)

module.exports = router
