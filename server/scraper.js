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
// const db = require('./models')

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
  },

  // Scrape Job Description Page
  wwrJobPage(url) {
    // Grab:

    // -- Description (keep html for now)
    // -- How to apply
    axios
      .get(url)
      .then(res => {
        let job = {}
        const $ = cheerio.load(res.data)
        let header = $('.listing-header-container')
        // -- Title
        job.title = header.children('h1').text()
        // -- Company Name
        job.company =  header.children('h2').children('.company').text()
        // -- HQ (if available)
        job.hq =  header.children('h2').children('.location').text()

        
        let desc = $('.listing-container')
        job.description = desc.html()

        let apply = $('.apply>p')
        job.apply = apply.html()

        console.log(job)
      })
      .catch(err => console.log(err))
  }

  // ###################################
  // add to job model
}

scraper.wwrJobPage('https://weworkremotely.com/remote-jobs/pixelcabin-junior-front-end-developer-1')
// module.exports = scraper

// scrapeRSS('https://weworkremotely.com/categories/remote-programming-jobs.rss')
// scraper.wwrDevJobList('https://weworkremotely.com/categories/remote-programming-jobs')
