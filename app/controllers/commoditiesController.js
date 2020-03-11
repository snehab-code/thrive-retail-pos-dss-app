const Commodity = require('../models/Commodity')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Commodity.find({business: businessId})
        .then(commodities => {
            res.send(commodities)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.commodityId
    Commodity.findById(id)
        .then(commodity => {
            if (commodity) res.send(commodity)
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
        const commodity = new Commodity(body)
        commodity.save()
            .then(commodity => {
                res.send(commodity)
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
        const id = req.params.commodityId
        Commodity.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(commodity => {
                res.send(commodity)
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
        const id = req.params.commodityId
        Commodity.findByIdAndDelete(id)
            .then(commodity => {
                res.send(commodity)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}