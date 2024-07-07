import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Manager | Home",
  description: "HomePage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/image.png" />
        </head>
        <body className={inter.className}>
          <header className="flex justify-between py-2 px-6 sticky top-0 z-10 overflow-hidden">
            <Image
              src="/Logo.png"
              alt="logo"
              width={40}
              height={20}
            />
            <UserButton showName />
          </header>
          <main>{children}</main>
        <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}