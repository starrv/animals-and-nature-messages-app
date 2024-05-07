'use client';

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Messages from "./Messages";

//@ts-ignore
export default function Content({session}){
    const BASE_URL="https://animals-and-nature-messages-app.vercel.app";
    if(window.location.origin!==BASE_URL){
        window.location.replace(BASE_URL);
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