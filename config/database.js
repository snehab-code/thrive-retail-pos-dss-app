const mongoose = require('mongoose')

const CONNECTION_URI = process.env.MONGO_CONNECTION

const setupDB = () => {
    mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('connected to db')
        })
        .catch(err => {
            console.log('db connection error', err)
        })
}

module.exports = setupDB