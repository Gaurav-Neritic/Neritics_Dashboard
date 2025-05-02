import type { Metadata } from "next";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "Login | Neritic Dashboard",
};

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