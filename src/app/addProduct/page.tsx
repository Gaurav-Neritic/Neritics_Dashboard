"use client";

import { AppWindowMac, Eraser, Plus } from "lucide-react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const handelClearFields = () => {
    try {
      toast.success("Cleared All the fields");
    } catch (error) {
      toast.error("Error Clearing The Fields");
      toast.error("Try Refreshing");
    }
  };

  return (
    <form className="p-5">
      {/* Page Title */}
      <div className="flex items-center justify-start gap-3 py-5">
        <div className="p-1 border border-gray-500 rounded">
          <AppWindowMac />
        </div>
        <div>
          <p className="text-sm font-normal text-gray-500">
            Page to add products
          </p>
          <h1 className="text-3xl font-semibold">Add A New Product</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 ">
        <div className=" border-gray-400 rounded">
          {/* Product Description */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Description</h2>
            </div>

            <div className="border rounded border-gray-300 dark:border-neutral-600 p-4">
              <div>
                <div className="w-full py-2">
                  <label className="mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 mt-2 rounded dark:border-neutral-600"
                  />
                </div>

                <div className="w-full py-2">
                  <label>Content ( Description )</label>
                  <textarea
                    placeholder="Content Details"
                    rows={5}
                    className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 mt-2 rounded dark:border-neutral-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Category */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Category</h2>
            </div>

            <div className="border dark:border-neutral-600 rounded border-gray-300 p-4 ">
              <div>
                <div className="w-full py-2">
                  <label>Product Category</label>
                  <select className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:border-neutral-600">
                    <option>Select Category</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                  </select>
                </div>

                <div className="w-full py-2">
                  <label>Product Type</label>
                  <select className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:border-neutral-600">
                    <option>Select Type</option>
                    <option>Type 2</option>
                    <option>Type 3</option>
                    <option>Type 4</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Product Inventory */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Inventory</h2>
            </div>

            <div className="border rounded border-gray-300 dark:border-neutral-600 p-4">
              <div>
                <div className="w-full py-2">
                  <label>Quantity</label>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <input
                      placeholder="Quantity"
                      type="number"
                      className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded dark:border-neutral-600"
                    />
                    <input
                      placeholder="Stock"
                      type="number"
                      className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded dark:border-neutral-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid col-2 */}
        <div>
          {/* Product Images */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Images</h2>
            </div>

            <div className="border rounded border-gray-300 p-4 dark:border-neutral-600">
              <div>
                <div className="w-full py-2">
                  <label>Total 5 Images</label>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="relative">
                      <input
                        placeholder="Main Image"
                        type="file"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer text-transparent dark:border-neutral-600"
                      />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                        Main Image
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        placeholder="Main Image"
                        type="file"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer text-transparent dark:border-neutral-600"
                      />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 z-20">
                        Primary Image
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="relative">
                      <input
                        placeholder="Main Image"
                        type="file"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer text-transparent dark:border-neutral-600"
                      />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                        Second Image
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        placeholder="Main Image"
                        type="file"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer text-transparent dark:border-neutral-600"
                      />
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                        Third Image
                      </span>
                    </div>
                  </div>
                  <div className="relative mt-2">
                    <input
                      placeholder="Main Image"
                      type="file"
                      className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer text-transparent dark:border-neutral-600"
                    />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
                      Fourth Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Pricing */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Pricing</h2>
            </div>

            <div className="border rounded border-gray-300 p-4 dark:border-neutral-600">
              <div>
                <div className="w-full py-2">
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <label>Price</label>
                      <input
                        placeholder="MRP Price"
                        type="number"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded mt-2 dark:border-neutral-600 "
                      />
                    </div>
                    <div>
                      <label>Discount</label>
                      <input
                        placeholder="Discount Price"
                        type="number"
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded mt-2 dark:border-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Product Button */}
          <div className="py-5 flex gap-3">
            <button
              type="submit"
              className="px-4 border border-blue-300 hover:border-blue-300 hover:bg-blue-200 rounded bg-blue-100 text-blue-600 transition-all ease-linear duration-200 cursor-pointer dark:border-blue-400"
            >
              <span className="flex items-center justify-center gap-2">
                <Plus />
                Add Product
              </span>
            </button>
            <button
              onClick={handelClearFields}
              type="reset"
              className="px-4 py-2 border border-red-300 hover:border-red-300 hover:bg-red-200 rounded bg-red-100 text-red-500 transition-all ease-linear duration-200 cursor-pointer dark:border-red-400"
            >
              <span className="flex items-center justify-center gap-2">
                <Eraser />
                Clear Fields
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
