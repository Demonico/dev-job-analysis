const mongoose = require('mongoose')

// ref the Schema constructor
const Schema = mongoose.Schema

const JobSchema = new Schema({
  title: { type: String },
  description: { type: String },
  guid: { type: String },
  link: { type: String },
  pubDate: { type: String }
})

const Job = mongoose.model('Job', JobSchema)

module.exports = Job
