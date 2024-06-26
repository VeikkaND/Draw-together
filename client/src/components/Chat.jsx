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
        const newMessages = messages.concat(data)
        newMessages.sort((a, b) => {
            if(a.time < b.time) return -1
            else if(a.time > b.time) return 1
            else return 0
        })
        setMessages(newMessages)
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const time = Date.now()
        console.log(time)
        const text = event.target.text.value 
        if(text !== "") {
            socket.emit("chat:message", 
                ({room: room, name: name, text: text, time: time}))
            event.target.text.value = ""
        }
    }

    return(
        <div className="chat">
            <div className="messages">
                {messages.reverse().map((message) => 
                <Message text={message.text} sender={message.name} 
                key={message.time}/>)}
            </div>
            <form onSubmit={handleSubmit}>
                <input name="text" autoComplete="off"
                placeholder="write a message"></input>
            </form>
        </div>
    )
}

export default Chat