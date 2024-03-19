import type { Metadata } from "next";
import "./css/globals.css";
import Header from "./components/Header";
import { SessionProvider } from "next-auth/react"

export const metadata: Metadata = {
  title: "Animals and Nature Messages",
  description: "Web application for reading messages for Animals and Nature application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Header />
      {children}
      </body>
    </html>
  );
}
