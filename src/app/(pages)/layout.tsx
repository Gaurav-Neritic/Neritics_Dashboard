import type { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import "../../app/globals.css";
import SidebarNav from "@/components/Navbar/(Navbar)/Navbar";
import { Toaster } from "react-hot-toast";
import AccessibilityMenu from "@/components/Navbar/AccessibilityMenu";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { UserContextProvider } from "../context/UserContext";
import MobileNavbar from "@/components/Navbar/(MobileNavbar)/MobileNavbar";

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
        className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto dark:bg-darkMode dark:text-white`}
      >
        <UserContextProvider>
          <ReactQueryProvider>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-4">
              {/* Desktop Navbar*/}
              <div className=" my-5  h-fit rounded mx-4 md:mx-0 border border-lightBorder dark:border-darkBorder sticky top-0  hidden lg:block">
                <SidebarNav />
              </div>
              {/* Mobile Navbar */}
              <div className="bg-gray-50 dark:bg-neutral-900 lg:hidden block mx-5  h-fit rounded lg:mx-0 border border-lightBorder dark:border-darkBorder top-0 sticky p-2  z-10  dark:text-black">
                <MobileNavbar />
              </div>
              {/* Accessibility  */}
              <div className="my-5 max-sm:border-none lg:border border-lightBorder dark:border-darkBorder rounded">
                <AccessibilityMenu />
                {children}
                <Toaster position="top-center" reverseOrder={false} />
              </div>
            </div>
          </ReactQueryProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
