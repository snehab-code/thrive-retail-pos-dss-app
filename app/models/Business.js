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
            enum: ["view", "update", "create", "reports", "admin"]
        },
        addedBy: {
            type: Schema.Types.ObjectId
        } 
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
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
                permissions: ["admin"],
                addedBy: business.owner
            }, ...members
        ]
        next()
    }   else {
        next()
    }
})

const Business = mongoose.model('Business', businessSchema)

module.exports = Business