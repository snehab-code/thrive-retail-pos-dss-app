const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: () => {
                return 'Invalid format for email'
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    tokens: [{
        token: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }]
})

userSchema.pre('save', function(next) {
    const user = this
    if (user.isNew) {
        bcrypt.genSalt(10)
            .then(salt => {
                bcrypt.hash(user.password, salt)
                .then(encryptedPassword => {
                    user.password = encryptedPassword
                    next()
                })
                .catch(err => {
                    Promise.reject(err)
                })
            })
    } else {
        next()
    }
})

userSchema.statics.findByCredentials = function(search) {
    const User = this
    return User.findOne(search.username ? {username: search.username} : {email: search.email})
        .then(user => {
            if (!user) {
                return Promise.reject({notice: 'invalid email/password'})
            } else {
                return bcrypt.compare(search.password, user.password)
                    .then(result => {
                        if (result) {
                            return Promise.resolve(user)
                        } else {
                            return Promise.reject({notice: 'invalid email/password'})
                        }
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function(token) {
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({_id: tokenData._id, 'tokens.token': token})
}

userSchema.methods.generateToken = function() {
    const user = this
    const tokenData = {
        _id: user._id,
        username: user.username,
        role: user.role
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET)
    user.tokens.push({token})

    return user.save()
        .then(userWithToken => {
            return Promise.resolve(token)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const User = mongoose.model('User', userSchema)

module.exports = User