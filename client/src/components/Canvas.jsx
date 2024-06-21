import React, { useContext, useState, useRef } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"


function Canvas() {
    const [mDown, setMDown] = useState(false)
    const canvasRef = useRef(null)
    const socket = useContext(SocketContext)
    const room = useParams().room

    const paint = (x, y, start, id) => {
        if(id !== socket.id) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            //console.log(`painting x: ${x} + y: ${y}`)
            if(start) {
                ctx.moveTo(x, y)
                ctx.fillRect(x, y, 1, 1) //TODO change to variable
            } else {
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        }
    }

    socket.on("startDraw", (data) => {
        paint(data.x, data.y, true, data.id)
    })

    socket.on("draw", (data) => {
        paint(data.x, data.y, false, data.id)
    })

    socket.on("clear", () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.reset()
    })


    
    const mouseUp = () => {
        setMDown(false)
    }

    const getCanvas = (event) => {
        const canvas = canvasRef.current
        const {left, top} = canvas.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        return {x, y}
    }

    const mouseDown = (event) => {
        const {x, y} = getCanvas(event)
        paint(x, y, true)
        setMDown(true)
        socket.emit("canvas:startdraw", 
            ({room: room, id: socket.id, x: x, y: y}))   
    }

    const mouseMove = (event) => {
        const {x, y} = getCanvas(event)
        if(mDown) {
            paint(x, y, false)
            socket.emit("canvas:draw", 
                ({room: room, id: socket.id, x: x, y: y}))
        }
    }

    return(
        <canvas ref={canvasRef} width={600} height={400} 
        onMouseDown={mouseDown} onMouseUp={mouseUp} 
        onMouseMove={mouseMove}></canvas>
    )
}

export default Canvas