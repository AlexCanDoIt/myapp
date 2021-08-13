const mongoose = require('mongoose')
const app = require('../app')
const createFolderIsNotExist = require('../helpers/create-folder')
const path = require('path')
require('dotenv').config()

const { DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.jsrmm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
const UPLOAD_DIR = path.join(process.env.UPLOAD_DIR)
const AVATAR_OF_USERS = path.join('public', process.env.AVATAR_OF_USERS)

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Database connection successful')

  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR)
    await createFolderIsNotExist(AVATAR_OF_USERS)
  })
}).catch(err => {
  console.log(err)
  process.exit(1)
})
