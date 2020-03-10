const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    members: [{
        user: {
            type: Schema.Types.ObjectId
        },
        permissions: {
            type: [String],
            enum: ['view', 'update', 'create', 'reports', 'admin']
        },
        addedBy: {
            type: Schema.Types.ObjectId
        } 
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    teamInvitations: [{
        user: Schema.Types.ObjectId,
        addedBy: Schema.Types.ObjectId,
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected']
        }
    }]
})

// add owner as initial admin
businessSchema.pre('save', function(next) {
    const business = this
    if (business.isNew) {
        const members = business.members.map(member => {
            member._doc.addedBy = business.owner
            return member
        })
        business.members = [
            {
                user: business.owner,
                permissions: ['admin'],
                addedBy: business.owner
            }, ...members
        ]
        next()
    }   else {
        next()
    }
})

businessSchema.methods.addMember = function(user, body) {
    const business = this
    const invite = business.teamInvitations.find(invite => String(invite.user) == user)
    console.log(body.accepted)
    if (body.accepted === 'true') {
        const member = {
            user,
            permissions: ['view'],
            addedBy: invite.addedBy
        }
        invite.status='accepted'
        business.members.push(member)
        return business.save()
            .then(newBusiness => {
                return Promise.resolve(newBusiness)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    } else {
        invite.status = 'rejected'
        return business.save()
            .then(newBusiness => {
                return Promise.reject({notice: 'You have rejected this invitation'})
            })
            .catch(err => {
                return Promise.reject(err)
            })
    }
} 

businessSchema.methods.createInvite = function(body) {
    const business = this
    const checkDuplicate = business.teamInvitations.find(invite => String(invite.user) == body.user)
    if (!checkDuplicate) {
        business.teamInvitations.push(body)
        return business.save()
            .then(businessWithInvite => {
                return Promise.resolve(businessWithInvite)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    } else if(checkDuplicate.status === 'rejected') {
        checkDuplicate.status = 'pending'
        checkDuplicate.addedBy = body.addedBy
        return business.save()
            .then(businessWithInvite => {
                return Promise.resolve(businessWithInvite)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    } else if(checkDuplicate.status === 'pending') {
        return Promise.reject({notice: 'user already invited'})
    } else {
        return Promise.reject({notice: 'User is already a member of your team'})
    }

}

const Business = mongoose.model('Business', businessSchema)

module.exports = Business