const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization')
const BusinesController = require('../controllers/businesController')

router.post('/', BusinesController.postBusines)
router.put('/:id', authorization, BusinesController.putBusinesById)
router.delete('/:id', authorization, BusinesController.deleteBusinesById)

module.exports = router