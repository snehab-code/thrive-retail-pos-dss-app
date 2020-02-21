const mongoose = require('mongoose')
const Schema = mongoose.Schema

const miscCreditorSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    // name or Type - head of account?
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    creditorCode: {
        type: String,
        unique: true,
        required: true,
        maxlength: 6
    }
})

const MiscCreditor = mongoose.model('MiscCreditor', miscCreditorSchema)

module.exports = MiscCreditor