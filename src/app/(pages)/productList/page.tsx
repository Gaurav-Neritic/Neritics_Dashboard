"use client";
import DeletePoup from "@/components/DeletePoup";
import axios from "axios";
import { SlidersHorizontal, Trash2, FilePenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface productDataProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  image: [string];
}

const ProductList = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [productData, setProductData] = useState([]);

  async function getProducts() {
    try {
      const response = await axios.get("api/getProducts");
      if (response.data.data) {
        setProductData(response.data.data);
      } else {
        toast.error("Failed to fetch the product data");
      }
    } catch (error) {
      console.log("Error Fetching the products", error);
      toast.error("Failed to fetch the product data");
    }
  }

  useEffect(() => {
    getProducts();
  }, [deletePopup]);

  return (
    <section className="p-5">
      <div className="border px-4 py-2 rounded border-lightBorder dark:border-darkBorder ">
        <div className="flex items-center justify-start gap-3">
          <SlidersHorizontal />
          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Filter One</option>
            <option className="dark:text-black">Option 2</option>
            <option className="dark:text-black">Option 3</option>
            <option className="dark:text-black">Option 4</option>
          </select>
          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Type</option>
            <option className="dark:text-black">Type 2</option>
            <option className="dark:text-black">Type 3</option>
            <option className="dark:text-black">Type 4</option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Range</option>
            <option className="dark:text-black">From 1 to 2</option>
            <option className="dark:text-black">From 2 to 3</option>
            <option className="dark:text-black">From 3 to 4</option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Time</option>
            <option className="dark:text-black">Recently</option>
            <option className="dark:text-black">Frequently</option>
            <option className="dark:text-black">Earlier</option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="py-5">
        <div className="p-1 h-screen border border-lightBorder dark:border-darkBorder  rounded ">
          <div className="m-5  border border-lightBorder dark:border-darkBorder  rounded">
            <div className=" py-3 px-5 gap-5 grid grid-cols-8 place-items-center ">
              <h1 className="w-full truncate col-span-1">Products Id</h1>
              <div className="w-full col-span-1 place-items-center">
                <h1 className="truncate ">Image</h1>
              </div>
              <h1 className="w-full truncate col-span-2">Products Name</h1>
              <h1 className="w-full truncate col-span-1">Price</h1>
              <h1 className="w-full truncate col-span-1">Category</h1>
              <h1 className="w-full truncate col-span-1">Stock</h1>
              <h1 className="w-full truncate col-span-1">Action</h1>
            </div>
            <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
            <div>
              {/* Product Item */}
              <>
                {/*  */}
                {productData.length !== 0 &&
                  productData.map(
                    ({
                      _id,
                      title,
                      price,
                      category,
                      stock,
                      image,
                    }: productDataProps) => {
                      return (
                        <div
                          key={_id}
                          className="py-3 px-5 grid grid-cols-8 place-items-start gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50"
                        >
                          <h1 className="col-span-1 w-full truncate">{_id}</h1>
                          <div className="col-span-1 w-full place-items-center">
                            <Image
                              src={image[0]}
                              width={20}
                              height={20}
                              alt="img"
                              className=" h-7 w-7 rounded"
                            />
                          </div>
                          <h1 className="col-span-2">{title}</h1>

                          <h1 className="col-span-1">₹ {price}</h1>
                          <h1 className="col-span-1">{category}</h1>
                          <h1 className="col-span-1">{stock}</h1>

                          <div className="flex gap-4 col-span-1">
                            <Link
                              href={`/productList/${_id}`}
                              className="text-green-400 hover:text-green-500"
                            >
                              <FilePenLine className="text-sm cursor-pointer" />
                            </Link>
                            <button
                              className="text-red-400 hover:text-red-500"
                              onClick={() => setDeletePopup(true)}
                            >
                              <Trash2 className="text-sm cursor-pointer" />
                            </button>
                          </div>
                          {/* Delete Confirmation Popup */}
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
                    }
                  )}
                {productData.length === 0 && (
                  <div className="place-items-center uppercase text-gray-600 font-semibold py-10">
                    <h1>No Products to display</h1>
                  </div>
                )}
                {/*  */}
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
