"use client";
import {
  SlidersHorizontal,
  Trash2,
  AlertCircle,
  FilePenLine,
} from "lucide-react";
import React, { useState } from "react";

const StocksPage = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

  return (
    <section className="p-5">
      <div className="border px-4 py-2 rounded border-gray-300 dark:border-neutral-700">
        <div className="flex items-center justify-start gap-3">
          <SlidersHorizontal />
          <select className="border border-gray-400 px-3 py-1 rounded outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
            <option className="dark:bg-neutral-800">Filter One</option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Option 2
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Option 3
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Option 4
            </option>
          </select>
          <select className="border border-gray-400 px-3 py-1 rounded outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
            <option className="dark:bg-neutral-800">Type</option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Type 2
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Type 3
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Type 4
            </option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
            <option className="dark:bg-neutral-800">Range</option>
            <option className="dark:bg-neutral-800 dark:text-white">
              From 1 to 2
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              From 2 to 3
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              From 3 to 4
            </option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-white">
            <option className="dark:bg-neutral-800">Time</option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Recently
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Frequently
            </option>
            <option className="dark:bg-neutral-800 dark:text-white">
              Earlier
            </option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div className="py-5">
        <div className="p-1 h-screen border border-gray-300 dark:border-neutral-700 rounded ">
          <div className="m-5  border border-gray-300 dark:border-neutral-700 rounded">
            <div className=" py-3 grid grid-cols-5 place-items-center ">
              <h1>Products Id</h1>
              <h1>Products Name</h1>
              <h1>In Stock</h1>
              <h1>Total Stock</h1>
              <h1>Action</h1>
            </div>
            <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
            <div>
              {/* Product Item */}
              {/* Product 1 */}
              <div className="py-3 grid grid-cols-5 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 1</h1>
                <h1 className="line-clamp-1">Product 1 Name</h1>
                <select className="dark:bg-neutral-800 dark:text-white border border-gray-400 px-3 py-1 rounded outline-none">
                  <option className="dark:bg-neutral-800" value="option1">
                    Yes
                  </option>
                  <option className="dark:bg-neutral-800" value="option2">
                    No
                  </option>
                </select>
                <h1>100</h1>
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
              {/* Product 2 */}
              <div className="py-3 grid grid-cols-5 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 2</h1>
                <h1 className="line-clamp-1">Product 2 Name</h1>
                <select className="dark:bg-neutral-800 dark:text-white border border-gray-400 px-3 py-1 rounded outline-none">
                  <option className="dark:bg-neutral-800" value="option1">
                    Yes
                  </option>
                  <option className="dark:bg-neutral-800" value="option2">
                    No
                  </option>
                </select>
                <h1>50</h1>
                <div className="flex gap-4">
                  <button className="text-lime-400 hover:text-lime-500">
                    <FilePenLine className="text-sm" />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => handleDelete("Product 2")}
                  >
                    <Trash2 className="text-sm" />
                  </button>
                </div>
              </div>
              {/* Product 3 */}
              <div className="py-3 grid grid-cols-5 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 3</h1>
                <h1 className="line-clamp-1">Product 3 Name</h1>
                <select className="dark:bg-neutral-800 dark:text-white border border-gray-400 px-3 py-1 rounded outline-none">
                  <option className="dark:bg-neutral-800" value="option1">
                    Yes
                  </option>
                  <option className="dark:bg-neutral-800" value="option2">
                    No
                  </option>
                </select>
                <h1>50</h1>
                <div className="flex gap-4">
                  <button className="text-lime-400 hover:text-lime-500">
                    <FilePenLine className="text-sm" />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => handleDelete("Product 2")}
                  >
                    <Trash2 className="text-sm" />
                  </button>
                </div>
              </div>
              {/* Product 2 */}
              <div className="py-3 grid grid-cols-5 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 4</h1>
                <h1 className="line-clamp-1">Product 4 Name</h1>
                <select className="dark:bg-neutral-800 dark:text-white border border-gray-400 px-3 py-1 rounded outline-none">
                  <option className="dark:bg-neutral-800" value="option1">
                    Yes
                  </option>
                  <option className="dark:bg-neutral-800" value="option2">
                    No
                  </option>
                </select>
                <h1>50</h1>
                <div className="flex gap-4">
                  <button className="text-lime-400 hover:text-lime-500">
                    <FilePenLine className="text-sm" />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => handleDelete("Product 2")}
                  >
                    <Trash2 className="text-sm" />
                  </button>
                </div>
              </div>
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

export default StocksPage;
