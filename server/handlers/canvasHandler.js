module.exports = (io, socket) => {
    const startDraw = ({room, x, y}) => {
        console.log("startDraw")
        socket.to(room).emit("startDraw", {x: x, y: y})
    }

    const draw = ({room, x, y}) => {
        console.log("draw " + room)
        console.log(`x: ${x} + y: ${y}`)
        socket.to(room).emit("draw", {x: x, y: y})
    }

    socket.on("canvas:startdraw", startDraw)
    socket.on("canvas:draw", draw)
}