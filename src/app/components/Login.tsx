'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const { data: session,status } = useSession()
    let body;
    console.log("callback url: ",window.location.origin);
    
    if(status==="authenticated"){
        body=(
            <>
                
                <button className="logout" onClick={()=>signOut({ callbackUrl: window.location.origin })}>Logout</button>
            </>
           
        );
    }
    else{
        body=(
            <>
               
                <button className="login" onClick={()=>signIn('okta',{ prompt: 'login' })}>Login</button>
            </>
        );
    }
    return body;
}