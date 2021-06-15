const express = require('express')
const router = express.Router()
const investController = require('../controllers/investController')

router.get('/', investController.getInvests)
// router.post('/', investController.postInvest)

module.exports = router