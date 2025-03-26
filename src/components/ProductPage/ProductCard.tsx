import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import DeletePoup from "../DeletePoup";

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
  _id,
  image,
  title,
  price,
  category,
  stock,
  listingStatus,
}: productDataProps) => {
  const [deletePopup, setDeletePopup] = useState(false);
  return (
    <div className="h-full flex flex-col border border-lightBorder dark:border-darkBorder rounded p-2">
      <img
        src={image[0]}
        alt="image"
        className="w-[500px] h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
      />
      <div className="flex flex-col flex-grow pb-2">
        <h1 className="mt-2 line-clamp-2 capitalize font-semibold">{title}</h1>
        <h1 className="mt-2 text-md font-normal">
          <span className="font-light"> Status </span> :{" "}
          {listingStatus ? "✅ Published " : "❌ Un-Listed"}
        </h1>
        <h1 className="mt-2 text-md font-normal">
          <span className="font-light">Stock</span> :{" "}
          {stock <= 0 ? `❌ ${stock}` : `✅ ${stock}`}
        </h1>
        <h1 className="mt-2 line-clamp-2 capitalize font-normal">
          <span className="font-light">Category</span> : {category}
        </h1>
        <h1 className="mt-2 text-md font-semibold">Price : ₹{price}</h1>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
        <Link
          href={`/productList/${_id}`}
          className="flex justify-center items-center gap-2 text-green-500 hover:text-green-600 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm"
        >
          <FilePenLine className="h-5 w-5 cursor-pointer" />
          Edit
        </Link>
        <button
          onClick={() => setDeletePopup(true)}
          className="flex justify-center items-center gap-2 text-red-500 hover:text-red-600 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm cursor-pointer"
        >
          <Trash2 className="h-5 w-5 cursor-pointer" />
          Delete
        </button>
      </div>
      {
        <DeletePoup
          isVisible={deletePopup}
          prodId={_id}
          prodName={title}
          onClose={() => {
            setDeletePopup(false);
          }}
        />
      }
    </div>
  );
};

export default ProductCard;
