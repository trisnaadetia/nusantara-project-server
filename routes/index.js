const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const UserController = require('../controllers/userController')
const BusinesController = require('../controllers/businesController')
const investRoute = require('./investRoute')
const businesRoute = require('./businesRoute.js')
const PaymentController = require('../controllers/paymentController')
const { Category, User } = require('../models')
const LocationController = require('../controllers/locationController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/business', BusinesController.getBusines)
router.get('/business/:id', BusinesController.getBusinesById)

router.use('/business', authentication, businesRoute)

router.get('/categories', (req, res, next) => {
    Category.findAll()
    .then(category => {
        res.status(200).json(category)
    })
    .catch(error => {
        next(error)
    })
})

router.get('/users', (req, res, next) => {
    User.findAll()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        next(error)
    })
})

router.post('/locations', LocationController.getLocation)

router.use('/invests', investRoute)

router.post('/payments', authentication, PaymentController.payment)
router.post('/payments/notification', PaymentController.notification)

module.exports = router