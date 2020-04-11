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

module.exports.createPurchase = (req, res) => {
    if (req.business.permissions.includes('admin') || req.business.permissions.includes('create') || req.business.permissions.includes('update')) {
        // get data -> 
        /*
        Purchase needs:
        {
            commodities: [{
                product: {},
                quantity: {},
                rate: {},
                cgst/sgst/igst
            }{same}],////
            orderNo/Id if linking to order /////
            supplier ////
            supplierInvoice, invoiceDate, transactionDate,
            document type, number, date
            creditPeriodDays
            amount, remark, user, business///
        }
        Order has: {
            commodities,
            supplier,
            orderId/number,
            can calc amount, autogen remark, user, business
        }
        Need in body: {
            supplier Invoice, invoice date, transaction Date, document type/number/date
            creditPeriod
        }
        */
        const id = req.params.orderId
        const products = req.params.body
        Order.findById(id)
            .then(order => {

            })
    }
}