'use client';

import Login from './Login';
import {useSession} from 'next-auth/react';

export default function Nav(){

    const { data: session,status } = useSession();
   
    return(
        <nav className="nav-bar">
            <Login /> 
        </nav>
    );
}