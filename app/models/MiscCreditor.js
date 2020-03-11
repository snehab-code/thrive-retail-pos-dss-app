const mongoose = require('mongoose')
const validator = require('validator')
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
        type: String
    },
    remarks: {
        type: String,
        required: true
    },
    email: {
        type: String,
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
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const MiscCreditor = mongoose.model('MiscCreditor', miscCreditorSchema)

module.exports = MiscCreditor