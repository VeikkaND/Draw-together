module.exports = (io, socket) => {
    const id = socket.id
    const createRoom = () => {
        socket.join(id)
        console.log(`creating room ${id}`)
    }

    const joinRoom = (room, callback) => {
        const rooms = io.of("/").adapter.rooms
        if(rooms.has(room)) {
            socket.join(room)
            console.log(`${id} joining room ${room}`)
            callback(true)
        } else {
            console.log(`failed to join room ${room}`)
            callback(false)
        }
    }

    const leaveRoom = (room) => {
        socket.leave(room)
        console.log(`${id} leaving room ${room}`)
    }

    socket.on("room:create", createRoom)
    socket.on("room:join", joinRoom)
    socket.on("room:leave", leaveRoom)
}