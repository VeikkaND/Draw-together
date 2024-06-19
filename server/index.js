const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const roomHandlers = require("./handlers/roomHandler")
const canvasHandlers = require("./handlers/canvasHandler")

const port = 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`)
    roomHandlers(io, socket)
    canvasHandlers(io, socket)

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})