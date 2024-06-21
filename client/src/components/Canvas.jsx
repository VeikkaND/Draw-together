import React, { useContext, useState, useRef } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"


function Canvas() {
    const [mDown, setMDown] = useState(false)
    const canvasRef = useRef(null)
    const socket = useContext(SocketContext)
    const room = useParams().room
    const color = useSelector((state) => state.color.value) 
    const width = useSelector((state) => state.width.value) 

    const paint = (x, y, start, color, width, id) => {
        if(id !== socket.id) {
            const canvas = canvasRef.current
            const ctx = canvas.getContext("2d")
            ctx.strokeStyle = color
            ctx.lineWidth = width
            //console.log(`painting x: ${x} + y: ${y}`)
            if(start) {
                ctx.beginPath()
                ctx.moveTo(x, y)
                ctx.fillRect(x, y, 1, 1) //TODO change to variable
            } else {
                ctx.lineTo(x, y)
                ctx.stroke()
            }
        }
    }

    socket.on("startDraw", (data) => {
        paint(data.x, data.y, true, data.color, data.width, data.id)
    })

    socket.on("draw", (data) => {
        paint(data.x, data.y, false, data.color, data.width, data.id)
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
        paint(x, y, true, color, width)
        setMDown(true)
        socket.emit("canvas:startdraw", 
            ({room: room, id: socket.id, x: x, y: y, 
                color: color, width: width}))   
    }

    const mouseMove = (event) => {
        const {x, y} = getCanvas(event)
        if(mDown) {
            paint(x, y, false, color, width)
            socket.emit("canvas:draw", 
                ({room: room, id: socket.id, x: x, y: y, 
                    color: color, width: width}))
        }
    }

    return(
        <canvas ref={canvasRef} width={600} height={400} 
        onMouseDown={mouseDown} onMouseUp={mouseUp} 
        onMouseMove={mouseMove}></canvas>
    )
}

export default Canvas