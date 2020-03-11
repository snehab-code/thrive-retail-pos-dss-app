const Payable = require('../models/Payable')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Payable.find({business: businessId}).populate('payableTo', 'name creditorCode')
        .then(payables => {
            res.send(payables)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.payableId
    Payable.findById(id).populate('payableTo', 'name creditorCode')
        .then(payable => {
            if (payable) res.send(payable)
            else res.send({notice: "not found"})
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.create = (req, res) => {
    if (req.business.permissions.includes('admin') || req.business.permissions.includes('create')) {
        const body = req.body
        body.user = req.user._id
        body.business = req.business._id
        const payable = new Payable(body)
        payable.save()
            .then(payable => {
                res.send(payable)
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
        const id = req.params.payableId
        Payable.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(payable => {
                res.send(payable)
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
        const id = req.params.payableId
        Payable.findByIdAndDelete(id)
            .then(payable => {
                res.send(payable)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}