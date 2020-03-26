const Business = require('../models/Business')
const User = require('../models/User')

// for users to see businesses they're in
module.exports.list = (req, res) => {
    const businesses = req.businesses
    res.send(businesses)
}

module.exports.show = (req, res) => {
    const id = req.params.id
    const businesses = req.businesses
    if (businesses.find(business => business._id == id)) {
        Business.findById(id).populate('members.user', 'username email')
        .then(business => {
            if (business) {
                res.send(business)
            } else {
                res.send({notice: 'not found'})
            }  
        })
        .catch(err => {
            res.send(err)
        })
    } else {
        res.sendStatus('401')
    }
}

// aggregation test - not currently using
module.exports.listInfo = (req, res) => {
    const businessId = req.params.id
    const businesses = req.businesses
    if (businesses.find(business => business._id == businessId)) {
        const mongoose = require('mongoose')
        Business.aggregate([
            {
                $project: {name: 1, address: 1}
            },
            {
                $match: {_id: mongoose.Types.ObjectId(businessId)}
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'clients'
                }
            },
            {
                $lookup: {
                    from: 'payables',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'payables'
                }
            },
            {
                $lookup: {
                    from: 'payables',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'payables'
                }
            }
        ])
        // .unwind('clients')
        // .replaceRoot('clients')
        .exec(function(err, info) {
            if (err) res.send(err)
            else res.send(info)
        })
    } else {
        res.send('umm')
    }
}

// any valid user can create
module.exports.create = (req, res) => {
    const body = req.body
    body.owner = req.user._id
    const business = new Business(body)
    business.save()
        .then(business => {
            res.send(business)
        })
        .catch(err => {
            res.send(err)
        })
}

// require admin or update perm to update
// at end of testing - reminder to disallow updating business members/team/invites via this route. Seperate dedicated routes for that.
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    const find = req.businesses.find(business => business._id == id)
    if (find && find.permissions.includes('update') || find.permissions.includes('admin')) {
        Business.findByIdAndUpdate(id, body, {new: true, runValidators: true})
            .then(business => {
                res.send(business)
            })
            .catch(err => {
                res.send(err)
            })
    } else {
        res.send({notice: "something went wrong while updating the business"})
    }
}

// only owners can delete businesses
module.exports.destroy = (req, res) => {
    const id = req.params.id
    const user = req.user._id
    Business.findOneAndDelete({_id: id, owner: user})
        .then(business => {
            if(business) res.send(business)
            else res.send('Not found among businesses you own')
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.createInvite = (req, res) => {
    const id = req.params.id
    const user = req.user._id
    const find = req.businesses.find(business => business._id == id)
    if (find && find.permissions.includes('update') || find.permissions.includes('admin')) {
        User.findOne({email: req.body.user})
        .then(invitedUser => {
            if (invitedUser) {
            const body = {
                user: invitedUser._id,
                addedBy: user,
            }
            Business.findById(id)
                .then(business => {
                    return business.createInvite(body)
                })
                .then(business => {
                    res.send(business)
                })
                .catch(err => {
                    res.send(err)
                })
            } else {
                res.send({notice: 'no such user'})
            }
        })
        .catch(err => {
            res.send(err)
        })
    } else {
        res.sendStatus('401')
    }
}

module.exports.viewInvite = (req, res) => {
    const id = req.params.id
    const user = req.user._id
    Business.findOne({_id:id, teamInvitations: user})
        .then(business => {
            if (business) {
                res.send(business)
            } else {
                res.send({notice: 'You have not been invited to join this team'})
            }
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.join = (req, res) => {
    const id = req.params.id
    const user = req.user._id
    const body = req.body
    Business.findOne({_id:id, 'teamInvitations.user': user, 'teamInvitations.status': 'pending'})
        .then(business => {
            if (business) {
                return business.addMember(user, body)
            } else {
                res.send({notice: 'You have not been invited to join this team'})
            }
        })
        .then(business => {
            User.findByIdAndUpdate(user, {$pull: {invitedTo: business._id}})
            .then(user => {
                if (!business.notice) res.send({_id: business._id, name: business.name, address: business.address, phone: business.phone})
                else res.send({notice: business.notice})
            })
            .catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send(err)
        })
}