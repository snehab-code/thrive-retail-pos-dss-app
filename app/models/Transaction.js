// model possibly retired


const mongoose = require('mongoose')
const Schema = mongoose.Schema

// for purchase/sales transactions -
const transactionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionDate: {
        type: Date,
        required: true
    },
    commodity: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Commodity'
    },
    // supplier or client id
    party: {
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
    // GRN - for full order goods received, MRN for wrong receipts/returns, Debit note for short receipts, Warranty for failed items returned to seller on warranty, Credit note for excess received not returned to seller, 
    documentType: {
        type: String,
        required: true
    },
    // document type will probably decide whether it's a debit or a credit transaction
    documentNumber: {
        type: String,
        required: true,
        unique: true
    },
    // PREVALIDATION to make sure that at least one of these is present?
    // debited on: purchase, sales returns, purchase excess received and accepted, 
    debitAmount: {
        type: Number
        // default with logic here?
    },
    // credited on sales, purchase returns, purchase short receipt, warranty replacement
    creditAmount: {
        type: Number
    },
    // BASICALLY - if something increases your inventory - debit this account, if it decreases your inventory - credit it.
    // in case of purchases, supplier invoice number here. Sales we end up entering this twice??
    invoice: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    purchaseOrder: {
        type: Schema.Types.ObjectId
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
    // auto calculated based on rate in the commodity id - in a presave hook probably.
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

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction