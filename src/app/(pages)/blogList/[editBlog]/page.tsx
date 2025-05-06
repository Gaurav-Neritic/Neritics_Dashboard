"use client";

import BlogEditor from "@/components/BlogPage/BlogEditor";
import ImagePopup from "@/components/Popups/ImagePopup";
import Loader from "@/components/Loaders/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FileText, ImagePlus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
    const { editBlog } = useParams();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publish, setPublish] = useState("");
    const [popup, setPopup] = useState(false);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        data: blogDetails = [],
        isLoading,
    } = useQuery({
        queryKey: ["blogDetails", editBlog],
        queryFn: () => getBlogDetails(editBlog as string),
        enabled: !!editBlog,
        refetchOnWindowFocus: false,
    });

    async function getBlogDetails(id: string) {
        try {
            const response = await axios.get(`../api/getBlogDetails/${id}`);
            if (response.data.data) {
                console.log(response.data.data);
                return response.data.data;
            }
            return null;
        } catch (error) {
            console.log("Error getting details", error);
            return [];
        }
    }

    async function updateBlogDetails() {
        const formData = new FormData();
        formData.append("id", editBlog as string);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("publish", publish);
        formData.append("image", image);
        formData.append("author", author);
        try {
            const response = await axios.put("../api/editBlog", formData);
            if (response.data.data) {
                toast.success("Blog updated!");
                return response.data.data;
            }
            return [];
        } catch (error) {
            console.error("Error Updating the blogs", error);
            return [];
        }
    }

    const updateMutation = useMutation({
        mutationFn: updateBlogDetails,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            queryClient.invalidateQueries({ queryKey: ["blogDetails"] });
            router.push("/blogList");
        },
        onError: () => {
            toast.error("Something Went Wrong");
        },
    });

    const handelSubmit = (e: FormEvent) => {
        e.preventDefault();
        updateMutation.mutate();
    };

    useEffect(() => {
        setTitle(blogDetails?.title);
        setAuthor(blogDetails?.author);
        setPublish(blogDetails?.publish ? "Publish" : "Un-List");
        setImage(blogDetails?.image);
        setDescription(blogDetails?.description);
    }, [blogDetails]);

    return (
        <div className="p-5">
            {isLoading && (
                <div className="flex items-center justify-center py-10">
                    <Loader title="Fetching..." />
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3 py-5">
                    <div className="hidden p-1 border border-gray-500 rounded lg:block">
                        <FileText />
                    </div>
                    <div className="py-5">
                        <p className="text-sm font-normal text-gray-500">
                            All the fields are required
                        </p>
                        <h1 className="font-normal text-md">
                            <span className="text-lg font-semibold lg:text-3xl">Editing Blog:</span> {title}{" "}
                        </h1>
                    </div>
                </div>
            </div>

            <form onSubmit={handelSubmit}>
                <div>
                    <div className="pb-2">
                        <h2 className="text-lg antialiased font-semibold">
                            Blog Title & Author
                        </h2>
                    </div>
                    <div className="p-4 border rounded border-lightBorder dark:border-darkBorder">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
                            <div className="w-full">
                                <label>Blog Title:</label>
                                <input
                                    type="text"
                                    value={title || ""}
                                    className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0"
                                    placeholder="Enter Blog Title"
                                    required
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="w-full">
                                <label>Blog Author:</label>
                                <input
                                    type="text"
                                    value={author || ""}
                                    className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0"
                                    placeholder="Enter Blog Author"
                                    required
                                    onChange={(e) => {
                                        setAuthor(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-5">
                    <div className="pb-2">
                        <h2 className="text-lg antialiased font-semibold">Blog Images</h2>
                    </div>
                    <div className="p-4 border rounded border-lightBorder dark:border-darkBorder">
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
                            <div>
                                <div className="relative p-1 border rounded border-lightBorder dark:border-darkBorder ">
                                    <div className="">
                                        <Image
                                            height={200}
                                            width={200}
                                            src={image || "/placeholder.jpg"}
                                            alt="saved images"
                                            className="object-cover h-auto border rounded lg:w-24 w-fit border-lightBorder dark:border-darkBorder"
                                        />
                                    </div>

                                    <div className="absolute top-1 right-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPopup(true);
                                            }}
                                            className="cursor-pointer text-lightBorder hover:text-darkBorder dark:hover:text-lightBorder dark:text-darkBorder"
                                        >
                                            <ImagePlus />
                                        </button>
                                    </div>
                                </div>
                                {popup && <ImagePopup isVisible={popup} onClose={() => setPopup(false)} id={editBlog} />}
                            </div>
                            <div>
                                <label>Publishing Status:</label>
                                <select
                                    value={publish}
                                    onChange={(e) => {
                                        setPublish(e.target.value);
                                    }}
                                    className="w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-[9px] rounded text-gray-400 mt-2 dark:bg-darkMode"
                                >
                                    <option>Select Status</option>
                                    <option>Publish</option>
                                    <option>Un-List </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-5">
                    <div className="pb-2">
                        <h2 className="text-lg antialiased font-semibold">Description</h2>
                    </div>
                    {blogDetails?.description && (
                        <BlogEditor
                            content={blogDetails?.description?.replace(/^"(.*)"$/, "$1") || " "}
                            onContentChange={setDescription}
                        />
                    )}
                </div>

                <div className="flex justify-end gap-3 py-5">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 text-blue-600 transition-all duration-200 ease-linear bg-blue-100 border border-blue-300 rounded cursor-pointer hover:border-blue-300 hover:bg-blue-200 dark:border-blue-400"
                    >
                        {updateMutation.isPending ? (
                            <span className="flex items-center justify-center">
                                <Loader title="Saving..." />
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Save
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
