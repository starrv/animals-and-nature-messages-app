'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const { data: session,status } = useSession()

    let body=null;
    
    if(status==="authenticated"){
        console.log("Session: ",session);
        console.log("You are logged in as:",session.user);
        console.log("User Image: ",session.user?.image);
        console.log("Access Token: ",session.accessToken);
        body=(
            <>
                
                    <button className="logout" onClick={()=>signOut('okta')}>Logout</button>
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