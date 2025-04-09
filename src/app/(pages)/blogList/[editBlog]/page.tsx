"use client"

import Loader from '@/components/Loaders/Loader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const { editBlog } = useParams();

    async function getBlogDetails(id: string) {
        try {
            const response = await axios.get(`../api/getBlogDetails/${id}`);
            if (response.data.data) {
                console.log(response.data.data)
                return response.data.data
            }
            return null
        } catch (error) {
            console.log("Error getting details", error)
        }
    }

    const { data: blogDetails = [], isLoading, isError } = useQuery({
        queryKey: ['blogDetails', editBlog],
        queryFn: () => getBlogDetails(editBlog as string),
        enabled: !!editBlog,
    })

    const desc: string = blogDetails.description;

    return (
        <div className='p-5'>
            {isLoading && <div className='flex items-center justify-center py-10'><Loader title='Fetching...' /></div>}

            

        </div>
    )
}

export default page
