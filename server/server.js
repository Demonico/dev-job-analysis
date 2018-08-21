const express = require('express')

const app = express()

const port = process.env.PORT || 5000

// Define middleware here
app.use(express.bodyParser.urlencoded({ extended: true }));
app.use(express.bodyParser.json());

// Add Routes

app.listen(port, function () {
  console.log(`Server is running on Port ${port}.`);
})