
'use client'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security, SecureRoute } from '@okta/okta-react';

export default function LoginPage(){

    async function login(){
        oktaAuth.signInWithRedirect();
    }
    const clientID=process.env.NEXT_PUBLIC_CLIENT_ID;
    const issuer=process.env.NEXT_PUBLIC_ISSUER;
    const authorizationCallback=process.env.NEXT_PUBLIC_AUTHORIZATION_CALLBACK;

    const oktaAuth = new OktaAuth({
        issuer: issuer,
        clientId:clientID,
        redirectUri:  authorizationCallback
      });

    return(
        <div>
             <button onClick={login}>Login</button>
        </div>
    )
}