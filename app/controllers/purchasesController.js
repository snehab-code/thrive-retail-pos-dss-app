const Purchase = require('../models/Purchase')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Purchase.find({business: businessId}).populate('commodities.product', 'name').populate('party', 'name')
        .then(purchases => {
            res.send(purchases)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.purchaseId
    Purchase.findById(id)
        .then(purchase => {
            if (purchase) res.send(purchase)
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
        const purchase = new Purchase(body)
        purchase.save()
            .then(purchase => {
                res.send(purchase)
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
        const id = req.params.purchaseId
        Purchase.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(purchase => {
                res.send(purchase)
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
        const id = req.params.purchaseId
        Purchase.findByIdAndDelete(id)
            .then(purchase => {
                res.send(purchase)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}