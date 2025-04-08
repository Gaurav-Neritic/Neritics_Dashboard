"use client";
import Link from "next/link";
import { Eraser, Files, FileText } from "lucide-react";
import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { common, createLowlight } from "lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import Toolbar from "@/components/BlogPage/Toolbar";

const lowlight = createLowlight(common);

const AddBlogsPage = () => {
  const [description, setDescription] = useState({});
  const editor = useEditor({
    content: "",
    onUpdate: ({ editor }) => {
      setDescription(editor.getJSON());
      console.log("Description is : ", description);
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Underline,
      Italic,
      Bold,
      Code,
      Strike,
      History,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write something here...",
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TextStyle,
      Color,
      BulletList,
      OrderedList,
    ],
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full p-5 dark:text-white border border-lightBorder dark:border-darkBorder rounded text-black mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
  });

  console.log("Description is : ", description);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
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
        {/* View Button */}
        <div>
          <Link
            href={"/blogList"}
            className="px-4 py-2 border rounded border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
          >
            <Files />
            View Blogs
          </Link>
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
            <div className="grid grid-cols gap-10 ">
              <div className="">
                <label>Blog Image:</label>
                <br />
                <input
                  type="file"
                  required
                  className=" text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder  file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode  dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500 "
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
          <Toolbar editor={editor} />
          <EditorContent
            editor={editor}
            className="p-4 border border-lightBorder dark:border-darkBorder rounded "
          />
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

export default AddBlogsPage;
