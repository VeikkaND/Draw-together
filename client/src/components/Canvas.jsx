import React, { useState } from "react"


function Canvas() {
    const [mDown, setMDown] = useState(false)
    const canvasRef = React.createRef()

    const paint = (ctx, x, y) => {
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const mouseDown = () => {
        setMDown(true)
    }

    const mouseUp = () => {
        setMDown(false)
    }

    const mouseMove = (event) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const {left, top} = canvas.getBoundingClientRect()
        const x = event.clientX - left
        const y = event.clientY - top
        if(mDown) {
            paint(ctx, x, y)
            //console.log(event)
        }
    }

    return(
        <canvas ref={canvasRef} width={600} height={400} onMouseDown={mouseDown}
        onMouseUp={mouseUp} onMouseMove={mouseMove}></canvas>
    )
}

export default Canvas