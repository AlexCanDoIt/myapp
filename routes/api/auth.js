const express = require('express')
const { auth: ctrl } = require('../../controllers')
const { authenticate, validateMiddleware } = require('../../middleware')
const { validateUser } = require('../../model/schemas')
const router = express.Router()

router.post('/signup', express.json(), validateMiddleware(validateUser), ctrl.signup)

router.get('/verify/:token', express.json(), ctrl.verify)

router.post('/login', express.json(), validateMiddleware(validateUser), ctrl.login)

router.post('/logout', authenticate, ctrl.logout)

module.exports = router
