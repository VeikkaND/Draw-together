module.exports = (io, socket) => {
    const message = ({room, name, text}) => {
        io.to(room).emit("message", ({name: name, text: text}))
    }

    socket.on("chat:message", message)
}