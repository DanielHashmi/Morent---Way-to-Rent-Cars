import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Plus_Jakarta_Sans } from 'next/font/google';
import SessionWrapper from "./api/auth/[...nextauth]/SessionWrapper";
import client from "@/sanity/lib/client";
import { UsersQuery } from "@/sanity/lib/grok";
import { USER } from "@/types/types";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/authOptions";

// Don't show Navbar and footer in these pages
const disallowedPages = ['/signin', '/studio','/not_admin']

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], display: 'swap' });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MOREMT - Way to Rent Cars",
  description: "Here you can rent your and rent cars easily reliably, don't miss out!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch current User from Sanity
  const session = await getServerSession(authOption);
  let user: USER = {} as USER;
  try {
    user = (await client.fetch(UsersQuery) as USER[]).find(user => user.email === session?.user?.email) || {} as USER;
  } catch (error) {
    console.log(error);
  }

  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar disallowedPages={disallowedPages} user={user} />
          {children}
          <Footer disallowedPages={disallowedPages} />
        </SessionWrapper>
      </body>
    </html>
  );
}
