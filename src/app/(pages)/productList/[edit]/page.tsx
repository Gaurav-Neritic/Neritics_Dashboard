"use client";

import { Eraser, FilePenLine, Save } from "lucide-react";
import { use } from "react";

export default function Page({ params }: any) {
  const { edit }: any = use(params);
  return (
    <section className="p-5">
      <div>
        <div className="flex items-center justify-start gap-3 py-5">
          <div className="p-1 border border-gray-500 rounded">
            <FilePenLine />
          </div>
          <div>
            <p className="text-sm font-normal text-gray-500">
              Editing... {edit}
            </p>
            <h1 className="text-3xl font-semibold">Edit A Product</h1>
          </div>
        </div>
        <form>
          <div className="p-2">
            <div className="grid grid-cols-2 gap-5 ">
              <div className=" border-gray-400 rounded">
                {/* Product Description */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Description
                    </h2>
                  </div>

                  <div className="border rounded border-lightBorder dark:border-darkBorder  p-4">
                    <div>
                      <div className="w-full py-2">
                        <label className="mb-2">Product Name</label>
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          className="block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 mt-2 rounded "
                        />
                      </div>

                      <div className="w-full py-2">
                        <label>Content ( Description )</label>
                        <textarea
                          placeholder="Content Details"
                          rows={5}
                          required
                          className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 mt-2 rounded "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Category */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Category
                    </h2>
                  </div>

                  <div className="border  rounded border-lightBorder dark:border-darkBorder  p-4 ">
                    <div>
                      <div className="w-full py-2">
                        <label>Product Category</label>
                        <select
                          required
                          className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2"
                        >
                          <option>Select Category</option>
                          <option>Category 2</option>
                          <option>Category 3</option>
                          <option>Category 4</option>
                        </select>
                      </div>

                      <div className="w-full py-2">
                        <label>Product Type</label>
                        <select className="block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2">
                          <option>Select Type</option>
                          <option>Type 2</option>
                          <option>Type 3</option>
                          <option>Type 4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Features */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Features
                    </h2>
                  </div>

                  <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-2 gap-4 place-items-center ">
                          <div>
                            <label>Brand Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Brand Name"
                              className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2"
                            />
                          </div>

                          <div className="w-full">
                            <label>Form</label>
                            <select className=" w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 ">
                              <option>Capsules</option>
                              <option>Oil</option>
                              <option>Tablets</option>
                            </select>
                          </div>

                          {/* HSN Code and GST  */}
                          <div>
                            <label>Ayurvedic</label>
                            <select
                              required
                              className=" w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 rounded mt-2"
                            >
                              <option>Nature Of Medicine</option>
                              <option>True</option>
                              <option>False</option>
                            </select>
                          </div>

                          <div>
                            <label>Container</label>
                            <select
                              required
                              className=" w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            >
                              <option>Container Type</option>
                              <option>Bottle</option>
                              <option>Strip</option>
                            </select>
                          </div>

                          <div>
                            <label>Quantity In Container </label>
                            <input
                              type="number"
                              required
                              placeholder="Quantity"
                              className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>

                          <div>
                            <label>Total Stock</label>
                            <input
                              type="number"
                              required
                              placeholder="Stock Available"
                              className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid col-2 */}
              <div>
                {/* Product Images */}
                {/* <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Images
                    </h2>
                  </div>

                  <Link
                    href={`/productList/${edit}/${edit + "img"}`}
                    className="border rounded border-lightBorder dark:border-darkBorder  p-4 "
                  >
                    Edit Image
                  </Link>
                </div> */}

                {/* Product Pricing */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Pricing
                    </h2>
                  </div>

                  <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
                    <div>
                      <div className="w-full py-2">
                        <div className="flex items-center justify-center gap-4">
                          <div>
                            <label>Price (MRP)</label>
                            <input
                              placeholder="MRP Price"
                              required
                              type="number"
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>
                          <div>
                            <label>Discount</label>
                            <input
                              placeholder="Discount Price"
                              required
                              type="number"
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Manufacturing */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Manufacturing
                    </h2>
                  </div>

                  <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-2 gap-4 place-items-center ">
                          <div>
                            <label>Country Of Origin</label>
                            <select
                              required
                              className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            >
                              <option>India</option>
                              <option>USA</option>
                              <option>China</option>
                            </select>
                          </div>

                          {/* HSN Code and GST  */}
                          <div>
                            <label>HSN Code</label>
                            <input
                              placeholder="HSN Code"
                              required
                              type="number"
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>

                          <div>
                            <label>GST (%)</label>
                            <input
                              placeholder="GST "
                              required
                              type="number"
                              min={0}
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            />
                          </div>

                          <div>
                            <label>Shelf Life</label>
                            <input
                              placeholder="Shelf Life (Months)"
                              type="number"
                              min={1}
                              required
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            />
                          </div>

                          <div>
                            <label>Suitable For</label>
                            <select
                              required
                              className=" w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            >
                              <option>Vegeterian </option>
                              <option>Non Vegeterian </option>
                            </select>
                          </div>

                          <div className="w-full">
                            <div className="relative">
                              <label>List Product</label>
                              <select
                                required
                                className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                              >
                                <option>Publish</option>
                                <option>UnList</option>
                              </select>
                            </div>
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
                      <Save />
                      {/* {loading ? "" : <Plus />}
                {loading ? <Loader title={"Adding..."} /> : "Add Product"} */}
                      Save
                    </span>
                  </button>
                  <button
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
          </div>
        </form>
      </div>
    </section>
  );
}
