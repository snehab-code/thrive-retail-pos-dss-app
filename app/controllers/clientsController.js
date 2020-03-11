const Client = require('../models/Client')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Client.find({business: businessId})
        .then(clients => {
            res.send(clients)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.clientId
    Client.findById(id)
        .then(client => {
            if (client) res.send(client)
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
        const client = new Client(body)
        client.save()
            .then(client => {
                res.send(client)
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
        const id = req.params.clientId
        Client.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(client => {
                res.send(client)
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
        const id = req.params.clientId
        Client.findByIdAndDelete(id)
            .then(client => {
                res.send(client)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}