import type { Metadata } from "next";
import "./css/globals.css";
import Content from "./components/Content";

export const metadata: Metadata = {
  title: "Animals and Nature Messages",
  description: "Web application for reading messages for Animals and Nature application",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Content />
        {children}
      </body>
    </html>
  );
}
