import { useContext, useState } from "react"
import SocketContext from "./util/socketContext"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setName } from "./reducers/nameReducer"


function App() {
  const [name, setN] = useState("")
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const handleCreate = () => {
    const code = socket.id
    socket.emit("room:create")
    dispatch(setName(name))
    navigate(`/${code}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const code = event.target.code.value
    const res = socket.emitWithAck("room:join", code)
    if(res) {
      dispatch(setName(name))
      navigate(`/${code}`)
    } else {
      console.log("failed to join room")
    }
  }

  const handleName = (event) => {
    event.preventDefault()
    setN(event.target.value)
  }

  return (
    <div>
      <input placeholder="nickname" onChange={handleName}></input> <br />
      <button onClick={handleCreate}>create room</button>
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="room code"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App
