import { useContext } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setColor } from "../reducers/colorReducer"
import { setWidth } from "../reducers/widthReducer"


function Tools() {
    const socket = useContext(SocketContext)
    const room = useParams().room
    const dispatch = useDispatch()

    const handleClear = () => {
        console.log("clearing")
        socket.emit("canvas:clear", (room))
    }

    const setCol = (event) => {
        dispatch(setColor(event.target.name))
    }

    const setWid = (event) => {
        const input = event.target.value
        var width = 1
        switch(parseInt(input)) {
            case 2:
                width = 5
                break
            case 3:
                width = 10
                break
            case 4:
                width = 15
                break
            default:
                width = 1
        }
        dispatch(setWidth(width))
    }

    return (
        <div className="toolbar">
            <button onClick={handleClear}>clear</button>
            <>
                <input type="range" name="width" 
                min={1} max={4} step={1} defaultValue={1}
                list="markers"
                onChange={setWid}></input>
                
                <datalist id="markers">
                    <option value={1}></option>
                    <option value={2}></option>
                    <option value={3}></option>
                    <option value={4}></option>
                </datalist>
            </>
            <div className="colors">
                <button onClick={setCol} name="red" 
                style={{background: "red"}}></button>
                <button onClick={setCol} name="green" 
                style={{background: "green"}}></button>
                <button onClick={setCol} name="blue" 
                style={{background: "blue"}}></button>
                <button onClick={setCol} name="black" 
                style={{background: "black"}}></button>
            </div>
        </div>
    )
}

export default Tools