import Message from "./Message"

export default function Messages(){
    const messages=[];
    for(let i=0; i<100; i++){
        messages.push(`Message ${i+1}`);
    }
    return(
        <>
            <h1>
                Messages
            </h1>
            <div className="messages">
                {messages.map(msg =><Message message={msg} />)}
            </div>
        </>
    )
}