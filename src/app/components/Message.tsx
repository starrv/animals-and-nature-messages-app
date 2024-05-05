import MessageContent from "./MessageContent";
import type {Message} from "./Messages";
import {useState} from "react";

export default function Message({message}:{message:Message}){

    const [viewMore,setViewMore]=useState(false);

    function toggleViewMore(){
        setViewMore(!viewMore);
    }

    const messageContent=atob(message.content);
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
          <p className="toggle-view-more" onClick={toggleViewMore}>
            {viewMore ? <span>View Less</span> : <span>View More</span>}
          </p>
           {viewMore ? <MessageContent content={messageContent} /> : null}
        </div>
    )
}