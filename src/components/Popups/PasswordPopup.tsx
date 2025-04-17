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

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter()

    async function clearCookies() {
        try {
            const response = await axios.get("api/clearCookies");
            if (response.data?.data) {
                router.push("/login");
            }
        } catch (error) {
            console.log(`Error clearing cookies : ${error}`);
        }
    }


    async function updatePassword({ oldPassword, newPassword, id }: { oldPassword: string, newPassword: string, id: string }) {
        try {
            const response = await axios.put('../api/updatePassword', { data: { oldPassword, newPassword, id } });

            if (response.data.data) {
                return response.data.data
            }
            return [];
        } catch (error) {
            console.log(`Error updating the password : `, error)
            return [];
        }
    }

    const updatePasswordMutation = useMutation({
        mutationFn: updatePassword
        , onSuccess: () => {
            toast.success("Password Updated");
            onClose();
            clearCookies();
        }
    })

    const handelPassword = (oldPassword: string, newPassword: string) => {
        updatePasswordMutation.mutate({ oldPassword, newPassword, id });
    }

    if (!isVisible) return null
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 mx-5 lg:mx-0">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
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

                <div className="flex items-center gap-4">
                    <input
                        type={"text"}
                        value={oldPassword}
                        placeholder="Enter Old Password..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setOldPassword(e.target.value)
                        }}
                        required
                        className="w-full text-gray-700 py-2 px-3 font-medium text-sm bg-white border rounded"
                    />
                    <input
                        type={"text"}
                        value={newPassword}
                        placeholder="Enter New Password..."
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPassword(e.target.value)
                        }}
                        required
                        className="w-full text-gray-700 py-2 px-3 font-medium text-sm bg-white border rounded"
                    />
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); handelPassword(oldPassword, newPassword) }}
                        className="p-2 border border-lightBorder dark:border-darkBorder text-green-500 hover:text-green-600  rounded cursor-pointer">
                        {updatePasswordMutation.isPending ? <Loader2 className="animate-spin" /> : < Edit />}
                    </button>
                </div>

            </div>
        </div>
    );
};
export default PasswordPopup;
