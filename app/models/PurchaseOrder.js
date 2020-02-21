const mongoose = require('mongoose')
const Schema = mongoose.Schema

const purchaseOrderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionDate: {
        type: Date,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        required: true
    },
    poNumber: {
        type: String,
        required: true,
        unique: true
    },
    commodity: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }, 
    rate: {
        type: Number,
        required: true
    }, 
    unit: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending Delivery', 'Delivered', 'Completed'],
        default: 'Pending Delivery'
    }
})

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema)

module.exports = PurchaseOrder