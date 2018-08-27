const mongoose = require('mongoose')

// ref the Schema constructor
const Schema = mongoose.Schema

const JobListSchema = new Schema({
  link: String
})

const JobList = mongoose.model('JobList', JobListSchema)

module.exports = JobList
