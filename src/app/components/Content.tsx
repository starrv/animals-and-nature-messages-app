
'use client';

import { SessionProvider } from "next-auth/react";
import Header from "./Header";
import Main from "./Main";

export default function Content({session}){
    return(
        <>
             <SessionProvider session={session} >
                <Header />
             </SessionProvider>
        </>
    );
}