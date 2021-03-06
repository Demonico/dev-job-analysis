// Controller for our scraper
// ============================
var db = require('../models')
var scrape = require('../scraper')

module.exports = {
  getjobs: function(req, res) {
    // scrape the SO
    return scrape.soJobs('https://stackoverflow.com/jobs/feed?r=true')
      .then(function(jobs) {
        // then insert jobs into the db
        return db.Job.create(jobs)
      })
      .then(function(dbJobs) {
        if (dbJobs.length === 0) {
          res.json({
            message: 'No new jobs today. Check back tomorrow!'
          })
        }
        else {
          // Otherwise send back a count of how many new jobs we got
          res.json({
            message: 'Added ' + dbJobs.length + ' new Jobs!'
          })
        }
      })
      .catch(function(err) {
        // This query won't insert jobs with duplicate headlines, but it will error after inserting the others
        if(err){
          console.log(err)
        } else res.json({
          message: 'Scrape complete!!'
        })

      })
  }
}
