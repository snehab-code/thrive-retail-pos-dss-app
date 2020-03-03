const Creditor = require('../models/MiscCreditor')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Creditor.find({business: businessId})
        .then(creditors => {
            res.send(creditors)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.creditorId
    Creditor.findById(id)
        .then(creditor => {
            if (creditor) res.send(creditor)
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
        const creditor = new Creditor(body)
        creditor.save()
            .then(creditor => {
                res.send(creditor)
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
        const id = req.params.creditorId
        Creditor.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(creditor => {
                res.send(creditor)
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
        const id = req.params.creditorId
        Creditor.findByIdAndDelete(id)
            .then(creditor => {
                res.send(creditor)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}