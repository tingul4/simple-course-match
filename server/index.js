require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 8080
const { auth, course } = require('./routes')
const passport = require('passport')
require('./config/passport')(passport)
const cors = require('cors')

mongoose
  .connect('mongodb://127.0.0.1:27017/mernDB')
  .then(() => {
    console.log('connect to mongodb successfully!')
  })
  .catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/user', auth)
app.use('/api/courses', passport.authenticate('jwt', { session: false }), course) // need JWT to authorize

app.listen(PORT, () => console.log(`backend server is listening on PORT ${PORT}...`))