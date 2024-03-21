import MessageContent from "./MessageContent";

export default function Message({message}){
    const messageContent=atob(message.content);
    console.log("Message Content: ",messageContent);
    console.log("Message Headers: ",message.mail.headers);
    let subject=null;
    let datetime=null;
    for(let i=0; i<message.mail.headers.length; i++){
        if(message.mail.headers[i].name.toLowerCase()==="date"){
            datetime=message.mail.headers[i].value;
        }
        else if(message.mail.headers[i].name.toLowerCase()==="subject"){
            subject=message.mail.headers[i].value;
        }
    }
    return(
        <div className="message">
          <h2>{subject?subject:"No Subject"}</h2>
          <p>
            {datetime?new Date(message.mail.timestamp).toLocaleString('en-US').toString():"No date"}
          </p>
           <MessageContent content={messageContent} />
        </div>
    )
}