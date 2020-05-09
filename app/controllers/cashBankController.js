const CashBank = require('../models/CashBank')

module.exports.list = (req, res) => {
    const businessId = req.business._id
 CashBank.find({business: businessId})
        .then(cashBank => {
            res.send(cashBank)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.cashBankId
 CashBank.findById(id)
        .then(cashBank => {
            if (cashBank) res.send(cashBank)
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
        body.user = req.user._id
        const cashBank = new CashBank(body)
        cashBank.save()
            .then(cashBank => {
                res.send(cashBank)
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
        const id = req.params.cashBankId
     CashBank.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(cashBank => {
                res.send(cashBank)
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
        const id = req.params.cashBankId
     CashBank.findByIdAndDelete(id)
            .then(cashBank => {
                res.send(cashBank)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}