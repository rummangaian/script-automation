const handleSignal = (socket , io , data) => {
    console.log("signal data " , data);
    socket.broadcast.emit('signal' , data);
}

module.exports = {handleSignal};