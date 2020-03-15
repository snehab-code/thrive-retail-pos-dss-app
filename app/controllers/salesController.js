const Sale = require('../models/Sale')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Sale.find({business: businessId}).populate('commodities.product', 'name').populate('party', 'name')
        .then(sales => {
            res.send(sales)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.saleId
    Sale.findById(id)
        .then(sale => {
            if (sale) res.send(sale)
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
        const sale = new Sale(body)
        sale.save()
            .then(sale => {
                res.send(sale)
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
        const id = req.params.saleId
        Sale.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(sale => {
                res.send(sale)
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
        const id = req.params.saleId
        Sale.findByIdAndDelete(id)
            .then(sale => {
                res.send(sale)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}