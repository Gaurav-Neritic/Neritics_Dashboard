import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";

import React from "react";

const ProductCard = () => {
  return (
    <div className="  p-5">
      <div
        className=" h-screen border border-lightBorder dark:border-darkBorder rounded
        "
      >
        <div className="p-5">
          <h1 className="text-2xl font-semibold ">Product Details</h1>
        </div>
        <div className=" p-5 grid grid-cols-4 gap-4 ">
          {/* card 1 */}
          <div className=" p-2 border border-lightBorder dark:border-darkBorder rounded">
            <img
              src="/images/1.png"
              alt="image"
              className="w-[450px] h-[250px] object-cover bg-gray-100 dark:bg-neutral-700  border border-lightBorder dark:border-darkBorder rounded"
            />
            <h1 className="mt-2  text-sm">Nerileum – Herbal Pain Relief Oil</h1>
            <h1 className="mt-2 text-md font-bold">₹329.00</h1>
            <div className="grid grid-cols-2 gap-2 items-center mt-4">
              <Link
                href="/"
                className=" flex justify-center items-center gap-2 text-green-400 hover:text-green-500 p-1 border border-lightBorder dark:border-darkBorder rounded   text-sm"
              >
                <FilePenLine className="h-5 w-5 cursor-pointer" />
                Edit
              </Link>
              <button className="flex justify-center items-center gap-2 text-red-400 hover:text-red-500 p-1 border border-lightBorder dark:border-darkBorder rounded text-sm">
                <Trash2 className="h-5 w-5  cursor-pointer" />
                Delete
              </button>
            </div>
          </div>
          {/* card 2 */}
          <div className=" p-2 border border-lightBorder dark:border-darkBorder rounded">
            <img
              src="/images/2.png"
              alt="image"
              className="w-[450px] h-[250px]  object-cover bg-gray-100 dark:bg-neutral-700  border border-lightBorder dark:border-darkBorder rounded"
            />
            <h1 className="mt-2 text-sm">Multivit Tabletsl</h1>
            <h1 className="mt-2 text-md font-bold">₹599.00</h1>
            <div className="grid grid-cols-2 gap-2 items-center mt-4">
              <Link
                href="/"
                className=" flex justify-center items-center gap-2 text-green-400 hover:text-green-500 p-1 border border-lightBorder dark:border-darkBorder rounded  text-sm "
              >
                <FilePenLine className="h-5 w-5 cursor-pointer" />
                Edit
              </Link>
              <button className="flex justify-center items-center gap-2 text-red-400 hover:text-red-500 p-1 border border-lightBorder dark:border-darkBorder rounded text-sm">
                <Trash2 className="h-5 w-5  cursor-pointer " />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
