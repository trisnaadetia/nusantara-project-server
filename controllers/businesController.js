const { Busines, User, Category, Invest } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class businesController{
    static getBusines (req, res, next) {
        Busines.findAll({
            include: [ Category, Invest, User ]
        })
        .then(busines => {
            res.status(200).json(busines)
        })
        .catch(error => {
            next(error)
        })
    }

    static postBusines (req, res, next) {
        const { 
            name, CategoryId, photo_url,
            description, total_saham, deviden, address, deviden_periode 
        } = req.body
        const { access_token } = req.headers
        const decoded = verifyToken(access_token)

        Busines.create({
            name, CategoryId, photo_url,
            description, total_saham: +total_saham, 
            deviden, deviden_periode, address,
            UserId: decoded.id
        })
        .then(() => {
            return User.update({
                role: 'owner'
            }, { where: { id: decoded.id } })
        })
        .then(() => {
            res.status(201).json({ 
                message: 'congratulations your busines success created' 
            })
        })
        .catch(error => {
            next(error)
        })
    }

    static getBusinesById (req, res, next) {
        const id = +req.params.id

        Busines.findByPk(id, { include: [ 'User', 'Category' ] })
        .then(busines => {
            if(!busines) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json(busines)
            }
        })
        .catch(error => {
            next(error)
        })
    }

    static putBusinesById (req, res, next) {
        const id = +req.params.id
        const { 
            name, CategoryId, photo_url,
            description, total_saham, 
            deviden, deviden_periode, address
        } = req.body

        Busines.update({
            name, CategoryId, photo_url,
            description, total_saham,
            deviden, deviden_periode, address
        },{
            where: { id },
            returning: true
        })
        .then(busines => {
            if (busines[0] === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json({ 
                    message: 'congratulations your busines success updated' 
                })
            } 
        })
        .catch(error => {
            next(error)
        })
    }

    static deleteBusinesById (req, res, next) {
        const id = req.params.id

        Busines.destroy({
            where: { id },
            returning: true
        })
        .then(busines => {
            if (busines[0] === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json({ message: 'busines success deleted' })
            }            
        })
        .catch((error) => {
            next(error)
        })
    }
}

module.exports = businesController