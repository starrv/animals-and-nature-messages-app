'use client';

import Image from 'next/image'
import leaf from "../images/leaf.jpg";
import Nav from './Nav';
import Login from './Login';
import { SessionProvider } from "next-auth/react"

export default function Header({session}){
    return(
        <header>
             <SessionProvider session={session} >
                <Image style={{margin:"0 auto",textAlign:"center", display:"block",borderRadius:"5px"}} src={leaf} alt="leaf icon" width={50} height={50} />
                <h1>
                    Animals and Nature Messages
                </h1>
                <Nav session={session} />
             </SessionProvider>
           
        </header>
    );
}