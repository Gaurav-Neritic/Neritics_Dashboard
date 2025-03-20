"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { AppWindowMac, Eraser, LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
  const [mainImage, setMainImage]: any = useState([]);
  const [primaryImage, setPrimaryImage]: any = useState([]);
  const [secondImage, setSecondImage]: any = useState([]);
  const [thirdImage, setThirdImage]: any = useState([]);
  const [fourthImage, setFourthImage]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("stock", stock);
    formData.append("mainImage", mainImage);
    formData.append("primaryImage", primaryImage);
    formData.append("secondImage", secondImage);
    formData.append("thirdImage", thirdImage);
    formData.append("fourthImage", fourthImage);
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("api/addProduct", formData);
      if (response.data.data) {
        toast.success("Product added");
        handelClearFields();
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("Failed to add the product");
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Adding the product !", error);
      toast.error("Error Adding the product !");
    }
  };

  const handelClearFields = () => {
    try {
      setTitle("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setQuantity("");
      setStock("");
      setType("");
      setCategory("");
      setMainImage("");
      setPrimaryImage("");
      setSecondImage("");
      setThirdImage("");
      setFourthImage("");
      toast.success("All Fields Cleared");
    } catch (error) {
      setLoading(false);
      toast.error("Error Clearing The Fields");
      toast.error("Try Refreshing");
    }
  };

  return (
    <form className="p-5" onSubmit={handelSubmit}>
      {/* Page Title */}
      <div className="flex items-center justify-start gap-3 py-5">
        <div className="p-1 border border-gray-500 rounded">
          <AppWindowMac />
        </div>
        <div>
          <p className="text-sm font-normal text-gray-500">
            All the fields are required
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
                    value={title}
                    required
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 mt-2 rounded dark:border-neutral-600"
                  />
                </div>

                <div className="w-full py-2">
                  <label>Content ( Description )</label>
                  <textarea
                    placeholder="Content Details"
                    rows={5}
                    value={description}
                    required
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
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
                  <select
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    required
                    className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:border-neutral-600"
                  >
                    <option>Select Category</option>
                    <option>Category 2</option>
                    <option>Category 3</option>
                    <option>Category 4</option>
                  </select>
                </div>

                <div className="w-full py-2">
                  <label>Product Type</label>
                  <select
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    required
                    className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:border-neutral-600"
                  >
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
                      required
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                      className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded dark:border-neutral-600"
                    />
                    <input
                      placeholder="Stock"
                      type="number"
                      value={stock}
                      required
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
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
                      <label className="text-yellow-800 dark:text-yellow-600">
                        * Main Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        required
                        onChange={(e: any) => {
                          setMainImage(e.target.files[0]);
                        }}
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 dark:border-neutral-600"
                      />
                    </div>
                    <div className="relative">
                      <label className="text-yellow-800 dark:text-yellow-600 z-20 ">
                        * Primary Image
                      </label>
                      <input
                        required
                        type="file"
                        onChange={(e: any) => {
                          setPrimaryImage(e.target.files[0]);
                        }}
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 dark:border-neutral-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="relative">
                      <label className="text-yellow-800 dark:text-yellow-600 z-20">
                        * Second Image
                      </label>
                      <input
                        type="file"
                        onChange={(e: any) => {
                          setSecondImage(e.target.files[0]);
                        }}
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 dark:border-neutral-600"
                      />
                    </div>
                    <div className="relative">
                      <label className="text-yellow-800 dark:text-yellow-600">
                        * Third Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        onChange={(e: any) => {
                          setThirdImage(e.target.files[0]);
                        }}
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 dark:border-neutral-600"
                      />
                    </div>
                  </div>
                  <div className="relative mt-2">
                    <label className="text-yellow-800 dark:text-yellow-600">
                      * Fourth Image
                    </label>
                    <input
                      placeholder="Main Image"
                      type="file"
                      onChange={(e: any) => {
                        setFourthImage(e.target.files[0]);
                      }}
                      className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 dark:border-neutral-600"
                    />
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
                      <label>Price (MRP)</label>
                      <input
                        placeholder="MRP Price"
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="block w-full border border-gray-300 outline-none focus:outline-0 px-4 py-2 rounded mt-2 dark:border-neutral-600 "
                      />
                    </div>
                    <div>
                      <label>Discount</label>
                      <input
                        placeholder="Discount Price"
                        type="number"
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
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
                {loading ? "" : <Plus />}
                {loading ? <Loader title={"Adding..."} /> : "Add Product"}
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
