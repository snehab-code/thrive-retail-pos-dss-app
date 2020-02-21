const server = require('./server')
const socket = require('socket.io')

const io = socket(server)

io.on('connection', socket => {
    console.log(socket.id, socket.handshake.headers.referer)
    socket.emit('message', 'Hello! You are now connected via websocket')
})

module.exports = io