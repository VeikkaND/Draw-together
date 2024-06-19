import { useContext } from "react"
import SocketContext from "./util/socketContext"
import { useNavigate } from "react-router-dom"


function App() {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  const handleCreate = () => {
    const code = socket.id
    socket.emit("room:create")
    navigate(`/${code}`)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const code = event.target.code.value
    const res = socket.emitWithAck("room:join", code)
    if(res) {
      navigate(`/${code}`)
    } else {
      console.log("failed to join room")
    }
  }

  return (
    <div>
      <button onClick={handleCreate}>create room</button>
      <form onSubmit={handleSubmit}>
        <input name="code"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default App
