import { useContext } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { set } from "../reducers/colorReducer"


function Tools() {
    const socket = useContext(SocketContext)
    const room = useParams().room
    const dispatch = useDispatch()

    const handleClear = () => {
        socket.emit("canvas:clear", (room))
    }

    const setColor = (event) => {
        dispatch(set(event.target.name))
    }

    return (
        <div className="toolbar">
            <button onClick={handleClear}> clear </button>
            <div className="colors">
                <button onClick={setColor} name="red">r</button>
                <button onClick={setColor} name="green">g</button>
                <button onClick={setColor} name="blue">b</button>
                <button onClick={setColor} name="black">bl</button>
            </div>
        </div>
    )
}

export default Tools