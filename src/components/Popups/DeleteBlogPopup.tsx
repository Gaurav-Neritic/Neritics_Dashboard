import { AlertCircle } from "lucide-react";
import React from "react";
import Loader from "../Loaders/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePopupProps {
    isVisible: boolean;
    onClose: () => void;
    blogTitle: string;
    id: string;
}

const DeleteBlogPoup = ({ isVisible, onClose, blogTitle, id }: DeletePopupProps) => {

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            onClose();
        },
    });


    async function handelDelete(id: string) {
        deleteMutation.mutate(id);
    }

    async function deleteBlog(id: string) {
        try {
            const response = await axios.delete("api/deleteBlog", {
                data: { id },
                fetchOptions: { cache: "no-store" },
            });

            if (response.data.data) {
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.log("Error Deleting the blog", error);
            toast.error("Error: Try after few minutes");
        }
    }

    if (!isVisible) return null;
    return (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 mx-5 lg:mx-0">
            <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="flex items-center mb-4 text-red-500">
                    <AlertCircle className="mr-2" />
                    <h2 className="text-xl font-bold">Confirm Delete</h2>
                </div>
                <div className="mb-6 text-gray-600 dark:text-gray-300 ">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold capitalize">{`"${blogTitle}"`} </span>?
                    This action cannot be undone.
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md border-lightBorder dark:border-darkBorder  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handelDelete(id);
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                    >
                        {deleteMutation.isPending ? <Loader title="Deleting..." /> : <span>Delete</span>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBlogPoup;
