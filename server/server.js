const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

const port = process.env.PORT || 5000

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Set Static folder
app.use(express.static(path.join(__dirname,'..', '/client/public')))

// Connect to the Mongo DB
mongoose.connect('mongodb://localhost/devjobs')

// Add Routes
const routes = require('./routes')

// Have every request go through our route middleware
app.use(routes)

app.listen(port, function() {
  console.log(`Server is running on Port ${port}.`)
})
