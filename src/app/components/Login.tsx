'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const { data: session,status } = useSession()
    let body;
    
    if(status==="authenticated"){
        body=(
            <>
                
                <button className="logout" onClick={()=>signOut({ callbackUrl: 'http://localhost:3000/' })}>Logout</button>
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