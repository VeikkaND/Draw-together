import React, { useContext, useState } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"


function Canvas() {
    const [mDown, setMDown] = useState(false)
    const canvasRef = React.createRef()
    const socket = useContext(SocketContext)
    const room = useParams().room

    const paint = (ctx, x, y) => {
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    socket.on("startDraw", (id, x, y) => {
        if(id !== socket.id) {
            console.log("drawing...")
            const canvas = this.canvasRef.current
            const ctx = canvas.getContext("2d")
            ctx.moveTo(x, y)
            ctx.fillRect(x, y, 1, 1) //TODO change to variable
        }
    })

    socket.on("draw", (id, x, y) => {
        if(id !== socket.id) {
            console.log("drawing...")
            const canvas = this.canvasRef.current
            const ctx = canvas.getContext("2d")
            paint(ctx, x, y)
        }
        
    })

    const mouseUp = () => {
        setMDown(false)
    }

    const getCanvas = (event) => {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d")
        const {left, top} = canvas.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        return {ctx, x, y}
    }

    const mouseDown = (event) => {
        const {ctx, x, y} = getCanvas(event)
        ctx.moveTo(x, y) 
        ctx.fillRect(x, y, 1, 1) //TODO change to variable
        setMDown(true)
        socket.emit("canvas:startdraw", 
            ({room: room, id: socket.id, x: x, y: y}))
    }

    const mouseMove = (event) => {
        const {ctx, x, y} = getCanvas(event)
        if(mDown) {
            paint(ctx, x, y)
            socket.emit("canvas:draw", 
                ({room: room, id: socket.id, x: x, y: y}))
            //console.log(event)
        }
    }

    return(
        <canvas ref={canvasRef} width={600} height={400} onMouseDown={mouseDown}
        onMouseUp={mouseUp} onMouseMove={mouseMove}></canvas>
    )
}

export default Canvas