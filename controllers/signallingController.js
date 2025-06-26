const signallingService  = require('../services/signallingService.js')

const handleConnections = (socket , io) => {
    console.log(`User Connected  , ${socket.id}`);

    socket.io('signal' , (data)=> {
        signallingService.handleSignal(socket , ui , data)
    })

    socket.on('disconnect' , ()=> {
        console.log(`User disconnected: ${socket.id}`)
    })
}

module.exports = {handleConnections};