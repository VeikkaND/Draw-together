module.exports = (io, socket) => {
    const message = ({room, name, text, time}) => {
        io.to(room).emit("message", 
            ({name: name, text: text, time}))
    }

    socket.on("chat:message", message)
}