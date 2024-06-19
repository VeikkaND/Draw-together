import React, { useContext, useState, useRef } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"


function Canvas() {
    const [mDown, setMDown] = useState(false)
    const canvasRef = useRef(null)
    const socket = useContext(SocketContext)
    const room = useParams().room

    const paint = (x, y) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        console.log(`painting x: ${x} + y: ${y}`)
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    socket.on("startDraw", (data) => {
            ctx.moveTo(data.x, data.y)
            ctx.fillRect(data.x, data.y, 1, 1) //TODO change to variable
    })

    socket.on("draw", (data) => {
        paint(data.x, data.y)
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
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        ctx.moveTo(x, y) 
        ctx.fillRect(x, y, 1, 1) //TODO change to variable
        setMDown(true)
        
        socket.emit("canvas:startdraw", 
            ({room: room, x: x, y: y}))
            
    }

    const mouseMove = (event) => {
        const {x, y} = getCanvas(event)
        if(mDown) {
            paint(x, y)
            
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