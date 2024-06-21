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
    <div className="home">
      <h1>Draw-together</h1>
      <input placeholder="nickname" onChange={handleName} 
      id="name" autoComplete="off"></input> <br />
      <button onClick={handleCreate} 
      id="create">create room</button>
      <p>or</p>
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="room code"
        autoComplete="off"></input>
        <button type="submit">join</button>
      </form>
    </div>
  )
}

export default App
