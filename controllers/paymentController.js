const payment = require('../helpers/payment')
const { Invest, Busines } = require('../models')
const { verifyToken } = require('../helpers/jwt')
const moment = require('moment')

class PaymentController{
    static async payment(req, res, next) {
        try {
            const { BusinesId, total_invest } = req.body
            const { access_token } = req.headers
            const decoded = verifyToken(access_token)

            const order_id = 'invest-no-' + moment(new Date()).format("X")
            let parameter = {
                "transaction_details": {
                    "order_id": order_id,
                    "gross_amount": +total_invest
                }, "credit_card":{
                    "secure" : true
                }
            }

            const findBusines = await Busines.findByPk(BusinesId)
            if (findBusines) {
                if (findBusines.total_saham_update >= total_invest) {
                    await Invest.create({
                        BusinesId,
                        total_invest,
                        order_id,
                        UserId: decoded.id,
                    })
                    const result = await payment.create(parameter)
                    res.status(200).json({
                        result
                    })
                } else {
                    next({ name: 'your invest bigger then available stock' })
                }
            } else {
                next({ name: 'error not found' })
            }
            
            
        } catch (error) {
            next(error)
        }
    }

    static async notification(req, res, next) {
        const { transaction_status, order_id} = req.body
        if (transaction_status === 'settlement') {
            try {
                const updateInvest = await Invest.update({
                    status: 'settlement'
                },{
                    where: { order_id },
                    returning: true
                })
                
                const BusinesId = updateInvest[1][0].dataValues.BusinesId
                const total_invest = updateInvest[1][0].dataValues.total_invest

                const findBusines = await Busines.findByPk(BusinesId)
                await Busines.update({
                    total_saham_update: findBusines.total_saham_update - total_invest
                },{ where: { id: BusinesId }})

            } catch (error) {
                next(error)
            }
        }
    }
}

module.exports = PaymentController