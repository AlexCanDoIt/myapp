const express = require('express')
const { contacts: ctrl } = require('../../model')
const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', express.json(), ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId', express.json(), ctrl.updateContact)

module.exports = router
