const mongoose = require('mongoose')
const Schema = mongoose.Schema

// entry created via form to add debtors when adding payment due to you or sales
const clientSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client