"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth") || "null");

        if (!auth || !auth.username) {
            router.push("");
        }
    }, []);

    return <>{children}</>
};