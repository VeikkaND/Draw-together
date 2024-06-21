import { useContext, useState } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"
import Message from "./Message"

function Chat() {
    const [messages, setMessages] = useState([])
    const socket = useContext(SocketContext)
    const room = useParams().room
    
    socket.on("message", (data) => {
        setMessages(messages.concat(data))
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const text = event.target.text.value 
        if(text !== "") {
            socket.emit("chat:message", ({room: room, id: socket.id, text: text}))
            event.target.text.value = ""
        }
    }

    return(
        <div className="chat">
            <div className="messages">
                {messages.reverse().map((message) => 
                <Message text={message.text} sender={message.id} 
                key={Math.random().toString(16).slice(2)}/>)}
            </div>
            <form onSubmit={handleSubmit}>
                <input name="text" autoComplete="off"></input>
            </form>
        </div>
    )
}

export default Chat