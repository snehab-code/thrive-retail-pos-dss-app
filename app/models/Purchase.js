const mongoose = require('mongoose')
const Schema = mongoose.Schema

// might refactor so invoice numbers can be unique... which they're not right now
const purchaseSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    transactionDate: {
        type: Date,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    supplierInvoice: {
        type: String,
        required: true,
        unique: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    documentType: {
        type: String,
        required: true,
        enum: ['GRN', 'MRN', 'Debit Note', 'Warranty', 'Credit Note']
    },
        // GRN - for full order goods received, MRN for wrong receipts/returns, Debit note for short receipts, Warranty for failed items returned to seller on warranty, Credit note for excess received not returned to seller, 
    documentNumber: {
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
    creditPeriodDays: {
        type: Number,
        default: 0
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

purchaseSchema.statics.findUnrecordedProducts = function(order) {
    const Purchase = this
    return Purchase.find({order: order._id}, 'commodities')
        .then(purchases => {
            
            let unrecordedProducts = order.commodities.map(commodity => {
                return {
                    product: String(commodity.product), 
                    quantity: commodity.quantity
                }
            })

            purchases.forEach(purchase => {
                purchase.commodities.forEach(commodity => {
                    const find = unrecordedProducts.find(unrecProduct => {
                        return String(commodity.product) === unrecProduct.product
                    })

                    if(find) {
                        find.quantity -= commodity.quantity
                    }
                })
            })


            return Promise.resolve(unrecordedProducts)
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase