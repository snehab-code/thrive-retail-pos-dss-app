const Purchase = require('../models/Purchase')
const Order = require('../models/Order')

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
                                // do not use res.send here because the rest of the code still runs and there's an unhandled promise rejection each time because it runs into the next res.send
                                // also do not use return res.send, because res.send returns the request object, and your save is still trying to run.
                                return Promise.reject({error: 'To account for excess material received, create a Credit Note'})
                            }
                        } else {
                            return Promise.reject({error: 'Some of these products have already been delivered'})
                        }
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
        } else {
            res.send('testing')
            // const purchase = new Purchase(body)
            // purchase.save()
            //     .then(purchase => {
            //         res.send(purchase)
            //     })
            //     .catch(err => {
            //         res.send(err)
            //     })
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