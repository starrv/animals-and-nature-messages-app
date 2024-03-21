'use client';

import Login from './Login';
import {useSession} from 'next-auth/react';

export default function Nav(){

    const { data: session,status } = useSession();
   
    let messages=null;
    if(status==="authenticated"){
        messages= <a href="/messages">
        Messages
    </a>
    }
    return(
        <nav className="nav-bar">
            <a href="/">
                Home
            </a>
            {messages}
            <Login /> 
        </nav>
    );
}