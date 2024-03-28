'use client';

import Image from 'next/image'
import leaf from "../images/leaf.jpg";
import Nav from './Nav';
import { useSession,signIn } from "next-auth/react";

export default function Header(){

    const { data: session,status } = useSession({
        required: true,
        onUnauthenticated(){
            signIn('okta');
        }
    });

    return(
        status==="authenticated" ? <header>
            <p className="user-info">You are signed in as {session?.user?.name}</p>: null}
            <Image style={{margin:"0 auto",textAlign:"center", display:"block",borderRadius:"5px"}} src={leaf} alt="leaf icon" width={50} height={50} />
            <h1>
                Animals and Nature Messages
            </h1>
            <Nav />   
        </header> : null
    );
}