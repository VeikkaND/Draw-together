const express = require("express")
const { createServer } = require("http")

const app = express()
const server = createServer(app)

const port = 3000

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})