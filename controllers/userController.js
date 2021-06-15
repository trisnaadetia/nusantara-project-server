const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static register(req, res, next) {
        const { full_name, username, email, password } = req.body

        User.create({
            full_name,
            username,
            email,
            password
        })
        .then((user) => {
            res.status(201).json({
                id: user.id,
                full_name: user.full_name,
                username: user.username,
                email: user.email,
                role: user.role
            })
        })
        .catch((error) => {
            next(error)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        if (email === '' && password === '') {
            next({ name: 'email and password must be required' })
        } else {
            User.findOne({
                where: { email }
            })
            .then((result) => {
                if(!result) {
                    next({ name: 'invalid password or email' })
                } else {
                    const isPasswordMatch = comparePassword(password, result.password)
    
                    if(!isPasswordMatch) {
                        next({ name: 'invalid password' })
                    } else {
                        const token = generateToken({
                            id: result.id,
                            username: result.username,
                            email: result.email
                        })
                        res.status(200).json({ 
                            id: result.id, 
                            email: result.email, 
                            access_token: token
                        })
                    }
                }
            })
            .catch((error) => {
                next(error)
            })
        }
    }
}

module.exports = UserController