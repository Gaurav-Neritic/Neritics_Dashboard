"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid, List, Trash2, FilePenLine } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "@/components/BlogPage/BlogCard";
import DeleteBlogPoup from "@/components/Popups/DeleteBlogPopup";
import Loader from "@/components/Loaders/Loader";
import Image from "next/image";

interface blogInfo {
  _id: string,
  title: string,
  description: string,
  author: string,
  image: string,
  publish: boolean
}

const BlogList = () => {
  const [viewMode, setViewMode] = useState("list");
  const [deletePopup, setDeletePopup] = useState(false);
  const [blogID, setBlogID] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filter, setFilter] = useState("")

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
    const filtered = blogs.filter(
      (blog: blogInfo) =>
        blog.title.toLowerCase().includes(text.toLowerCase()) ||
        blog.author.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBlogs(filtered);
  };

  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryFn: getBlogs,
    queryKey: ["blogs"],
  });

  useEffect(() => {
    if (filter === "🟢 Live") {
      setFilteredBlogs(
        blogs.filter((blog: blogInfo) => blog.publish === true)
      );
    } else if (filter === "🔴 UnListed") {
      setFilteredBlogs(
        blogs.filter((blog: blogInfo) => blog.publish === false)
      );
    } else {
      if (blogs.length > 0) {
        setFilteredBlogs(blogs);
      }
    }


  }, [filter, blogs]);


  return (
    <div className="p-5">
      <h1 className="hidden py-5 text-2xl font-semibold uppercase max-sm:block">All - Blogs</h1>
      <div className="flex items-center justify-between py-5 text-wrap">
        <div>
          <h1 className="py-5 text-2xl font-semibold uppercase lg:text-xl lg:py-0 max-sm:hidden">All - Blogs</h1>
        </div>

        <div className="grid grid-cols-[3fr_1fr_0.5fr] max-md:grid-cols-[3fr_1fr] gap-3 max-lg:grid-cols-[3fr_1fr] max-sm:grid-cols-2 max-sm:w-full max-md:place-items-end ">

          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by blog title..."
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded outline-none dark:border-darkBorder dark:bg-neutral-700"
          />
          <select className="p-2 px-4 text-sm bg-transparent border border-gray-300 rounded outline-none dark:border-darkBorder appearance-auto"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option className="dark:text-darkMode">🌏 All</option>
            <option className="dark:text-darkMode">🟢 Live</option>
            <option className="dark:text-darkMode">🔴 UnListed</option>
          </select>
          <div className="hidden gap-3 lg:flex">
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
      </div>

      <div className="flex items-end justify-end w-full gap-3 pb-4 lg:hidden">
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

      {/* List View */}
      <div className={`p-0 md:p-4 border border-lightBorder dark:border-darkBorder rounded text-sm`}>
        <div className={`w-full rounded border border-lightBorder dark:border-darkBorder ${viewMode === "list" ? "block" : "hidden"}`} >
          {/* Header */}
          <div className="flex items-center justify-between w-full p-2 border-b last:border-b-0 border-lightBorder dark:border-darkBorder">
            <div className="hidden w-2/12 p-2 font-medium md:block">Blog Id</div>
            <div className="w-3/12 p-2 font-medium truncate text-start">Title</div>
            <div className="w-3/12 p-2 font-medium truncate text-start">Author</div>
            <div className="w-2/12 p-2 font-medium truncate text-start">Image</div>
            <div className="w-1/12 p-2 font-medium truncate text-start">Status</div>
            <div className="w-2/12 p-2 font-medium truncate text-start">Actions</div>
          </div>
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader title="Fetching...." />
            </div>
          )}
          {isError && (
            <div className="flex items-center justify-center py-10">
              <h1>Something Went Wrong...</h1>
            </div>
          )}
          {!isLoading && filteredBlogs?.length <= 0 && (
            <div className="flex flex-col items-center justify-start gap-5 py-10 font-semibold uppercase ">
              <h1 className="text-2xl"> No Blogs !</h1>
              <div>
                <Link
                  href={"/addBlog"}
                  className="text-teal-800 underline capitalize rounded underline-offset-2 hover:underline-offset-4"
                >
                  Add One
                </Link>
              </div>
            </div>
          )}
          {/* Blog items */}
          {filteredBlogs.map((blog: blogInfo) => (
            <div
              key={blog?._id}
              className="flex items-center justify-start w-full gap-3 p-2 border-b last:border-b-0 border-lightBorder dark:border-darkBorder"
            >
              <div className="hidden w-2/12 px-2 text-gray-500 truncate dark:text-gray-50 text-start md:block">
                {blog._id}
              </div>



              <div className="w-3/12 px-2 text-gray-500 dark:text-gray-50 line-clamp-1 lg:line-clamp-2 text-start ">
                {blog.title}
              </div>



              <div className="w-3/12 px-2 text-gray-500 capitalize dark:text-gray-50 line-clamp-1">
                {blog.author}
              </div>


              <div className="flex items-start w-2/12 px-2">
                <Image
                  loading="lazy"
                  src={blog.image}
                  alt={blog.title}
                  height={200}
                  width={200}
                  className="object-cover w-10 h-10 rounded"
                />
              </div>


              <div className="flex w-1/12 px-4 text-sm md:text-md">
                {blog.publish ? "🟢" : "🔴"}
              </div>
              <div className="items-start justify-start w-2/12 px-2 ">
                <div className="flex items-start justify-start gap-2">
                  <Link
                    href={`/blogList/${blog?._id}`}
                    className="text-green-400 hover:text-green-500"
                  >
                    <FilePenLine className="w-5 h-5 cursor-pointer md:w-auto md:h-auto" />
                  </Link>
                  <button
                    onClick={() => {
                      setBlogID(blog?._id);
                      setDeletePopup(true);
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5 cursor-pointer md:w-auto md:h-auto" />
                  </button>
                  {
                    <DeleteBlogPoup
                      id={blogID}
                      isVisible={deletePopup}
                      onClose={() => {
                        setDeletePopup(false);
                      }}
                      blogTitle={blog?.title}
                    />
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card View */}

        <div
          className={`h-full flex flex-col  ${viewMode === "card" ? "block" : "hidden"
            } `}
        >
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <Loader title="Fetching...." />
            </div>
          )}
          {isError && (
            <div className="flex items-center justify-center py-10">
              <h1>Something Went Wrong...</h1>
            </div>
          )}
          {!isLoading && filteredBlogs?.length <= 0 && (
            <div className="flex flex-col items-center justify-center gap-5 py-10 font-semibold uppercase ">
              <h1 className="text-2xl"> No Blogs !</h1>
              <div>
                <Link
                  href={"/addBlog"}
                  className="text-teal-800 underline capitalize rounded underline-offset-2 hover:underline-offset-4"
                >
                  Add One
                </Link>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 lg:p-0">
            {filteredBlogs.map((blog: blogInfo) => (
              <div key={blog?._id}>
                <BlogCard
                  _id={blog?._id}
                  image={blog.image}
                  title={blog?.title}
                  author={blog?.author}
                  publish={blog?.publish}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default BlogList;
