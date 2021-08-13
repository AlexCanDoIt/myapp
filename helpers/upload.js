const path = require('path')
const multer = require('multer')
const moment = require('moment')
require('dotenv').config()

const now = moment().format('YY-MM-DD_hh-mm-ss')
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    cb(null, now + '_' + file.originalname)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true)
      return
    }

    const error = new Error('Wrong format file for avatar')
    error.status = 400
    cb(error)
  },
})

module.exports = upload
