"use client"

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Images, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface imageProps {
    isVisible: boolean;
    onClose: () => void;
    id: any;
    value: string;
    editName: string
}

const SettingsPopup = ({ isVisible, onClose, id, value, editName }: imageProps) => {

    const [editedValue, setEditedValue] = useState(value)

    async function editSettings({ editedValue, id, editName }: { editedValue: string, id: string, editName: string }) {
        try {
            const response = await axios.put('../api/editSettings', { data: { editedValue, id, editName } });

            if (response.data.data) {
                return response.data.data
            }
            return []
        } catch (error) {
            console.log("Error updating the details : ", error)
            return [];
        }
    }

    const editSettingsMutation = useMutation({
        mutationFn: editSettings, onSuccess: () => {
            toast.success("Details Updated, Re-Login to update the changes");
            onClose();
        }
    })

    const handelEditSettings = (editedValue: string) => {
        editSettingsMutation.mutate({ editedValue, id, editName });
    }

    if (!isVisible) return null
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 mx-5 lg:mx-0">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg w-full max-w-md mx-2 lg:mx-0">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Images className="w-6 h-6" />
                        <h1 className="text-lg font-semibold">Edit {editName}</h1>
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
                        type={editName === "Password" ? "password" : "text"}
                        value={editedValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEditedValue(e.target.value)
                        }}
                        required
                        className="w-full text-gray-700 py-2 px-3 font-medium text-sm bg-white border rounded"
                    />
                    <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); handelEditSettings(editedValue) }}
                        className="p-2 border border-lightBorder dark:border-darkBorder text-green-500 hover:text-green-600  rounded cursor-pointer">
                        {editSettingsMutation.isPending ? <Loader2 className="animate-spin" /> : < Edit />}
                    </button>
                </div>

            </div>
        </div>
    );
};
export default SettingsPopup;
