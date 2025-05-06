/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import axios from 'axios'
import { RotateCw, SquarePlus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Loader from '../Loaders/Loader'

type Label = {
    _id: string,
    label: string;
};

interface customInputTypes {
    label: string,
    placeholder: string,
    apiEndPoint: string,
    deleteApiEndpoint: string,
    categoryArray: Array<Label>,
    name: string,
    loadingData: boolean
}

const CustomInput = ({ label, placeholder, apiEndPoint, categoryArray, deleteApiEndpoint, name, loadingData }: customInputTypes) => {
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState<{ [key: number | string]: boolean }>({})
    const queryClient = useQueryClient()

    // Add the category
    const addMutation = useMutation({
        mutationFn: addCategory,
        onSuccess: (_, variableName) => {
            queryClient.invalidateQueries({ queryKey: [variableName] })
        }
    })

    async function addCategory() {

        setLoading(true);
        try {
            const response = await axios.post(apiEndPoint, { category })
            if (response.data.data) {
                toast.success("Added Successfully");
                setCategory("");
                setLoading(false)
                return response.data.data
            } else {
                toast.error("Failed");
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false)
            if (error.status === 403) {
                toast.success("Aleary Exist In Database", { icon: "🖥" })
            }
            console.log("Error adding", error)
        }
    }

    const handelAddItem = async (name: string) => {
        if (category.trim() === "") {
            return toast.success("Invalid Value", { icon: "▄︻デ══━一💥" })
        }
        addMutation.mutate(name as any);
    }

    // Delete the category
    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [variables.name] })
        }
    })

    const handelDelete = async (_id: string, name: string) => {
        deleteMutation.mutate({ _id, name })
    }

    async function deleteCategory({ _id }: { _id: string; name: string }) {
        try {
            setDeleteLoading((prev) => ({ ...prev, [_id]: true }))
            const response = await axios.delete(deleteApiEndpoint, { data: { _id } });
            if (response.data.data) {
                toast.success("Deleted !")
                setDeleteLoading((prev) => ({ ...prev, [_id]: false }))
                return response.data.data
            } else {
                setDeleteLoading((prev) => ({ ...prev, [_id]: false }))
                toast.error("Failed to Delete !")
            }
        } catch (error) {
            setDeleteLoading((prev) => ({ ...prev, [_id]: false }))
            console.log("Error Deleting", error)
            toast.error("Failed to Delete !")
        }
    }


    return (
        <div className="w-full">
            {/*Product Category */}
            <div className="p-4 m-4 border rounded border-lightBorder dark:border-darkBorder ">
                <h1 className="mb-1 text-sm">{label}</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border rounded outline-none border-lightBorder dark:border-darkBorder"
                        placeholder={placeholder}
                    />
                    <button
                        onClick={(e) => { e.preventDefault(); handelAddItem(name as string) }}
                        className="px-3 py-2 text-white transition bg-green-600 rounded cursor-pointer hover:bg-green-700">
                        {loading ? <RotateCw className='animate-spin' /> : <SquarePlus className="w-6 h-6" />}
                    </button>
                </div>
                {/* MAP all categories from DB */}

                {loadingData && <div className='p-2 my-5 border rounded border-lightBorder dark:border-darkBorder'><Loader title='Fetching...' /></div>}

                {categoryArray.length > 0 && categoryArray.map((category, index) => {
                    return (
                        <div key={category?._id} className='flex items-center justify-between p-2 my-4 border rounded border-lightBorder dark:border-darkBorder'>
                            <div>
                                <h1 className='list-none'><span>{index + 1}.</span> {category?.label}</h1>
                            </div>
                            <button type='button' className='flex items-center justify-center gap-4 cursor-pointer focus:outline-1 outline-lightBorder'>
                                {deleteLoading[category?._id] ? <RotateCw className='text-red-500 transition-transform duration-200 ease-linear animate-spin' /> : <Trash2 onClick={(e) => { e.preventDefault(); handelDelete(category?._id, name) }} className='text-red-500 hover:fill-red-100' />}
                            </button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default CustomInput