const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const PORT = 8080

mongoose
  .connect('mongodb://localhost:27017/mernDB')
  .then(() => {
    console.log('connect to mongodb successfully!')
  })
  .catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`backend server is listening on PORT ${PORT}...`))