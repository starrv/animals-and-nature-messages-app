'use client';
import Message from "./Message";
import {useState,useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from 'next/navigation';

export default function Messages(){
    const router=useRouter();
    const [messages,setMessages]=useState([]);
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
        console.log("Session: ",session);
        const accessToken=session?.accessToken;
        console.log("Access Token: ",accessToken);

        const resp=await fetch(URL,{
            headers:{
                "Authorization":`Bearer ${accessToken}`
            }
        });
        console.log("Response: ",resp);
        if(resp.ok){
            const messages=await resp.json();
            console.log(messages);
            setLoading("");
            setErrorMsg("");
            setMessages(messages);
        }
        else{
            if(accessToken){
                console.error("Unauthorized");
                setLoading("");
                setMessages([]);
                setErrorMsg(errorTxt);
            }
            else{
                console.log("loading....");
                setLoading("Loading....");
            }
        }
    }

    useEffect(()=>{
        getMessages()
    },[session]);

    let content=null;
    if(errorMsg){
        content=<p className="error-msg">{errorTxt}</p>
    }
    else if(loading){
        content=<p className="loading">loading....</p>
    }
    else{
        if(messages.length>0){
            content=messages.map(msg =><Message message={msg} key={msg.id} />);
        }
        else{
           content=<p className="no-messages">No Messages</p>
        }
    }

    return(
        <>
            <h1>
                Messages
            </h1>
            {content}
        </>
    )
}