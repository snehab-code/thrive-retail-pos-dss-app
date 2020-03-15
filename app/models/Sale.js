const mongoose = require('mongoose')
const Schema = mongoose.Schema

// might refactor so invoice numbers can be unique... which they're not right now
const saleSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    transactionDate: {
        type: Date,
        required: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    commodities: [{
        product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Commodity'
        },
        quantity: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        cgst: {
            type: Number
        }, 
        sgst: {
            type: Number
        }, 
        igst: {
            type: Number
        }
    }],
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    amount: {
        type: Number,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Sale = mongoose.model('Sale', saleSchema)

module.exports = Sale