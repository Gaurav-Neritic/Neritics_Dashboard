"use client"

import axios from 'axios'
import { RotateCw, SquarePlus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Loader from '../Loaders/Loader'
import { useRouter } from 'next/navigation'

type Label = {
    _id: string,
    label: string;
};

interface customInputTypes {
    label: string,
    placeholder: string,
    apiEndPoint: string,
    deleteApiEndpoint: string,
    getApi: () => void,
    categoryArray: Array<Label>,
}

const CustomInput = ({ label, placeholder, apiEndPoint, categoryArray, deleteApiEndpoint, getApi }: customInputTypes) => {
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState<{ [key: number | string]: boolean }>({})
    const router = useRouter();

    const handelAddItem = async () => {
        if (category.trim() === "") {
            return toast.success("Invalid Value", { icon: "▄︻デ══━一💥" })
        }
        setLoading(true);
        try {
            const response = await axios.post(apiEndPoint, { category })
            if (response.data.data) {
                toast.success("Added Successfully");
                setCategory("");
                getApi();
                setLoading(false)
            } else {
                toast.error("Failed");
                setLoading(false)
            }
        } catch (error: any) {
            setLoading(false)
            error.status === 403 ? toast.success("Aleary Exist In Database", { icon: "🖥" }) : ""
            console.log("Error adding", error)
        }
    }

    useEffect(() => {
        categoryArray
    }, [handelAddItem])


    const handelDelete = async (_id: string) => {
        try {
            setDeleteLoading((prev) => ({ ...prev, [_id]: true }))
            const response = await axios.delete(deleteApiEndpoint, { data: { _id } });
            if (response.data.data) {
                toast.success("Deleted !")
                setDeleteLoading((prev) => ({ ...prev, [_id]: false }))
                getApi()
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
            <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm  mb-1">{label}</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder rounded outline-none"
                        placeholder={placeholder}
                    />
                    <button
                        onClick={handelAddItem}
                        className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer">
                        {loading ? <RotateCw className='animate-spin' /> : <SquarePlus className="w-6 h-6" />}
                    </button>
                </div>
                {/* MAP all categories from DB */}

                {categoryArray.length > 0 && categoryArray.map((category, index) => {
                    return (
                        <div key={category?._id} className='flex items-center justify-between p-2 rounded border-lightBorder  border dark:border-darkBorder  my-4'>
                            <div>
                                <h1 className='list-none'><span>{index + 1}.</span> {category?.label}</h1>
                            </div>
                            <button type='button' className='flex items-center gap-4 justify-center cursor-pointer focus:outline-1 outline-lightBorder'>
                                {deleteLoading[category?._id] ? <RotateCw className='animate-spin text-red-500 transition-transform ease-linear duration-200' /> : <Trash2 onClick={() => { handelDelete(category?._id) }} className='text-red-500 hover:fill-red-100' />}
                            </button>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default CustomInput