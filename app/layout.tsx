import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Apna ReduxProvider import karein
import ReduxProvider from "./provider/readuxProvider"; // Path check karlein
import AuthGuard from "@/components/AuthGard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Dashboard",
  description: "Modern Supply Chain Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <ReduxProvider>     
          <AuthGuard>      
            {children}       
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}