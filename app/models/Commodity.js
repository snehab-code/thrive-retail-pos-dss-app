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
        default: 'Unbranded'
    },
    category: {
        type: String,
        default: 'Uncategorised'
    },
    gstRate: {
        type: Number,
        default: 0
    },
    reorderPoint: {
        type: Number
        // number OF UNITS!
    },
    unit: {
        type: String,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Commodity = mongoose.model('Commodity', commoditySchema)

module.exports = Commodity