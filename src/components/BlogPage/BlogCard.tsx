"use client";
import { FilePenLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DeleteBlogPoup from "../Popups/DeleteBlogPopup";
interface blogProps {
  _id: string;
  image: string;
  title: string;
  author: string;
  publish: boolean
}

const BlogCard = ({ _id, image, title, author, publish }: blogProps) => {
  const [deletePopup, setDeletePopup] = useState(false);
  return (
    <div>
      <div className="p-5 border rounded border-lightBorder dark:border-darkBorder">
        <div className="flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            height={300}
            width={300}
            className="w-full h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
          />
        </div>
        <div className="flex flex-col items-start justify-center py-2 gap-y-1">
          <h3 className="my-2 mt-2 text-xl font-semibold capitalize line-clamp-2" title={title}>
            {title}
          </h3>
          <h1 className="font-medium text-md"> <span className="font-light dark:text-gray-300">Author:</span> {`✍️ ${author}`}</h1>
          <h1 className="font-medium text-md"><span className="font-light dark:text-gray-300">Status:</span> {publish ? "🟢 Live " : "🔴 Un-Listed"}</h1>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
          <Link
            href={`/blogList/${_id}`}
            className="flex items-center justify-center w-full gap-2 p-2 text-sm text-green-500 bg-green-100 border rounded hover:text-green-600 hover:bg-green-200 border-lightBorder dark:border-darkBorder">
            <FilePenLine className="w-5 h-5 cursor-pointer" />
            Edit
          </Link>
          <button
            onClick={() => {
              setDeletePopup(true);
            }}
            type="button"
            className="w-full p-2 text-sm text-red-500 bg-red-100 border rounded cursor-pointer hover:bg-red-200 hover:text-red-600 border-lightBorder dark:border-darkBorder bg-red-2"
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 className="w-5 h-5 cursor-pointer" />
              Delete
            </span>
          </button>

          {
            <DeleteBlogPoup
              id={_id}
              isVisible={deletePopup}
              onClose={() => {
                setDeletePopup(false);
              }}
              blogTitle={title}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
