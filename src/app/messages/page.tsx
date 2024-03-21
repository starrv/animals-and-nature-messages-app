
'use client';
import Messages from "../components/Messages";
import { SessionProvider } from "next-auth/react";

export default function MessagesPage({session}){
    return(
        <SessionProvider session={session}>
            <Messages />
        </SessionProvider>
    );
}