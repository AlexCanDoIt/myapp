const express = require('express')
const { contacts: ctrl } = require('../../model')
const router = express.Router()

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

// router.post('/', contactsModel.addContact)

// router.delete('/:contactId', contactsModel.removeContact)

// router.patch('/:contactId', contactsModel.updateContact)

module.exports = router
