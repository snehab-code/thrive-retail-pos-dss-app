const mongoose = require('mongoose')
const Schema = mongoose.Schema

const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // inviteLink: {
        //TTL?  alt tokens that expire - authenticate with business id in token + user ID matches the user for whom it is generated? and pull when used
    // },
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    admins: [{
        type: Schema.Types.ObjectId
    }],
    members: [{
        user: {
            type: Schema.Types.ObjectId
        },
        permissions: {
            type: [String]
        },
        addedBy: {
            type: Schema.Types.ObjectId
        } 
    }]
})

const Business = mongoose.model('Business', businessSchema)

module.exports = Business