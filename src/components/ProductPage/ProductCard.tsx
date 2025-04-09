import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FilePenLine, LoaderCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";
import Image from "next/image";

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
  stock,
  listingStatus,
}: productDataProps) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductsData"] });
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handelDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      console.log("Id to delete ", id);
      const response = await axios.delete("api/deleteProduct", {
        data: { id },
        fetchOptions: { cache: "no-store" },
      });

      if (response.data.data) {
        setLoading(false);
        toast.success("Product Deleted Successfully");
        return response.data.data;
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Deleting the product", error);
      toast.error("Error: Try after few minutes");
    }
  }

  return (
    <div className="h-full flex flex-col border border-lightBorder dark:border-darkBorder rounded p-5">
      {isError && <div className="p-5 flex items-center justify-center">
        <h1>Something Went Wrong</h1>
      </div>}
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
          onClick={(e) => {
            e.preventDefault();
            handelDelete(_id);
          }}
          className=" bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-600 p-2 border border-lightBorder dark:border-darkBorder rounded text-sm cursor-pointer bg-red-2"
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2 animate-spin">
              <LoaderCircle className="h-5 w-5 cursor-pointer" />
              Deleting...
            </span>
          ) : (
            <span className="flex justify-center items-center gap-2">
              <Trash2 className="h-5 w-5 cursor-pointer" />
              Delete
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
