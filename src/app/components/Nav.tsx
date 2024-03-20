'use client';

import Login from './Login';

export default function Nav({session}){

   
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