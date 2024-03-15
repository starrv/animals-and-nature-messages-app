import Message from "./Message"

export default function Messages(){
    const messages=["message 1","message 2","message 3","message 4"];
    return(
        <div className="messages">
            <h1>
                Messages
            </h1>
            <ul>
                {messages.map(msg =><Message message={msg} />)}
            </ul>
        </div>
    )
}