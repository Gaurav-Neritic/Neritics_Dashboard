"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FilePenLine, LoaderCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
    <div className="flex flex-col h-full p-5 border rounded border-lightBorder dark:border-darkBorder">
      {isError && <div className="flex items-center justify-center p-5">
        <h1>Something Went Wrong</h1>
      </div>}
      <Image
        width={2000}
        height={2000}
        alt="image"
        src={image[0] || "/placeholder.jpg"}
        className="w-auto h-[250px] object-cover bg-gray-100 dark:bg-neutral-700 border border-lightBorder dark:border-darkBorder rounded"
      />
      <div className="flex flex-col flex-grow pb-2">
        <h1 className="mt-2 text-xl font-semibold capitalize line-clamp-2 h-14">
          {title}
        </h1>
        <h1 className="mt-2 font-normal text-md">
          <span className="font-light dark:text-gray-300"> Status </span> :{" "}
          {listingStatus ? "✅ Published " : "❌ Un-Listed"}
        </h1>
        <h1 className="mt-2 font-normal text-md">
          <span className="font-light dark:text-gray-300">Stock</span> :{" "}
          {stock <= 0 ? `❌ ${stock}` : `✅ ${stock}`}
        </h1>
        <h1 className="mt-2 font-semibold text-md">
          <span className="font-light dark:text-gray-300">Price</span> : ₹
          {price}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-lightBorder dark:border-darkBorder">
        <Link
          href={`/productList/${_id}`}
          className="flex items-center justify-center gap-2 p-2 text-sm text-green-500 bg-green-100 border rounded hover:text-green-600 hover:bg-green-200 border-lightBorder dark:border-darkBorder"
        >
          <FilePenLine className="w-5 h-5 cursor-pointer" />
          Edit
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handelDelete(_id);
          }}
          className="p-2 text-sm text-red-500 bg-red-100 border rounded cursor-pointer hover:bg-red-200 hover:text-red-600 border-lightBorder dark:border-darkBorder bg-red-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2 animate-spin">
              <LoaderCircle className="w-5 h-5 cursor-pointer" />
              Deleting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Trash2 className="w-5 h-5 cursor-pointer" />
              Delete
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
