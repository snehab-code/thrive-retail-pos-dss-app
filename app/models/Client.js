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
    },
    clientCode: {
        type: String,
        maxlength: 6,
        required: true,
        unique: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client