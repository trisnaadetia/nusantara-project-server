const { Busines } = require('../models')

function authorize(req, res, next) {
    const id = +req.params.id
    Busines.findByPk(id)
    .then((result) => {
        if(result) {
            if(result.UserId === req.loggedUser.id){
                next()
            } else {
                next({ name: 'unauthorized' })
            }
        } else {
            next({ name: 'error not found' })
        }
    })
    .catch((error) => {
        next(error)
    })
}

module.exports = authorize