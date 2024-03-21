'use client';
import Message from "./Message";
import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";

export default function Messages(){
    
    const [messages,setMessages]=useState([]);
    const {data:session,status}=useSession();

    async function getMessages(){
        const URL="http://localhost:8080/messages";
        console.log("Session: ",session);
        const accessToken=session?.accessToken;
        console.log("Access Token: ",accessToken);
        const resp=await fetch(URL,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        });
        console.log("Response: ",resp);
        const messages=await resp.json();
        console.log(messages);
        setMessages(messages);
    }

    useEffect(()=>{
        getMessages()
    },[session]);

    return(
        <>
            <h1>
                Messages
            </h1>
            {messages.map(msg =><Message message={msg} key={msg.id} />)}
        </>
    )
}