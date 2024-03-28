'use client';
import Message from "./Message";
import Search from "./Search";
import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';

export default function Messages(){
    const router=useRouter();
    const [messages,setMessages]=useState([]);
    const [timer,setTimer]=useState(0);
    const [filterBy,setFilterBy]=useState("");

    const {data:session}=useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            router.push("/");
          }
    });
    const [errorMsg,setErrorMsg]=useState("");
    const [loading,setLoading]=useState("loading....");

    const errorTxt="An error has occurred.  Please contact IT Support.";
    
    async function getMessages(){
        const URL="http://localhost:8080/messages";
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

    function hasSubject(message, subject){
        for(let i=0; i<message.mail.headers.length; i++){
            if(message.mail.headers[i].name.toLowerCase()==="subject" && message.mail.headers[i].value.includes(subject)){
                return true;
            }
        }
        return false;
    }

    function hasDate(message, date){
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

    let content=null;
    if(errorMsg){
        content=<div className="messages"><p className="error-msg">{errorTxt}</p></div>
    }
    else if(loading){
        content=<div className="messages"><p className="loading">loading....</p></div>
    }
    else{
        if(messages.length>0){
            const filteredMessages=messages.filter(message=>filterBy==="" || hasSubject(message,filterBy) || hasDate(message,filterBy));
            content=<div className="messages">{filteredMessages.map(msg =><Message message={msg} key={msg.id} />)}</div>
        }
        else{
           content=<div className="messages"><p className="no-messages">No Messages</p></div>
        }
    }

    return(
        <>
            <h1>
                Messages
            </h1>
            <Search filterBy={filterBy} setFilterBy={setFilterBy} />
            {content}
        </>
    )
}