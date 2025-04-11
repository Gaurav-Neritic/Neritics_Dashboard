"use client";
import React, { useEffect, useState } from "react";
import { LayoutGrid, List, Trash2, FilePenLine, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BlogCard from "@/components/BlogPage/BlogCard";
import DeleteBlogPoup from "@/components/Popups/DeleteBlogPopup";
import Loader from "@/components/Loaders/Loader";

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
      setFilteredBlogs(blogs);
    }
  }, [filter]);

  useEffect(() => {
    setFilteredBlogs(blogs);
  }, [blogs.length]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center py-5">
        <div>
          <h1 className="text-xl uppercase font-semibold">Blog Lists</h1>
        </div>
        <div className="flex items-center justify-center gap-3">

          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by blog title..."
            className="py-2 px-4 border border-gray-300 dark:border-darkBorder rounded dark:bg-neutral-700 outline-none text-sm"
          />
          <select className="p-2 px-4 border border-gray-300 dark:border-darkBorder rounded appearance-auto text-sm bg-transparent outline-none"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option>🌏 All</option>
            <option>🟢 Live</option>
            <option>🔴 UnListed</option>
          </select>
          <div>
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
        </div>
      </div>

      {/* List View */}
      <div className={`p-5 border border-lightBorder rounded `}>
        <div className={`w-full rounded border border-lightBorder dark:border-darkBorder ${viewMode === "list" ? "block" : "hidden"}`} >
          {/* Header */}
          <div className=" px-5 py-1 flex w-full justify-between items-center border-b border-lightBorder dark:border-darkBorder">
            <div className="p-2 w-2/12 font-medium text-center">Blog Id</div>
            <div className="p-2 w-3/12 font-medium text-center">Title</div>
            <div className="p-2 w-2/12 font-medium text-center">Author</div>
            <div className="p-2 w-2/12 font-medium text-center">Image</div>
            <div className="p-2 w-1/12 font-medium text-center">Publish</div>
            <div className="p-2 w-2/12 text-center font-medium">Actions</div>
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
          {/* Blog items */}
          {filteredBlogs.map((blog: any) => (
            <div
              key={blog?._id}
              className="p-3 flex w-full justify-center items-center border-b border-lightBorder dark:border-darkBorder "
            >
              <div className="px-2  w-2/12 truncate text-gray-500 dark:text-gray-50 text-center ">
                {blog._id}
              </div>
              <div className="px-2 w-3/12 text-gray-500 dark:text-gray-50 line-clamp-2 text-md ">
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
                  <button
                    onClick={() => {
                      setBlogID(blog?._id);
                      setDeletePopup(true);
                    }}
                    className="text-red-400 hover:text-red-500"
                  >
                    <Trash2 className="text-sm cursor-pointer" />
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
          <div className="grid grid-cols-3 gap-5">
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
