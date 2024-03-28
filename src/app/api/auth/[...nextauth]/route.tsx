import NextAuth from "next-auth";
import OktaProvider from "next-auth/providers/okta";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
        clientId: process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        issuer: process.env.ISSUER,
        redirectUri:process.env.AUTHORIZATION_CALLBACK,
        idToken:true,
        checks: ["pkce","state"],
        authorization: { 
          params: { 
            scope: "openid email profile offline_access" 
          } 
        }
      }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.idToken=account.id_token
      }
      const dateNow=Date.now();
      const idTokenDetails=JSON.parse(atob(token.idToken.split(".")[1]));
      const tokenExp=idTokenDetails.exp*1000;
      const hasTokenExpired=dateNow>tokenExp;
    
      if(hasTokenExpired){
        const resp=await fetch(TOKEN_URL,{
          method:"POST",
          headers:{
            "accept":"application/json",
            "authorization":`Basic ${process.env.CLIENT_SECRET_BASE_64}`,
            "cache-control":"no-cache",
            "content-type":"application/x-www-form-urlencoded"
          },
          body:`grant_type=refresh_token&redirect_uri=${process.env.REDIRECT_URL}&scope=offline_access%20openid&refresh_token=${token.refreshToken}`
      });
      const newTokens=await resp.json();
      token.accessToken=newTokens.access_token;
      token.refreshToken=newTokens.refresh_token;
      token.exp+=newTokens.expires_in;
      }
      
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    }
  },
  secret:process.env.SECRET
}
const handler=NextAuth(authOptions);
export {handler as GET, handler as POST}