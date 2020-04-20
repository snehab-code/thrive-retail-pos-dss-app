const Purchase = require('../models/Purchase')
const Order = require('../models/Order')
const Supplier = require('../models/Supplier')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Purchase.find({business: businessId}).populate('commodities.product', 'name').populate('supplier', 'name supplierCode').populate('order', 'orderNumber')
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
        // recalculate amount in case of submission error
        body.amount = body.commodities.length > 1 ? body.commodities.reduce((acc, cv) => acc.rate*acc.quantity + cv.rate*cv.quantity) : body.commodities[0].rate*body.commodities[0].quantity
        // assign user and business
        body.user = req.user._id
        body.business = req.business._id
        // if body.order included: 
        if (body.order) {
            Order.findById(body.order)
            .then(order => {
                if (body.supplier !== String(order.supplier)) {
                    res.send({error: 'Supplier mismatch'})
                } else {
                    return Purchase.findUnrecordedProducts(order)
                }
            })
            .then(unrecordedProducts => {
                for (let i=0; i<body.commodities.length; i++) {
                    const find = unrecordedProducts.find(unrecProduct => body.commodities[i].product === unrecProduct.product)
                    if (find) {
                        if (find.quantity < body.commodities[i].quantity && body.documentType!== 'Credit Note') {
                            return Promise.reject({error: 'To account for excess material received, create a Credit Note'})
                        }
                    } else {
                        return Promise.reject({error: 'Some of these products have already been delivered'})
                    }
                }
                return body
            })
            .then(body => {
                Supplier.findById(body.supplier)
                .then(supplier => {
                    if (body.supplierInvoice.indexOf(supplier.supplierCode) !== 0) {
                        body.supplierInvoice = supplier.supplierCode + body.supplierInvoice
                    }
                    return body
                })
                .then(body => {
                    const purchase = new Purchase(body)
                    purchase.save()
                    .then(purchase => {
                        res.send(purchase)
                    })
                    .catch(err => {
                        res.send(err)
                    })
                })
                .catch(err => {
                    res.send(err)
                })
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            Supplier.findById(body.supplier)
            .then(supplier => {
                if (supplier) {
                    if (body.supplierInvoice.indexOf(supplier.supplierCode) !== 0) {
                        body.supplierInvoice = supplier.supplierCode + body.supplierInvoice
                    }
                    return body
                }
                else {
                    return Promise.reject({error: 'Supplier does not exist'})
                }
            })
            .then(body => {
                const purchase = new Purchase(body)
                return purchase.save()
            })
            .then(purchase => {
                console.log('not err')
                res.send(purchase)
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
        }
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