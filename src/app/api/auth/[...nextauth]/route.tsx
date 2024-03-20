import NextAuth from "next-auth";
import OktaProvider from "next-auth/providers/okta";

console.log("Client ID: ",process.env.NEXT_PUBLIC_CLIENT_ID);

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    OktaProvider({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
        issuer: process.env.NEXT_PUBLIC_ISSUER,
        redirectUri:process.env.NEXT_PUBLIC_AUTHORIZATION_CALLBACK,
        checks: ["pkce","state"]
      }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
  userinfo: {
    url: "http://localhost:3000/oauth/userinfo",
    params: { some: "param" }
  },
  secret:process.env.NEXT_PUBLIC_SECRET
}
const handler=NextAuth(authOptions);
export {handler as GET, handler as POST}