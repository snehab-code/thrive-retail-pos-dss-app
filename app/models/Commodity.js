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
        // make this an array of strings, so there can be multiple types. Maybe you sell a box, maybe you sell a piece. Also, shouldn't rate be here? You don't want to set a selling price each time you make an entry. That should come in automagically
        // but maybe you don't sell at mrp or the rate here hmm =/ maybe the rates go up... too
        type: String,
        required: true
    },
    sellingPrice: {
        type: String,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
})

const Commodity = mongoose.model('Commodity', commoditySchema)

module.exports = Commodity