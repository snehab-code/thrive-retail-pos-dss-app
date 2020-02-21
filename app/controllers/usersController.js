const User = require('../models/User')
const _ = require('lodash')

module.exports.register = (req, res) => {
    const body = req.body
    const user = new User(body) 
    user.save() 
        .then(user => {
            res.send(_.pick(user, ['_id', 'username', 'email']))
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    const search = {
        email: body.email,
        username: body.username,
        password: body.password
    }

    User.findByCredentials(search)
        .then(user => {
            return user.generateToken()
        })
        .then(token => {
            // res.setHeader('x-auth', token).send({})
            res.send(token)
        })
        .catch(err => {
            res.send(err)
        })

}

module.exports.checkLoginStatus = (req, res) => {
    if (req.user) res.send({notice: 'valid user'})
}


module.exports.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token:token}}})
        .then(() => {
            res.send({notice: 'successfully logged out'})
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.logoutAll = (req, res) => {
    const {user, token} = req 
    User.findByIdAndUpdate(user._id, { $set: {tokens: []}}, {new: true})
        .then(user => {
            res.send({notice: 'succesfully logged out of all devices'})
        })
}