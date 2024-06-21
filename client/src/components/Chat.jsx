import { useContext, useState } from "react"
import SocketContext from "../util/socketContext"
import { useParams } from "react-router-dom"
import Message from "./Message"
import { useSelector } from "react-redux"

function Chat() {
    const [messages, setMessages] = useState([])
    const socket = useContext(SocketContext)
    const room = useParams().room
    const name = useSelector((state) => state.name.value)
    
    socket.on("message", (data) => {
        setMessages(messages.concat(data))
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const text = event.target.text.value 
        if(text !== "") {
            socket.emit("chat:message", 
                ({room: room, name: name, text: text}))
            event.target.text.value = ""
        }
    }

    return(
        <div className="chat">
            <div className="messages">
                {messages.reverse().map((message) => 
                <Message text={message.text} sender={message.name} 
                key={Math.random().toString(16).slice(2)}/>)}
            </div>
            <form onSubmit={handleSubmit}>
                <input name="text" autoComplete="off"></input>
            </form>
        </div>
    )
}

export default Chat