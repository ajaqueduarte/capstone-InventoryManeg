import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import {Link} from 'next/navigation'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"min-h-screen font-sans antialiased"}>
        <Providers>
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> */}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              Thank you
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
