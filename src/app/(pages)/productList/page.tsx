"use client";
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
  const [productToDelete, setProductToDelete] = useState(null);
  const [productData, setProductData] = useState([]);

  // Delete Handle
  const handleDelete = (productId: any) => {
    setProductToDelete(productId);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    // Here you would add the actual delete logic
    console.log(`Deleting product: ${productToDelete}`);
    setDeletePopup(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeletePopup(false);
    setProductToDelete(null);
  };

  async function getProducts() {
    try {
      const response = await axios.get("api/getProducts");
      if (response.data.data) {
        setProductData(response.data.data);
        toast.success("Data fetched successfully");
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
  }, []);

  return (
    <section className="p-5">
      <div className="border px-4 py-2 rounded border-gray-300 dark:border-neutral-700">
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
        <div className="p-1 h-screen border border-gray-300 dark:border-neutral-700 rounded ">
          <div className="m-5  border border-gray-300 dark:border-neutral-700 rounded">
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
                {productData.map(
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
                            onClick={() => handleDelete("Product 1")}
                          >
                            <Trash2 className="text-sm" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                )}
                {/*  */}
              </>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup && (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-500">
              <AlertCircle className="mr-2" />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{productToDelete}</span>? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductList;
