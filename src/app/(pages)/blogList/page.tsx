"use client";
import React, { useState } from "react";
import { LayoutGrid, List, Edit, Trash2, FilePenLine } from "lucide-react";
import Link from "next/link";

const BlogList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [blogs, setBlogs] = useState([
    {
      id: "67ee3a36a9fb2aa47522c857",
      title: "Mental Wellness Practices for a Healthy Life",
      author: "Sanket Pathare",
      image: "/Blog.jpg",
      publish: "🟢",
    },
    {
      id: "67ee3a36a9fb2aa47522c857",
      title: "Getting Started with React Hooks",
      author: "Sanket Pathare",
      image: "/Blog.jpg",
      publish: "🔴",
    },
    {
      id: "67ee3a36a9fb2aa47522c857",
      title: "Getting Started with React Hooks",
      author: "Sanket Pathare",
      image: "/Blog.jpg",
      publish: "🔴",
    },
  ]);

  return (
    <div className="p-5  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl uppercase font-semibold">Blog Lists</h1>
        </div>
        <div className="flex items-center gap-2 rounded-lg p-1">
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded  border border-lightBorder dark:border-darkBorder cursor-pointer   ${
              viewMode === "list" ? "" : ""
            }`}
          >
            <List className="h-[20px] w-[20px]" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded   border border-lightBorder dark:border-darkBorder cursor-pointer ${
              viewMode === "card" ? "" : ""
            }`}
          >
            <LayoutGrid className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className=" w-full rounded border border-lightBorder dark:border-darkBorder ">
          {/* Header */}
          <div className=" px-5 flex w-full justify-between items-center border-b border-lightBorder dark:border-darkBorder">
            <div className="p-2 w-2/12 font-medium text-center">Blog Id</div>
            <div className="p-2 w-4/12 font-medium text-center">Title</div>
            <div className="p-2 w-2/12 font-medium text-center">Author</div>
            <div className="p-2 w-2/12 font-medium text-center">Image</div>
            <div className="p-2 w-1/12 font-medium text-center">Publish</div>
            <div className="p-2 w-2/12 text-center font-medium">Actions</div>
          </div>

          {/* Blog items */}
          {blogs.map((blog) => (
            <div className=" px-5 flex w-full justify-center items-center border-b border-lightBorder dark:border-darkBorder ">
              <div className="p-2  w-2/12 truncate text-gray-500 dark:text-gray-50 text-center ">
                {blog.id}
              </div>
              <div className="p-2 w-4/12 text-gray-500 dark:text-gray-50 line-clamp-2 text-md ">
                {blog.title}
              </div>
              <div className="p-2 w-2/12 text-gray-500 dark:text-gray-50 text-center">
                {blog.author}
              </div>
              <div className="p-2 w-2/12 flex justify-center items-center">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-14 h-10 object-cover rounded"
                />
              </div>
              <div className="p-4 w-1/12 text-center">{blog.publish}</div>
              <div className="p-4 w-2/12">
                <div className="flex justify-center space-x-2">
                  <Link
                    href={``}
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
      )}

      {/* Card View */}
      {viewMode === "card" && (
        <div className="h-full flex flex-col border border-lightBorder dark:border-darkBorder rounded p-5">
          <div className="grid grid-cols-3 gap-5">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-lightBorder dark:border-darkBorder rounded "
              >
                <div className="p-2 flex items-center justify-center">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className=" w-auto h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-lg mb-1">{blog.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Author: {blog.author}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
                    <Link
                      href={``}
                      className="w-full  flex justify-center items-center gap-2 text-green-500 hover:text-green-600 bg-green-100 hover:bg-green-200 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm"
                    >
                      <FilePenLine className="h-5 w-5 cursor-pointer" />
                      Edit
                    </Link>
                    <button
                      type="button"
                      className=" w-full bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm cursor-pointer bg-red-2"
                    >
                      <span className="flex justify-center items-center gap-2">
                        <Trash2 className="h-5 w-5 cursor-pointer" />
                        Delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {blogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No blog posts available</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
