import type { Metadata } from "next";
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
        <ReactQueryProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
        </ReactQueryProvider>
    );
}