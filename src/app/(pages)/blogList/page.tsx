"use client";
import React, { useState } from "react";
import { LayoutGrid, List, Trash2, FilePenLine } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "@/components/BlogPage/BlogCard";

const BlogList = () => {
  const [viewMode, setViewMode] = useState("list");

  async function getBlogs() {
    try {
      const response = await axios.get("api/getBlogs");

      if (response.data.data) {
        return response.data.data;
      } else {
        console.log("Error fetching blogs");
      }
      return [];
    } catch (error) {
      console.log("Error fetching blogs", error);
      return [];
    }
  }

  const { data: blogs = [] } = useQuery({
    queryFn: getBlogs,
    queryKey: ["blogs"],
  });

  return (
    <div className="p-5  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl uppercase font-semibold">Blog Lists</h1>
        </div>
        <div className="flex items-center gap-2 rounded-lg p-1">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded border border-lightBorder dark:border-darkBorder cursor-pointer `}
          >
            <LayoutGrid className="h-[20px] w-[20px]" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded border border-lightBorder dark:border-darkBorder cursor-pointer`}
          >
            <List className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>

      {/* List View */}

      <div
        className={` w-full rounded border border-lightBorder dark:border-darkBorder ${
          viewMode === "list" ? "block" : "hidden"
        }`}
      >
        {/* Header */}
        <div className=" px-5 flex w-full justify-between items-center border-b border-lightBorder dark:border-darkBorder">
          <div className="p-2 w-2/12 font-medium text-center">Blog Id</div>
          <div className="p-2 w-3/12 font-medium text-center">Title</div>
          <div className="p-2 w-2/12 font-medium text-center">Author</div>
          <div className="p-2 w-2/12 font-medium text-center">Image</div>
          <div className="p-2 w-1/12 font-medium text-center">Publish</div>
          <div className="p-2 w-2/12 text-center font-medium">Actions</div>
        </div>

        {/* Blog items */}
        {blogs.map((blog: any) => (
          <div
            key={blog?._id}
            className=" p-2 flex w-full justify-center items-center border-b border-lightBorder dark:border-darkBorder "
          >
            <div
              className="p-2  w-2/12 truncate text-gray-500 dark:text-gray-50 text-center "
              title={blog._id}
            >
              {blog._id}
            </div>
            <div
              className="px-2 w-3/12 text-gray-500 dark:text-gray-50 line-clamp-2 text-md "
              title={blog.title}
            >
              {blog.title}
            </div>
            <div className="px-2 w-2/12 text-gray-500 dark:text-gray-50 text-center capitalize">
              {blog.author}
            </div>
            <div className="px-2 w-2/12 flex justify-center items-center">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-14 h-10 object-cover rounded"
              />
            </div>
            <div className="px-4 w-1/12 text-center">
              {blog.publish ? "🟢" : "🔴"}
            </div>
            <div className="px-4 w-2/12">
              <div className="flex justify-center space-x-2">
                <Link
                  href={`/blogList/${blog?._id}`}
                  className="text-green-400 hover:text-green-500"
                >
                  <FilePenLine className="text-sm cursor-pointer" />
                </Link>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm cursor-pointer" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card View */}

      <div
        className={`h-full flex flex-col border border-lightBorder dark:border-darkBorder rounded p-5 ${
          viewMode === "card" ? "block" : "hidden"
        } `}
      >
        <div className="grid grid-cols-3 gap-5">
          {blogs.map((blog: any) => (
            <div key={blog?._id}>
              <BlogCard
                _id={blog?._id}
                image={blog.image}
                title={blog?.title}
                author={blog?.author}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {blogs.length === 0 && (
          <div className="place-items-center  border rounded border-lightBorder my-2 dark:border-darkBorder  uppercase text-gray-500 font-semibold py-10">
          <h1>No Blogs to display</h1>
        </div>
      )}
    </div>
  );
};

export default BlogList;
