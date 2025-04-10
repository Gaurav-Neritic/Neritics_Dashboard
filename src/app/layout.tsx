import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import AccessibilityMenu from "@/components/Navbar/AccessibilityMenu";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";

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
  description: "Developed With ❤️ By Neritic Industries & Team Pune",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto dark:bg-darkMode dark:text-white`}
      >
        <ReactQueryProvider>
          <div className="grid grid-cols-[1fr_4fr] gap-4">
            <div className=" my-5 border-lightBorder border h-fit dark:border-darkBorder rounded-xl top-1 sticky">
              <SidebarNav />
            </div>
            <div className=" my-5 border border-lightBorder dark:border-darkBorder rounded-xl ">
              <AccessibilityMenu />
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </div>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
