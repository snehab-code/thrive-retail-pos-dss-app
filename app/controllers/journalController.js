const Journal = require('../models/Journal')

module.exports.list = (req, res) => {
    const businessId = req.business._id
    Journal.find({business: businessId})
        .then(journalEntries => {
            res.send(journalEntries)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.journalId
    Journal.findById(id)
        .then(journal => {
            if (journal) res.send(journal)
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
        const journal = new Journal(body)
        journal.save()
            .then(journal => {
                res.send(journal)
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
        const id = req.params.journalId
        Journal.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(journal => {
                res.send(journal)
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
        const id = req.params.journalId
        Journal.findByIdAndDelete(id)
            .then(journal => {
                res.send(journal)
            }) 
            .catch(err => {
                res.send(err)
            })
    } else {
        res.sendStatus('401')
    }
}