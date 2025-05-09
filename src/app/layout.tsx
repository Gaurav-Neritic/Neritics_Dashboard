import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neritic E-commerce Dashboard",
  description: "Developed With ❤️ By Gaurav & Team Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto dark:bg-darkMode dark:text-white transition-colors
        duration-200 ease-in-out`}
      >
        {children}
      </body>
    </html>
  );
}
