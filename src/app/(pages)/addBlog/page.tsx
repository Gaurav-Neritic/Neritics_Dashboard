"use client";
import Link from "next/link";
import { Eraser, Files, FileText } from "lucide-react";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Editor from "@/components/BlogPage/Editor";
import Input from "@/components/ProductForm/Input";
import Loader from "@/components/Loaders/Loader";
import Image from "next/image";

const AddBlogsPage = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
  });
  const [description, setDescription] = useState({});
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish, setPublish] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  const handelChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setBlogData({ ...blogData, [name]: value });
  };

  async function addBlog() {
    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("author", blogData.author);
    formData.append("blogImage", blogImage || "");
    formData.append("description", JSON.stringify(description || {}));
    formData.append("publish", publish);
    try {
      setIsLoading(true);
      const response = await axios.post("api/addBlog", formData);
      if (response.data.data) {
        setIsLoading(false);
        toast.success("Blog Added!");
        return response.data.data;
      } else {
        setIsLoading(false);
        console.log("Data Addition Failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error adding blog : ", error);
      toast.error("Error adding blog");
    }
  }

  const addBlogMutation = useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      clearFields();
      router.push("/blogList");
    },
  });

  const clearFields = () => {
    setBlogData({ title: "", author: "" });
    setBlogImage(null);
    setDescription({});
  };

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (publish === "Select Status" || publish.trim() === "") {
      return toast.success("Select publishing status", {
        icon: "▄︻テ══‐一💥",
      });
    }
    addBlogMutation.mutate();
  };

  const getPreviewUrl = (file: File | null) => {
    return file ? URL.createObjectURL(file) : null;
  };

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3 py-5">
          <div className="p-1 border border-gray-500 rounded">
            <FileText />
          </div>
          <div className="py-5">
            <p className="text-sm font-normal text-gray-500">
              All the fields are required
            </p>
            <h1 className="text-3xl font-semibold">Add A New Blog</h1>
          </div>
        </div>

        <div className="hidden lg:block">
          <Link
            href={"/blogList"}
            className="flex items-center justify-center gap-2 px-4 py-2 text-gray-500 transition-all duration-200 ease-linear border border-gray-300 rounded cursor-pointer dark:text-white dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <Files />
            View Blogs
          </Link>
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
                <Input
                  name="title"
                  value={blogData.title}
                  placeholder="Enter Blog Title"
                  onChange={handelChange}
                />
              </div>
              <div className="w-full">
                <label>Blog Author:</label>
                <Input
                  name="author"
                  value={blogData.author}
                  placeholder="Enter Blog Author"
                  onChange={handelChange}
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
                <label>Blog Image:</label>
                <br />
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBlogImage(e.target.files?.[0] || null);
                  }}
                  required
                  className="w-full text-gray-700 my-2 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-[9.3px] file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                />
                {blogImage && (
                  <Image
                    src={getPreviewUrl(blogImage) || ""}
                    alt="Main Image Preview"
                    loading="lazy"
                    height={200}
                    width={200}
                    className="object-cover w-20 h-20 p-1 mt-2 bg-gray-100 rounded-full dark:bg-neutral-700"
                  />
                )}
              </div>
              <div>
                <label>Publishing Status:</label>
                <select
                  value={publish}
                  onChange={(e) => setPublish(e.target.value)}
                  className="w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-[9px] rounded text-gray-400 mt-2 dark:bg-darkMode"
                >
                  <option>Select Status</option>
                  <option>Publish</option>
                  <option>Un-List</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="pb-2">
            <h2 className="text-lg antialiased font-semibold">Description</h2>
          </div>
          <Editor description={setDescription} />
        </div>

        <div className="flex justify-end gap-3 py-5">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 text-blue-600 transition-all duration-200 ease-linear bg-blue-100 border border-blue-300 rounded cursor-pointer hover:border-blue-300 hover:bg-blue-200 dark:border-blue-400"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader title="Adding..." />
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Add Blog
              </span>
            )}
          </button>
          <button
            type="reset"
            onClick={() => {
              clearFields();
              toast.success("Fields Cleared");
            }}
            className="px-4 py-2 text-red-500 transition-all duration-200 ease-linear bg-red-100 border border-red-300 rounded cursor-pointer hover:border-red-300 hover:bg-red-200 dark:border-red-400"
          >
            <span className="flex items-center justify-center gap-2">
              <Eraser />
              Clear Fields
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogsPage;
