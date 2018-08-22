const bodyParser = require("body-parser");
const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 5000

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Static folder
app.use(express.static(path.join(__dirname,'/client/public')))

// Add Routes
app.get('/', (req, res) => {
  res.sendFile("../client/public/index.html")
})

app.listen(port, function () {
  console.log(`Server is running on Port ${port}.`);
})