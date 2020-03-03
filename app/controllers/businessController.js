const Business = require('../models/Business')

// for users to see businesses they're in
module.exports.list = (req, res) => {
    const businesses = req.businesses
    console.log(businesses)
    res.send(businesses)
}

// only team members can see business info, might change to admin only not sure yet
module.exports.show = (req, res) => {
    const id = req.params.id
    const businesses = req.businesses
    if (businesses.find(business => business._id == id)) {
        Business.findById(id)
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

// any valid user can create
module.exports.create = (req, res) => {
    const body = req.body
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