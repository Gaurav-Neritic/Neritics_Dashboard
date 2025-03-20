"use client";
import { SlidersHorizontal, Trash2, AlertCircle } from "lucide-react";
import React, { useState } from "react";

const ProductList = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDelete = (productId) => {
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
          <div className="m-5  border border-gray-300 dark:border-neutral-300 rounded">
            <div className=" py-3 flex justify-around items-center ">
              <h1>Products Id</h1>
              <h1>Products Name</h1>
              <h1>Price</h1>
              <h1>Category</h1>
              <h1>Stock</h1>
              <h1>Delete</h1>
            </div>
            <hr className=" my-1 text-gray-300 " />
            <div>
              {/* Product Item */}
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50 ">
                <h1>Product 1</h1>
                <h1>Product 1 Name</h1>
                <h1>$100</h1>
                <h1>Category 1</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 2</h1>
                <h1>Product 2 Name</h1>
                <h1>$100</h1>
                <h1>Category 2</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 3</h1>
                <h1>Product 3 Name</h1>
                <h1>$100</h1>
                <h1>Category 3</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 4</h1>
                <h1>Product 4 Name</h1>
                <h1>$100</h1>
                <h1>Category 4</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 5</h1>
                <h1>Product 5 Name</h1>
                <h1>$100</h1>
                <h1>Category 5</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 6</h1>
                <h1>Product 6 Name</h1>
                <h1>$100</h1>
                <h1>Category 6</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 flex justify-around items-center border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 6</h1>
                <h1>Product 6 Name</h1>
                <h1>$100</h1>
                <h1>Category 6</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 7</h1>
                <h1>Product 7 Name</h1>
                <h1>$100</h1>
                <h1>Category 7</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 8</h1>
                <h1>Product 8 Name</h1>
                <h1>$100</h1>
                <h1>Category 8</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 9</h1>
                <h1>Product 9 Name</h1>
                <h1>$100</h1>
                <h1>Category 9</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 10</h1>
                <h1>Product 10 Name</h1>
                <h1>$100</h1>
                <h1>Category 10</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2  className="text-sm"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deletePopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-lg max-w-md w-full">
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
