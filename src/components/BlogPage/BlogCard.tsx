import { FilePenLine, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface blogProps { _id: string, image: string, title: string, author: string }

const BlogCard = ({ _id, image, title, author }: blogProps) => {
  return (
    <div>
      <div className="border border-lightBorder dark:border-darkBorder rounded " >
        <div className="p-2 flex items-center justify-center">
          <Image
            src={image}
            alt={title}
            height={300}
            width={300}
            className="w-full h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
          />
        </div>
        <div className="p-5">
          <h3 className="font-medium text-lg mb-1 line-clamp-1" title={title}>{title}</h3>
          <p className="text-gray-500 text-sm mb-4">
            Author: {author}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
            <Link
              href={`/blogList/${_id}`}
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
    </div >
  )
}

export default BlogCard
