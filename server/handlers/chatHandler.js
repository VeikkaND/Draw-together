module.exports = (io, socket) => {
    const message = ({room, id, text}) => {
        io.to(room).emit("message", ({id: id, text: text}))
    }

    socket.on("chat:message", message)
}