import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neritics Ecommerce Dashboard",
  description: "Developed With ❤️ By NeriticsIndustries & Team Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark:bg-[#1a1a1a] dark:text-white">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto dark:bg-[#1a1a1a] dark:text-white`}
      >
        <div className="grid grid-cols-[1fr_4fr] gap-4">
          <div className=" my-5 border-gray-200 border h-fit dark:border-neutral-600 rounded-xl top-1 sticky">
            <SidebarNav />
          </div>
          <div className=" my-5 border border-gray-300 dark:border-neutral-600 rounded-xl ">
            <AccessibilityMenu />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </body>
    </html>
  );
}
