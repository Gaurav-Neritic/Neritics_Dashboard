import type { Metadata } from "next";
import "../../app/globals.css"
import { Fira_Code, Inter } from "next/font/google";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Login | Neritic Dashboard",
};

const inter = Inter({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Fira_Code({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${geistMono.variable} antialiased max-w-[85rem] mx-auto dark:bg-darkMode dark:text-white`}>
                <ReactQueryProvider>
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </ReactQueryProvider>
            </body>
        </html>
    );
}