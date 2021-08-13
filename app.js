const path = require('path')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./configs/passport-config')

const api = require('./routes/api')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(logger(formatsLogger))
app.use(cors())

// ===========================================================================

// const path = require('path')
// const fs = require('fs/promises')
// const multer = require('multer')
// // const moment = require('moment')
// const jimp = require('jimp')

// // const now = moment().format('YY-MM-DD_hh-mm-ss')
// const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)
// const AVATAR_OF_USERS = path.join(process.cwd(), 'public', process.env.AVATAR_OF_USERS)

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, UPLOAD_DIR)
//   },
//   filename: (req, file, cb) => {
//     // cb(null, now + '_' + file.originalname)
//     cb(null, file.originalname)
//   },
//   limits: { fileSize: 200000000 },
//   fileFilter: (req, file, cb) => {
//     file.mimetype.includes('image')
//       ? cb(null, true)
//       : cb(null, false)
//   }
// })
// const upload = multer({ storage })

// app.use(express.static(path.join(process.cwd(), 'public')))

// app.post('/avatars', upload.single('avatar'), async (req, res, next) => {
//   // console.log(req.file)
//   // console.log(req.body)

//   if (req.file) {
//     const { file } = req
//     const img = await jimp.read(file.path)

//     await img
//       .autocrop()
//       .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
//       .writeAsync(file.path)

//     await fs.rename(file.path, path.join(AVATAR_OF_USERS, file.originalname))
//   }

//   res.redirect('/')
// })

// ===========================================================================

// const multer = require('multer')
// const path = require('path')

// const tempDir = path.join(process.cwd(), 'public', 'temp')
// const avatarDir = path.join(process.cwd(), 'public', 'avatar')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, tempDir)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
//   limits: {
//     fileSize: 500000
//   }
// })

// const uploadMiddleware = multer({
//   storage
// })

// app.post('/register', uploadMiddleware.single('avatar'), (req, res, next) => {
//   const { path: tempName, originalname } = req.file
// })

// ===========================================================================

app.use('/api/v1/auth', api.auth)
app.use('/api/v1/users', api.users)
app.use('/api/v1/contacts', api.contacts)

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  })
})

app.use((err, _, res, __) => {
  const { code = 500, message = 'Server error' } = err

  res.status(code).json({
    status: 'fail',
    code,
    message
  })
})

module.exports = app
