import type { Metadata } from "next";
import {Toaster} from "sonner";

import "./globals.css";

import Navbar from "../components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="bg-[#f5f8f5] text-[#202522]">
        <Navbar />
        {children}
        <Toaster position="top-center" richColors />
        <Footer/>
        
      </body>
    </html>
  );
}
