"use client";
import {
  SlidersHorizontal,
  Trash2,
  AlertCircle,
  X,
  Pencil,
} from "lucide-react";
import React, { useState } from "react";

const StocksTable = () => {
  //delete popup
  const [deletePopup, setDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  //edit popup
  const [editPopup, setEditPopup] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    productId: "",
    productName: "",
    inStock: "Yes",
    totalStock: 0,
  });

  // handleEdit
  const handleEdit = (product: any) => {
    setProductToEdit(product.id);
    setEditForm({
      productId: product.id,
      productName: product.name,
      inStock: product.inStock,
      totalStock: product.stock,
    });
    setEditPopup(true);
  };

  const confirmEdit = () => {
    console.log(`Editing product: ${productToEdit}`, editForm);
    setEditPopup(false);
    setProductToEdit(null);
  };

  const cancelEdit = () => {
    setEditPopup(false);
    setProductToEdit(null);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Sample Data
  const products = [
    { id: 1, name: "Product 1", inStock: "Yes", stock: 50 },
    { id: 2, name: "Product 2", inStock: "No", stock: 100 },
    { id: 3, name: "Product 3", inStock: "Yes", stock: 75 },
    { id: 4, name: "Product 4", inStock: "No", stock: 25 },
    { id: 5, name: "Product 5", inStock: "Yes", stock: 125 },
    { id: 6, name: "Product 6", inStock: "Yes", stock: 80 },
    { id: 7, name: "Product 7", inStock: "No", stock: 50 },
    { id: 8, name: "Product 8", inStock: "Yes", stock: 150 },
    { id: 9, name: "Product 9", inStock: "Yes", stock: 100 },
    { id: 10, name: "Product 10", inStock: "No", stock: 75 },
  ];

  // Delete Handle
  const handleDelete = (productId: any) => {
    setProductToDelete(productId);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
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
            {products.map((product, index) => (
              <div
                key={index}
                className="py-3 grid grid-cols-5 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50"
              >
                <h1>{product.id}</h1>
                <h1 className="line-clamp-1">{product.name}</h1>
                <select className="dark:bg-neutral-800 dark:text-white border border-gray-400 px-3 py-1 rounded outline-none">
                  <option
                    className="dark:bg-neutral-800"
                    value="Yes"
                    selected={product.inStock === "Yes"}
                  >
                    Yes
                  </option>
                  <option
                    className="dark:bg-neutral-800"
                    value="No"
                    selected={product.inStock === "No"}
                  >
                    No
                  </option>
                </select>
                <h1>stock</h1>
                <div className="flex gap-4">
                  <button
                    className="text-green-500 hover:text-green-600"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="text-sm" />
                  </button>
                  <button
                    className="text-red-400 hover:text-red-500"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
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
      {/* Edit Product Popup */}
      {editPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold gap-2 flex items-center">
                <Pencil className="text-sm" />
                Edit Product
              </h2>
              {/*cancel button */}
              <button
                onClick={cancelEdit}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <form className="space-y-4">
              {/* Product Id */}
              <div>
                <label
                  htmlFor="productId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  value={editForm.productId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                  readOnly
                />
              </div>
              {/* Product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={editForm.productName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                />
              </div>
              {/* In Stock */}
              <div>
                <label
                  htmlFor="inStock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  In Stock
                </label>
                <select
                  id="inStock"
                  name="inStock"
                  value={editForm.inStock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {/* Total Stock */}
              <div>
                <label
                  htmlFor="totalStock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Total Stock
                </label>
                <input
                  type="number"
                  id="totalStock"
                  name="totalStock"
                  value={editForm.totalStock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                />
              </div>
              {/* Save Changes */}
              <div className="flex justify-end space-x-3 pt-4">
                {/*cancel button */}
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  Cancel
                </button>
                {/* save button */}
                <button
                  type="button"
                  onClick={confirmEdit}
                  className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StocksTable;
