const mongoose = require('mongoose')
const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

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
