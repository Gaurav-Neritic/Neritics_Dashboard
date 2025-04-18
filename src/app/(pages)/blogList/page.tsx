"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid, List, Trash2, FilePenLine, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "@/components/BlogPage/BlogCard";
import DeleteBlogPoup from "@/components/Popups/DeleteBlogPopup";
import Loader from "@/components/Loaders/Loader";
import Image from "next/image";

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

  const handleSearch = (e: any) => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
    const filtered = blogs.filter(
      (blog: any) =>
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
        blogs.filter((blog: any) => blog.publish === true)
      );
    } else if (filter === "🔴 UnListed") {
      setFilteredBlogs(
        blogs.filter((blog: any) => blog.publish === false)
      );
    } else {
      if (blogs.length > 0) {
        setFilteredBlogs(blogs);
      }
    }


  }, [filter, blogs]);


  return (
    <div className="p-5">
      <h1 className="text-2xl py-5 uppercase font-semibold max-sm:block hidden">All - Blogs</h1>
      <div className="flex items-center justify-between py-5 text-wrap">
        <div>
          <h1 className="text-2xl lg:text-xl lg:py-0 py-5 max-sm:hidden uppercase font-semibold">All - Blogs</h1>
        </div>

        <div className="grid grid-cols-[3fr_1fr_0.5fr] max-md:grid-cols-[3fr_1fr] gap-3 max-lg:grid-cols-[3fr_1fr] max-sm:grid-cols-2 max-sm:w-full max-md:place-items-end ">

          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by blog title..."
            className="py-2 px-4 w-full border border-gray-300 dark:border-darkBorder rounded dark:bg-neutral-700 outline-none text-sm"
          />
          <select className="p-2 px-4 border border-gray-300 dark:border-darkBorder rounded appearance-auto text-sm bg-transparent outline-none"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option className="dark:text-darkMode">🌏 All</option>
            <option className="dark:text-darkMode">🟢 Live</option>
            <option className="dark:text-darkMode">🔴 UnListed</option>
          </select>
          <div className="lg:flex gap-3 hidden">
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

      <div className="flex gap-3 items-end w-full justify-end lg:hidden pb-4">
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
      <div className={`p-0 md:p-4 border border-lightBorder dark:border-darkBorder rounded `}>
        <div className={`w-full rounded border border-lightBorder dark:border-darkBorder ${viewMode === "list" ? "block" : "hidden"}`} >
          {/* Header */}
          <div className="p-2 flex w-full justify-between items-center border-b last:border-b-0  border-lightBorder dark:border-darkBorder">
            <div className="p-2 w-2/12 font-medium hidden md:block">Blog Id</div>
            <div className="p-2 w-3/12 font-medium text-start truncate">Title</div>
            <div className="p-2 w-3/12 font-medium text-start truncate">Author</div>
            <div className="p-2 w-2/12 font-medium text-start truncate">Image</div>
            <div className="p-2 w-1/12 font-medium text-start truncate">Status</div>
            <div className="p-2 w-2/12 text-start font-medium truncate">Actions</div>
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
            <div className="flex flex-col gap-5 items-center justify-start py-10 uppercase font-semibold ">
              <h1 className="text-2xl"> No Blogs !</h1>
              <div>
                <Link
                  href={"/addBlog"}
                  className="text-teal-800 rounded capitalize  underline underline-offset-2 hover:underline-offset-4"
                >
                  Add One
                </Link>
              </div>
            </div>
          )}
          {/* Blog items */}
          {filteredBlogs.map((blog: any) => (
            <div
              key={blog?._id}
              className="p-2 flex w-full justify-start items-center border-b last:border-b-0  border-lightBorder dark:border-darkBorder gap-3"
            >
              <div className="px-2  w-2/12 truncate text-gray-500 dark:text-gray-50 text-start hidden md:block">
                {blog._id}
              </div>



              <div className="px-2 w-3/12 text-gray-500 dark:text-gray-50 line-clamp-1 lg:line-clamp-2 text-start ">
                {blog.title}
              </div>



              <div className="px-2 w-3/12 text-gray-500 dark:text-gray-50 capitalize  line-clamp-1">
                {blog.author}
              </div>


              <div className="px-2 w-2/12 flex items-start">
                <Image
                  loading="lazy"
                  src={blog.image}
                  alt={blog.title}
                  height={100}
                  width={100}
                  className="w-10 h-10  object-cover rounded"
                />
              </div>


              <div className="px-4 w-1/12 flex text-sm md:text-xl">
                {blog.publish ? "🟢" : "🔴"}
              </div>
              <div className="px-2  w-2/12 items-start justify-start ">
                <div className="flex justify-start items-start gap-2">
                  <Link
                    href={`/blogList/${blog?._id}`}
                    className="text-green-400 hover:text-green-500"
                  >
                    <FilePenLine className="h-5 w-5 md:w-auto md:h-auto cursor-pointer" />
                  </Link>
                  <button
                    onClick={() => {
                      setBlogID(blog?._id);
                      setDeletePopup(true);
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5 md:w-auto md:h-auto cursor-pointer" />
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
            <div className="flex flex-col gap-5 items-center justify-center py-10 uppercase font-semibold ">
              <h1 className="text-2xl"> No Blogs !</h1>
              <div>
                <Link
                  href={"/addBlog"}
                  className="text-teal-800 rounded capitalize  underline underline-offset-2 hover:underline-offset-4"
                >
                  Add One
                </Link>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 lg:p-0  gap-5">
            {filteredBlogs.map((blog: any) => (
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
