'use client';
import Message from "./Message";
import Search from "./Search";
import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";

export interface Message{
    id: string;
    notificationType:string;
    mail:Mail;
    content:string
}

export interface Mail{
   headers:Header[];
   timestamp:string;
}

export interface Header{
    name:string;
    value:string;
}

export default function Messages(){
  
    const [messages,setMessages]=useState([]);
    const [timer,setTimer]=useState(0);
    const [filterBy,setFilterBy]=useState("");

    const {data:session}=useSession();

    const [errorMsg,setErrorMsg]=useState("");
    const [loading,setLoading]=useState("loading....");

    const errorTxt="An error has occurred.  Please contact IT Support.";
    
    async function getMessages(){
        const URL=process.env.NEXT_PUBLIC_MESSAGES_URL as string;
        const accessToken=session?.accessToken;

        const resp=await fetch(URL,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        });
        if(resp.ok){
            const messages=await resp.json();
            setLoading("");
            setErrorMsg("");
            setMessages(messages);
        }
        else{
            if(accessToken){
                setLoading("");
                setMessages([]);
                setErrorMsg(errorTxt);
            }
            else{
                setLoading("Loading....");
            }
        }
    }

    function hasSubject(message:Message, subject:string){
        for(let i=0; i<message.mail.headers.length; i++){
            if(message.mail.headers[i].name.toLowerCase()==="subject" && message.mail.headers[i].value.includes(subject)){
                return true;
            }
        }
        return false;
    }

    function hasDate(message:Message, date:string){
        const formattedDate=new Date(message.mail.timestamp).toLocaleString('en-US').toString();
        console.log("Date: ",date);
        console.log("Formatted Date: ",formattedDate);
        return formattedDate.includes(date);
    }

    useEffect(()=>{
        getMessages()
        setInterval(()=>{
            setTimer(timer=>timer+1)
        },30000);
    },[session,timer]);

    let content;
    if(errorMsg){
        content=<div className="messages"><p className="error-msg">{errorTxt}</p></div>
    }
    else if(loading){
        content=<div className="messages"><p className="loading">loading....</p></div>
    }
    else{
        if(messages.length>0){
            const filteredMessages=messages.filter(message=>filterBy==="" || hasSubject(message,filterBy) || hasDate(message,filterBy));
            content=<><Search filterBy={filterBy} setFilterBy={setFilterBy} /><div className="messages">{filteredMessages.map(msg =><Message message={msg} key={msg.id} />)}</div></>
        }
        else{
           content=<div className="messages"><p className="no-messages">No Messages</p></div>
        }
    }

    return(
       <>
            
            {content}
        </>
    )
}