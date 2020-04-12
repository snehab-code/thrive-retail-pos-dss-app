const Order = require('../models/Order')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Order.find({business: businessId}).populate('commodities.product', 'name').populate('supplier', 'name')
        .then(orders => {
            res.send(orders)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
        .then(order => {
            if (order) res.send(order)
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
        const order = new Order(body)
        order.save()
            .then(order => {
                res.send(order)
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
        const id = req.params.orderId
        Order.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(order => {
                res.send(order)
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
        const id = req.params.orderId
        Order.findByIdAndDelete(id)
            .then(order => {
                res.send(order)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}