import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SocketContext from "../util/socketContext"
import Canvas from "../components/Canvas"
import Tools from "../components/Tools"

function Room() {
    const socket = useContext(SocketContext)
    const room = useParams().room
    const navigate = useNavigate()

    const handleBack = () => {
        socket.emit("room:leave", room)
        navigate("/")
    }

    return(
        <div>
            <button onClick={handleBack}>back</button>
            <h1>{room}</h1>
            <Canvas />
            <Tools />
        </div>
    )
}

export default Room