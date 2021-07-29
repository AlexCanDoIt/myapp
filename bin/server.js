const mongoose = require('mongoose')
const app = require('../app')

const { DB_USER, DB_USER_PASS, DB_NAME, PORT = 3000 } = process.env
const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.jsrmm.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Database connection successful')

  app.listen(PORT)
}).catch(err => {
  console.log(err)
  process.exit(1)
})
