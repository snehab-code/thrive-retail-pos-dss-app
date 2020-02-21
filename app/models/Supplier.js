const mongoose = require('mongoose')
const Schema = mongoose.Schema

const supplierSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
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
    }
})

const Supplier = mongoose.model('Supplier', supplierSchema)

module.exports = Supplier