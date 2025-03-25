import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";

import React from "react";

interface productDataProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  image: [string];
  listingStatus: boolean;
}

const ProductCard = ({
  image,
  title,
  price,
  stock,
  listingStatus,
}: productDataProps) => {
  return (
    <div>
      {/* card 1 */}
      <div className="p-2 border border-lightBorder dark:border-darkBorder rounded h-full">
        <img
          src={image[0]}
          alt="image"
          className="w-[500px] h-[250px] object-cover bg-gray-100 dark:bg-neutral-700  border border-lightBorder dark:border-darkBorder rounded"
        />
        <h1 className="mt-2 line-clamp-2 capitalize">{title}</h1>
        <h1 className="mt-2 text-md font-semibold">₹{price}</h1>
        <h1 className="mt-2 text-md font-semibold">
          Status : {listingStatus ? "Published ✔️" : "UnListed ❌"}
        </h1>
        <div className="grid grid-cols-2 gap-2 mt-4 content-end">
          <Link
            href="/"
            className=" flex justify-center items-center gap-2 text-green-400 hover:text-green-500 p-1 border border-lightBorder dark:border-darkBorder rounded   text-sm"
          >
            <FilePenLine className="h-5 w-5 cursor-pointer" />
            Edit
          </Link>
          <button className="flex justify-center items-center gap-2 text-red-400 hover:text-red-500 p-1 border border-lightBorder dark:border-darkBorder rounded text-sm cursor-pointer">
            <Trash2 className="h-5 w-5  cursor-pointer" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
