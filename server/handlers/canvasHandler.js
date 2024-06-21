module.exports = (io, socket) => {
    const startDraw = ({room, id, x, y, color, width}) => {
        io.to(room).emit("startDraw", {id: id, x: x, y: y, 
            color: color, width: width})
    }

    const draw = ({room, id, x, y, color, width}) => {
        io.to(room).emit("draw", {id: id, x: x, y: y, 
            color: color, width: width})
    }

    const clear = (room) => {
        io.to(room).emit("clear")
    }

    socket.on("canvas:startdraw", startDraw)
    socket.on("canvas:draw", draw)
    socket.on("canvas:clear", clear)
}