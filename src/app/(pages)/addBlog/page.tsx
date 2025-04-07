import { Eraser, FileText } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="p-5">
      {/* Page Title */}
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

      {/* Blog Form  */}
      <form>
        {/* grid - 1 */}
        <div>
          <div className="pb-2">
            <h2 className="text-lg font-semibold antialiased">
              Blog Title & Author
            </h2>
          </div>
          <div
            className="  p-4  border rounded 
        border-lightBorder dark:border-darkBorder "
          >
            <div className="grid grid-cols-2 gap-10 ">
              {/* title */}
              <div className="w-full">
                <label className="">Blog Title:</label>
                <input
                  type="text"
                  required
                  placeholder=" Enter Blog Title "
                  className=" w-full  py-3 px-2 border rounded 
        border-lightBorder dark:border-darkBorder outline-none "
                />
              </div>
              <div className="w-full">
                <label>Blog Author:</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Blog Author"
                  className=" w-full py-3 px-2 border rounded 
        border-lightBorder dark:border-darkBorder outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        {/* grid - 2 */}
        <div className="my-5">
          <div className="pb-2">
            <h2 className="text-lg font-semibold antialiased">Blog Images</h2>
          </div>
          <div
            className="  p-4  border rounded 
        border-lightBorder dark:border-darkBorder "
          >
            <div className="grid grid-cols-2 gap-10 ">
              <div className="">
                <label>Blog Image 1:</label>
                <input
                  type="file"
                  required
                  className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder  file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode  dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500 "
                />
              </div>

              <div className="">
                <label>Blog Image 2:</label>
                <input
                  type="file"
                  required
                  className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder  file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode  dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* grid -3 */}
        <div className="my-5">
          <div className="pb-2">
            <h2 className="text-lg font-semibold antialiased">Description</h2>
          </div>
          <div
            className="  p-4  border rounded 
        border-lightBorder dark:border-darkBorder "
          >
            <div className="grid grid-cols gap-10 ">
              {/* title */}
              <div className="w-full">
                <label>Blog Description:</label>
                <textarea
                  required
                  placeholder=" Enter Blog Description"
                  className=" w-full  py-3 px-2 border rounded 
        border-lightBorder dark:border-darkBorder outline-none "
                  rows={5}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Add Blog Button */}
        <div className="py-5 flex gap-3 justify-end">
          <button
            type="submit"
            className="px-4 border border-blue-300 hover:border-blue-300 hover:bg-blue-200 rounded bg-blue-100 text-blue-600 transition-all ease-linear duration-200 cursor-pointer dark:border-blue-400"
          >
            <span className="flex items-center justify-center gap-2">
              Add Blog
            </span>
          </button>
          <button
            type="reset"
            className="px-4 py-2 border border-red-300 hover:border-red-300 hover:bg-red-200 rounded bg-red-100 text-red-500 transition-all ease-linear duration-200 cursor-pointer dark:border-red-400"
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

export default page;
