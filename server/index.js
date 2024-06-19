const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

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

    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`)
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})