"use client";
import Link from "next/link";
import { Eraser, Files, FileText } from "lucide-react";
import React, { FormEvent, useState } from "react";
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
import Input from "@/components/ProductForm/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loaders/Loader";

const lowlight = createLowlight(common);

const AddBlogsPage = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
  });
  const [description, setDescription] = useState({});
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publish, setPublish] = useState("");
  const router = useRouter();

  const editor: any = useEditor({
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDescription(editor.getJSON());
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

  const handelChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setBlogData({ ...blogData, [name]: value });
  };

  async function addBlog() {
    const formData = new FormData();

    formData.append("title", blogData.title);
    formData.append("author", blogData.author);
    if (blogImage) formData.append("blogImage", blogImage || "");
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
      clearFields();
    },
  });

  const clearFields = () => {
    console.log("clicked");
    blogData.title = "";
    blogData.author = "";
    setBlogImage(null);
    editor.commands.clearContent(true);
  };

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (publish === "Select Status" || publish.trim() === "") {
      return toast.success("Select publishing status", {
        icon: "▄︻テ══‐一💥",
      });
    }
    addBlogMutation.mutate();
    router.push("/blogList");
  };

  addBlogMutation.isError ? toast.error("Something went wrong") : "";

  // Image Preview
  const getPreviewUrl = (file: File | null) => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
  };

  return (
    <div className="px-5">
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
      <form onSubmit={handelSubmit}>
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
                <label>Blog Title:</label>
                <Input
                  name={"title"}
                  value={blogData.title}
                  placeholder={"Enter Blog Title"}
                  onChange={handelChange}
                />
              </div>
              <div className="w-full">
                <label>Blog Author:</label>
                <Input
                  name={"author"}
                  value={blogData.author}
                  placeholder={"Enter Blog Author"}
                  onChange={handelChange}
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
          <div className="p-4 border rounded border-lightBorder dark:border-darkBorder">
            <div className="grid grid-cols-2 gap-10 ">
              <div>
                <label>Blog Image:</label>
                <br />
                <input
                  type="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setBlogImage(e.target.files?.[0] || null);
                  }}
                  required
                  className="w-full text-gray-700 my-2 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-[9.3px] file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral dark:file:text-white dark:hover:file:text-gray-500"
                />
                {blogImage && (
                  <img
                    src={getPreviewUrl(blogImage) || ""}
                    alt="Main Image Preview"
                    className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                  />
                )}
              </div>
              <div>
                <label>Publishing Status:</label>
                <select
                  value={publish}
                  onChange={(e) => {
                    setPublish(e.target.value);
                  }}
                  className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-[9px] rounded text-gray-400 mt-2 dark:bg-darkMode"
                >
                  <option>Select Status</option>
                  <option>Publish</option>
                  <option>Un-List</option>
                </select>
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
            className="p-4 border border-lightBorder dark:border-darkBorder rounded"
          />
        </div>
        {/* Add Blog Button */}
        <div className="py-5 flex gap-3 justify-end">
          <button
            type="submit"
            disabled={isLoading ? true : false}
            className="px-4 border border-blue-300 hover:border-blue-300 hover:bg-blue-200 rounded bg-blue-100 text-blue-600 transition-all ease-linear duration-200 cursor-pointer dark:border-blue-400"
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
