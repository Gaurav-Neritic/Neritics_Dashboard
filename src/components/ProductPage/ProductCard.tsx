import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface productDataProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  image: [string];
  listingStatus: boolean;
  handelDelete: () => {}
}

const ProductCard = ({
  _id,
  image,
  title,
  price,
  stock,
  listingStatus,
  handelDelete
}: productDataProps) => {


  return (
    <div className="h-full flex flex-col border border-lightBorder dark:border-darkBorder rounded p-5">
      <img
        width={20}
        height={20}
        alt="image"
        src={image[0] || "/placeholder.jpg"}
        className="w-auto h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
      />
      <div className="flex flex-col flex-grow pb-2">
        <h1 className="mt-2 line-clamp-2 capitalize text-xl font-semibold h-14">
          {title}
        </h1>
        <h1 className="mt-2 text-md font-normal">
          <span className="font-light dark:text-gray-300"> Status </span> :{" "}
          {listingStatus ? "✅ Published " : "❌ Un-Listed"}
        </h1>
        <h1 className="mt-2 text-md font-normal">
          <span className="font-light dark:text-gray-300">Stock</span> :{" "}
          {stock <= 0 ? `❌ ${stock}` : `✅ ${stock}`}
        </h1>
        <h1 className="mt-2 text-md font-semibold">
          <span className="font-light dark:text-gray-300">Price</span> : ₹
          {price}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
        <Link
          href={`/productList/${_id}`}
          className="flex justify-center items-center gap-2 text-green-500 hover:text-green-600 bg-green-100 hover:bg-green-200 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm"
        >
          <FilePenLine className="h-5 w-5 cursor-pointer" />
          Edit
        </Link>
        <button
          type="button"
          onClick={handelDelete}
          className="flex justify-center items-center gap-2 bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm cursor-pointer bg-red-2"
        >
          <Trash2 className="h-5 w-5 cursor-pointer" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
