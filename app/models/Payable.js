const mongoose = require('mongoose')
const Schema = mongoose.Schema

// entry here created when miscellaneous expenses become due. Might be paid immediatey - have a link to include payment details then and there when it's recorded

// examples: 1. Office supplies purchased, 2. Tea, 3. Rent becomes due, 4. Electricity bill received, 5. Phone bill received, 6. Loan payments due

const payableSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    transactionDate: {
        type: Date,
        required: true
    },
    payableTo: {
        type: Schema.Types.ObjectId,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    invoice: {
        type: String,
        required: true,
        unique: true
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
    isPaid: {
        type: Boolean,
        default: false
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const Payable = mongoose.model('Payable', payableSchema)

module.exports = Payable