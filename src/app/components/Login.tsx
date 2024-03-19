'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login(){

    const { data: session,status } = useSession()

    let body=null;
    
    if(status==="authenticated"){
        console.log("You are logged in as:",session.user);
        console.log("Access Token: ",session.accessToken);
        body=(
            <>
                <div>
                    <button onClick={()=>signOut('okta')}>logout</button>
                </div>
            </>
           
        );
    }
    else{
        console.log("Please login");
        body=(
            <>
                <div>
                    <button onClick={()=>signIn('okta')}>Login</button>
                </div>
            </>
        );
    }
    return body;
}