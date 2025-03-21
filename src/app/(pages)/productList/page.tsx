"use client";
import DeletePoup from "@/components/DeletePoup";
import axios from "axios";
import {
  SlidersHorizontal,
  Trash2,
  AlertCircle,
  FilePenLine,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface productDataProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
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
            <div className=" py-3 grid grid-cols-6 place-items-center ">
              <h1>Products Id</h1>
              <h1>Products Name</h1>
              <h1>Price</h1>
              <h1>Category</h1>
              <h1>Stock</h1>
              <h1>Action</h1>
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
                    }: productDataProps) => {
                      return (
                        <div
                          key={_id}
                          className="py-3 grid grid-cols-6 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50"
                        >
                          <div className="truncate">
                            <h1 className="line-clamp-1">
                              {_id.length > 5 ? _id.slice(0, 6) : ""}...
                            </h1>
                          </div>
                          <h1 className="line-clamp-1">{title}</h1>
                          <h1>₹ {price}</h1>
                          <h1>{category}</h1>
                          <h1>{stock}</h1>

                          <div className="flex gap-4">
                            <button className="text-lime-400 hover:text-lime-500">
                              <FilePenLine className="text-sm" />
                            </button>
                            <button
                              className="text-red-400 hover:text-red-500"
                              onClick={() => setDeletePopup(true)}
                            >
                              <Trash2 className="text-sm" />
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
