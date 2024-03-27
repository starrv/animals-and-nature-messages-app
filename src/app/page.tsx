'use client'
import Login from "./components/Login";
import { SessionProvider } from "next-auth/react"
import Content from "./components/Content";

export default function HomePage() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"> 
       <h1>
        Welcome!!
       </h1>
       <p className="home-page-msg">For any inquiries please contact us at <a href="mailto: webmaster@animalsandnature.org" style={{color:"green", textDecoration:"underline"}}>webmaster@animalsandnature.org</a>.</p>
      </div>
    </main>
  );
}
