

function Message({text, sender}) {
    return(
        <div className="message">
            <p id="sender">{sender}</p>
            <p id="text">{text}</p>
        </div>
        
    )
}

export default Message