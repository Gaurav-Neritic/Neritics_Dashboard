"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'


type User = {
    name: string;
    email: string;
    avatar: string;
    _id: string;
    isAdmin: boolean;
    isSuperAdmin: boolean
}

const UserContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>(
    {
        user: null,
        setUser: () => { },
    }
)


export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    async function clearCookies() {
        try {
            const response = await axios.get('api/clearCookies');
            if (response.data?.data) {
                router.push('/login')
            }
        } catch (error) {
            console.log(`Erro clearing cookies : ${error}`)
        }
    }

    useEffect(() => {
        const localUser: any = localStorage.getItem("user");
        const loggedUser = JSON.parse(localUser)

        if (loggedUser?.isAdmin) {
            setUser(loggedUser);
        } else {
            clearCookies();
        }

    }, []);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
