const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commoditySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    brand: {
        type: String,
    },
    category: {
        type: String
    },
    gstRate: {
        type: Number
    },
    reorderPoint: {
        type: Number
        // number OF UNITS!
    }
})

const Commodity = mongoose.model('Commodity', commoditySchema)

module.exports = Commodity