const Transaction = require('../models/Transaction')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Transaction.find({business: businessId})
        .then(transactions => {
            res.send(transactions)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.transactionId
    Transaction.findById(id)
        .then(transaction => {
            if (transaction) res.send(transaction)
            else res.send({notice: "not found"})
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    if (req.business.permissions.includes('admin') || req.business.permissions.includes('create')) {
        const body = req.body
        body.business = req.business._id
        const transaction = new Transaction(body)
        transaction.save()
            .then(transaction => {
                res.send(transaction)
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}

module.exports.update = (req, res) => {
    if (req.business.permissions.includes('admin') || req.business.permissions.includes('update')) {
        const body = req.body
        const id = req.params.transactionId
        Transaction.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(transaction => {
                res.send(transaction)
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}

module.exports.destroy = (req, res) => {
    if (req.business.permissions.includes('admin') || req.business.permissions.includes('destroy')) {
        const id = req.params.transactionId
        Transaction.findByIdAndDelete(id)
            .then(transaction => {
                res.send(transaction)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}