// for misc entries - currently discounts given and received
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// CAN automatically calculate discount via selling price minus actual sale rate tho
// entry created via form to add debtors when adding payment due to you or sales
// OOOH - prepaid expenses/assets too
const journalSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionDate: {
        type: Date,
        required: true
    },
    credit: {
        type: String,
        required: true
    },
    debit: {
        type: String,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId
    },
    supplier: {
        type: Schema.Types.ObjectId
    },
    miscCreditor: {
        type: Schema.Types.ObjectId
    },
    invoice: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Journal = mongoose.model('Journal', journalSchema)

module.exports = Journal