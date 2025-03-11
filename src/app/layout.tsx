import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import SidebarNav from "@/components/Navbar";

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
    <html lang="en">
      <body
        className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto`}
      >
        <div className="w-[100%] flex items-start justify-start gap-4">
          <div className="w-[20%] my-5 border-gray-200 border rounded-xl top-1 sticky">
            <SidebarNav />
          </div>
          <div className="w-[80%] my-5 border border-gray-300 rounded-xl ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
