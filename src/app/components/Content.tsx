'use client';

import { useSession,SessionProvider } from "next-auth/react";
import Header from "./Header";
import Messages from "./Messages";

export default function Content({session}){
    return(
        <>
             <SessionProvider session={session} >
                <Header />
                <Messages />
             </SessionProvider>
        </>
    );
}