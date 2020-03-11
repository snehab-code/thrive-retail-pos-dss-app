const Supplier = require('../models/Supplier')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Supplier.find({business: businessId})
        .then(suppliers => {
            res.send(suppliers)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.supplierId
    Supplier.findById(id)
        .then(supplier => {
            if (supplier) res.send(supplier)
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
        const supplier = new Supplier(body)
        supplier.save()
            .then(supplier => {
                res.send(supplier)
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
        const id = req.params.supplierId
        Supplier.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(supplier => {
                res.send(supplier)
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
        const id = req.params.supplierId
        Supplier.findByIdAndDelete(id)
            .then(supplier => {
                res.send(supplier)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}