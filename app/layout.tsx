import type { Metadata } from "next";
import {Poppins } from "next/font/google";
import "./globals.css";

const font=Poppins({
  weight:['100','200','300','400','500','600','700','800','900']
})

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Mini Business Directory | Find & List Local Businesses Online",
  description: "A fast and easy-to-use business directory where users can search, filter, and explore businesses, while owners can add, edit, and manage their listings. Built with Next.js, React.js, and MongoDB for a seamless experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
