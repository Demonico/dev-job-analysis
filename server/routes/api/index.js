const router = require('express').Router()
const jobRoutes = require('./jobs')

// NYT routes
router.use('/jobs', jobRoutes)

module.exports = router
