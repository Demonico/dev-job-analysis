const axios = require('axios')
const cheerio = require('cheerio')
// const fs = require('fs')
const mongoose = require('mongoose')

// Connect to the Mongo DB
mongoose.connect(
  'mongodb://localhost/devjobs',
  { useNewUrlParser: true }
)

// Require all models
const db = require('./models')

const scraper = {
  // Scrape Job List Page
  wwrDevJobList(url) {
    axios
      .get(url)
      .then(res => {
        // console.log(res.data)
        const $ = cheerio.load(res.data)
        $('article>ul>li>a').each(function(i, elem) {
          let link = $(elem).attr('href')
          console.dir(link)
        })
      })
      .catch(err => console.log(err))
  }

  // Scrape Job Description Page
  // ###################################
  // Grab:
  // -- Title
  // -- Company Name
  // -- HQ (if available)
  // -- Description (keep html for now)
  // -- How to apply
  // ###################################
  // add to job model
}

module.exports = scraper

// scrapeRSS('https://weworkremotely.com/categories/remote-programming-jobs.rss')
// scraper.wwrDevJobList('https://weworkremotely.com/categories/remote-programming-jobs')
