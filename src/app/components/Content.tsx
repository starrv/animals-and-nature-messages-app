
'use client';

import { SessionProvider } from "next-auth/react";
import Header from "./Header";

export default function Content({session}){
    return(
        <>
             <SessionProvider session={session} >
                <Header curSession={session} />
             </SessionProvider>
        </>
    );
}