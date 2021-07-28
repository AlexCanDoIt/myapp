const express = require('express')
const { contacts: ctrl } = require('../../controllers')
const { validateMiddleware } = require('../../middleware')
const { contact: { validateContact } } = require('../../model/schemas')
const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:id', ctrl.getById)

router.post('/', express.json(), validateMiddleware(validateContact), ctrl.add)

router.put('/:id', express.json(), ctrl.update)

router.patch('/:id/favorite', express.json(), ctrl.update)

router.delete('/:id', ctrl.del)

module.exports = router
