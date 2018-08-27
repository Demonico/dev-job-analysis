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
    return axios
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
    return axios
      .get(url)
      .then(res => {
        let job = {}
        const $ = cheerio.load(res.data)
        let header = $('.listing-header-container')
        // -- Title
        job.title = header.children('h1').text()
        // -- Company Name
        job.company = header
          .children('h2')
          .children('.company')
          .text()
        // -- HQ (if available)
        job.hq = header
          .children('h2')
          .children('.location')
          .text()

        let desc = $('.listing-container')
        job.description = desc.html()

        let apply = $('.apply>p')
        job.apply = apply.html()

        // connect to Mongo
      })
      .catch(err => console.log(err))
  },

  soJobs(url) {
    return axios
      .get(url)
      .then(res => {
        // console.log(res.data)
        let $ = cheerio.load(res.data, { xmlMode: true })
        let jobs = []

        $('item').each(function(i, elem) {
          let dataToAdd = {
            categories: []
          }
          dataToAdd.title = $(elem)
            .children('title')
            .text()
            .trim()
          dataToAdd.description = $(elem)
            .children('description')
            .text()
            .trim()
          dataToAdd.guid = $(elem)
            .children('guid')
            .text()
            .trim()
          dataToAdd.link = $(elem)
            .children('link')
            .text()
            .trim()
          dataToAdd.pubDate = $(elem)
            .children('pubDate')
            .text()
            .trim()
          dataToAdd.company = $(elem)
            .find('a10\\:name')
            .text()
          // dataToAdd.categories = $(elem).children('category')
          $(elem)
            .children('category')
            .each(function(j, catElem) {
              dataToAdd.categories.push($(catElem).text())
            })

          // console.log(dataToAdd)    
          jobs.push(dataToAdd)    
        })
        return jobs
      })
      .catch(err => console.log(err))
  }

  // ###################################
  // add to job model
}

// scraper.soJobs('https://stackoverflow.com/jobs/feed?r=true')
// scraper.wwrJobPage(
//   'https://weworkremotely.com/remote-jobs/pixelcabin-junior-front-end-developer-1'
// )
module.exports = scraper

// scrapeRSS('https://weworkremotely.com/categories/remote-programming-jobs.rss')
// scraper.wwrDevJobList('https://weworkremotely.com/categories/remote-programming-jobs')
