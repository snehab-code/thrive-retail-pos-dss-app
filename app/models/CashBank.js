const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cashBankSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionDate: {
        type: Date,
        required: true
    },
    // Cash dr to, ie. RECEIVED FROM - cash sales, customers on credit etc
    debitFrom: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // cash/back cr to, i.e. PAID TO - supplier or misc Creditor
    creditTo: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // the TRANSACTION or PAYABLE id to which this particular entry is linked
    transactionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // if debitFrom - increases balance, if creditTo - decreases balance
    amount: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        enum: ['Cash', 'Bank'],
        required: true
    },    
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const CashBank = mongoose.model('CashBank', cashBankSchema)

module.exports = CashBank