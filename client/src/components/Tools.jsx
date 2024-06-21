import { useContext } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"


function Tools() {
    const socket = useContext(SocketContext)
    const room = useParams().room

    const handleClear = () => {
        socket.emit("canvas:clear", (room))
    }

    return (
        <div className="toolbar">
            <button onClick={handleClear}> clear </button>
        </div>
    )
}

export default Tools