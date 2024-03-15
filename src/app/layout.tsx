import type { Metadata } from "next";
import "./css/globals.css";


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
      <body>{children}</body>
    </html>
  );
}
