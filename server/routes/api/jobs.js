var router = require('express').Router()
var jobController = require('../../controllers/job')

router.get('/', jobController.getjobs)

module.exports = router
