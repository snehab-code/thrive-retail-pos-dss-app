const PurchaseOrder = require('../models/PurchaseOrder')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    PurchaseOrder.find({business: businessId})
        .then(purchaseOrders => {
            res.send(purchaseOrders)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.purchaseOrderId
    PurchaseOrder.findById(id)
        .then(purchaseOrder => {
            if (purchaseOrder) res.send(purchaseOrder)
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
        const purchaseOrder = new PurchaseOrder(body)
        purchaseOrder.save()
            .then(purchaseOrder => {
                res.send(purchaseOrder)
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
        const id = req.params.purchaseOrderId
        PurchaseOrder.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(purchaseOrder => {
                res.send(purchaseOrder)
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
        const id = req.params.purchaseOrderId
        PurchaseOrder.findByIdAndDelete(id)
            .then(purchaseOrder => {
                res.send(purchaseOrder)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}