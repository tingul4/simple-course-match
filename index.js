require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { auth, course } = require('./routes')
const passport = require('passport')
require('./config/passport')(passport)
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 8080

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connect to mongodb successfully!')
  })
  .catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use('/api/user', auth)
app.use('/api/courses', passport.authenticate('jwt', { session: false }), course) // need JWT to authorize

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))
}

app.listen(port, () => console.log(`backend server is listening on PORT ${port}...`))
