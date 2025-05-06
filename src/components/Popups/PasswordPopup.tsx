/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Images, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface imageProps {
    isVisible: boolean;
    onClose: () => void;
    id: any;
}

const PasswordPopup = ({ isVisible, onClose, id }: imageProps) => {
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("")
    const router = useRouter()


    const clearCookies = async () => {
        try {
            const response = await axios.get('../api/clearCookies');
            if (response.data.data) {
                localStorage.removeItem('user');
                router.push('/login')
            }
        } catch (error) {
            console.error("Error clearing cookies ", error)
        }
    }

    async function updatePassword({ newPassword, id }: { newPassword: string, id: string }) {
        try {
            const response = await axios.put('../api/updatePassword', { data: { newPassword, id, otp } });

            if (response.data.data) {
                return response.data.data
            } else {
                toast.error("In-Valid OTP")
            }
        } catch (error) {
            console.log(`Error updating the password : `, error);
            toast.error("In-Valid OTP")
        }
    }

    const updatePasswordMutation = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("Password Updated");
            clearCookies();
            onClose();
        }
    })

    const handelPassword = (newPassword: string) => {
        updatePasswordMutation.mutate({ newPassword, id });
    }

    if (!isVisible) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center mx-5 bg-opacity-50 backdrop-blur-sm lg:mx-0">
            <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-lg dark:bg-neutral-800 border-neutral-700">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 py-5">
                        <Images className="w-6 h-6" />
                        <h1 className="text-lg font-semibold">Update Password</h1>
                    </div>
                    <button
                        type="button"
                        className="cursor-pointer focus:outline-none"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                    </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handelPassword(newPassword) }} className="flex flex-col items-center gap-4 ">

                    <input
                        type={"text"}
                        value={newPassword}
                        placeholder="Enter New Password..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPassword(e.target.value)
                        }}
                        required
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded"
                    />
                    <input
                        type={"text"}
                        value={otp}
                        placeholder="Enter Your 6 Digit OTP..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOtp(e.target.value)
                        }}
                        required
                        className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded"
                    />
                    <span className="text-sm text-gray-400 animate-pulse">*Note : Check Your Registered Email For OTP</span>
                    <button
                        type="submit"
                        className="w-full p-2 text-green-500 border rounded cursor-pointer border-lightBorder dark:border-darkBorder hover:text-green-600">
                        {updatePasswordMutation.isPending ? <Loader2 className="animate-spin" /> :
                            (<div className="flex items-center justify-center gap-3">< Edit /> Update Password</div>)}
                    </button>
                </form>

            </div>
        </div>
    );
};
export default PasswordPopup;
