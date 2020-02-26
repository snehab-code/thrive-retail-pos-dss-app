const User = require('../models/User')
const Business = require('../models/Business')

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

// becomes authorise admin
const authoriseAdmin = (req, res, next) => {
    const business = req.body.business
    Business.findById(business)
        .then(business => {
            const find = business.admins.find(user => user == req.user._id)
            if (find) {
                next()
            } else {
                res.status('403').send({notice: 'you are not authorised'})
            }
        })
        .catch(err => {
            console.log(err)
        })
    // move to model
}

const authoriseMember = (req, res, next) => {
    const business = req.body.business
    Business.findById(business)
        .then(business => {
            const find = business.members.find(member => member.user == req.user._id)
            if (find) {
                req.permissions = find.permissions
                next()
            } else {
                res.status('403').send({notice: 'you are not authorised'})
            }
        })
        .catch(err => {
            console.log(err)
        })
}

// const checkPermissions = (req, res, next) => {
//     const permissions = req.permissions
    // might have to make another middleware file for permissions, because each will have to be checked seperately based on the api - like for delete - req.permissions.includes - destroy // for update - req.permissions.includes - update
// }

module.exports = {
    authenticateUser,
    authoriseAdmin,
    authoriseMember
}