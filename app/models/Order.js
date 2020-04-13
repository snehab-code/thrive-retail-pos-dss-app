const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
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
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }],
    // change to boolean? isCompleted?
    // #TODO
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

orderSchema.methods.markProductCompletion = function() {
    const order = this
    // if the product is fully delivered/accounted for otherwise and if so - mark the order commodity as completed.
}

const Order = mongoose.model('Order', orderSchema)

module.exports = Order