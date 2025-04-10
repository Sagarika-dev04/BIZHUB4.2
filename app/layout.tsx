import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers"; 

const font = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'], // ✅ Added to fix preload subset error
  preload: true
});

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
      <body className={`${font.className} antialiased`}>
        <Providers>{children}</Providers> 
      </body>
    </html>
  );
}
