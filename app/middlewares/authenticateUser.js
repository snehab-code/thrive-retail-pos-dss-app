const User = require('../models/User')

const authenticateUser = (req, res, next) => {
    const token = req.header('x-auth')
    User.findByToken(token)
        .then(user => {
            if(user) {
                req.user = user
                req.token = token
                next()
            } else {
                res.status('401').send({notice: 'token is invalid'})
            }
        })
        .catch(err => {
            res.status('401').send(err)
        })
}

const authoriseUser = (req, res, next) => {
    if (req.user.role == 'admin') {
        next()
    } else {
        res.status('403').send({notice: 'you are not authorised'})
    }
}

module.exports = {
    authenticateUser,
    authoriseUser
}