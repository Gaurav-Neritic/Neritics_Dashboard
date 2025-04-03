"use client"

import axios from 'axios'
import { RotateCw, SquarePlus } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface customInputTypes {
    label: string,
    placeholder: string,
    apiEndPoint: string
}

const CustomInput = ({ label, placeholder, apiEndPoint }: customInputTypes) => {
    const [category, setCategory] = useState("")
    const [loading, setLoading] = useState(false)

    const handelAddItem = async () => {
        if (category.trim() === "") {
            toast.success("Invalid Input Value", { icon: "⛔" })
        }
        setLoading(true);
        try {
            const response = await axios.post(apiEndPoint, { category })
            if (response.data.data) {
                toast.success("Added Successfully");
                setCategory("");
                setLoading(false)
            } else {
                toast.error("Failed");
                setLoading(false)
            }
        } catch (error) {
            console.log("Error adding", error)
            setLoading(false)
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
            </div>
        </div>
    )
}

export default CustomInput