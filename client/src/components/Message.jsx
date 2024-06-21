

function Message({text, sender}) {
    return(
        <div>
            {sender}:
            <p>{text}</p>
        </div>
        
    )
}

export default Message