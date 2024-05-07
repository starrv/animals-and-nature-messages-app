'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Messages from "./Messages";

//@ts-ignore
export default function Content({session}){
    const router = useRouter();
    
    useEffect(()=>{
       redirect();
    },[]);

    function redirect(){
        let origin='';
        if(typeof window!="undefined"){
            origin=window.location.origin;
        }
        
        const BASE_URL="https://animals-and-nature-messages-app.vercel.app";
        if(origin!==BASE_URL){
            router.push(BASE_URL);
        }
    }

    return(
        <>
             <SessionProvider session={session} >
                <Header />
                <Messages />
             </SessionProvider>
        </>
    );
}