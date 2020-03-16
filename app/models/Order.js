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
        ref: 'Supplier',
        required: true
    },
    orderNumber: {
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
    status: {
        type: String,
        enum: ['Pending Delivery', 'Delivered', 'Completed'],
        default: 'Pending Delivery'
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

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema)

module.exports = PurchaseOrder