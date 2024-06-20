module.exports = (io, socket) => {
    const startDraw = ({room, id, x, y}) => {
        console.log("startDraw")
        io.to(room).emit("startDraw", {id: id, x: x, y: y})
    }

    const draw = ({room, id, x, y}) => {
        console.log("draw " + room)
        console.log(`x: ${x} + y: ${y}`)
        io.to(room).emit("draw", {id: id, x: x, y: y})
    }

    socket.on("canvas:startdraw", startDraw)
    socket.on("canvas:draw", draw)
}