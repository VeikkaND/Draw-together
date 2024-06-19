import { useContext } from "react"
import SocketContext from "./util/socketContext"


function App() {
  const socket = useContext(SocketContext)

  return (
    <div>
      <h1>H</h1>
    </div>
  )
}

export default App
