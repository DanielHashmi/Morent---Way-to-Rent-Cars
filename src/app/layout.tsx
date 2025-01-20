import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Plus_Jakarta_Sans } from 'next/font/google';
import SessionWrapper from "./api/auth/[...nextauth]/SessionWrapper";

// Don't show Navbar and footer in these pages
const disallowedPages = ['/signin', '/studio']

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <Navbar disallowedPages={disallowedPages} />
          {children}
          <Footer disallowedPages={disallowedPages} />
        </SessionWrapper>
      </body>
    </html>
  );
}
