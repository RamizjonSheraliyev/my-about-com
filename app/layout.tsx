import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
 
import { Header } from "./components/Header";
import { DarkModeProvider } from "./components/DarkModeContext";
import AboutMe from "./components/About";
import { Resume } from "./components/Resume";
import { Portfolio } from "./components/Portfolio";
import { Blog } from "./components/Blog";
import { ContactForm } from "./components/Contact";
import { SocialLinks } from "./components/Form";
 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RamizDev - Portfolio",
  description: "Ramizjon Sheraliyev's personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DarkModeProvider>
          <Header />
          <AboutMe/>
          <Resume/>
          <Portfolio/>
          <Blog/>
          <ContactForm/>
          <SocialLinks/>
          <main className="pt-16">{children}</main>
        </DarkModeProvider>
      </body>
    </html>
  );
}
