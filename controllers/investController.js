const { Invest, User, Busines } = require('../models')
// const { verifyToken } = require('../helpers/jwt')

class InvestController{
    static getInvests (req, res, next) {
        Invest.findAll({
            include: [ User, Busines ]
        })
        .then(invest => {
            res.status(200).json(invest)
        })
        .catch(error => {
            next(error)
        })
    }

}

module.exports = InvestController