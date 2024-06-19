module.exports = (io, socket) => {
    const startDraw = ({room, id, x, y}) => {
        console.log("startDraw")
        io.to(room).emit("startDraw", (id, x, y))
    }

    const draw = ({room, id, x, y}) => {
        console.log("draw " + room)
        io.to(room).emit("draw", (id, x, y))
    }

    socket.on("canvas:startdraw", startDraw)
    socket.on("canvas:draw", draw)
}