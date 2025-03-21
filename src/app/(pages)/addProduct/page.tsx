"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { AppWindowMac, Eraser, Plus } from "lucide-react";
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
  const [brandName, setBrandName] = useState("");
  const [form, setForm] = useState("");
  const [isAyurvedic, setIsAyurvedic] = useState("");
  const [container, setContainer] = useState("");
  const [coo, setCoo] = useState("India");
  const [hsnCode, setHsnCode] = useState("");
  const [gst, setGst] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [publish, setPublish] = useState("");

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
    formData.append("brandName", brandName);
    formData.append("form", form);
    formData.append("container", container);
    formData.append("gst", gst);
    formData.append("hsnCode", hsnCode);
    formData.append("coo", coo);
    formData.append("shelfLife", shelfLife);
    formData.append("isAyurvedic", isAyurvedic);
    formData.append("suitableFor", suitableFor);
    formData.append("publish", publish);
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

            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4">
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
                    className="block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 mt-2 rounded "
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
                    className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 mt-2 rounded "
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

            <div className="border  rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <label>Product Category</label>
                  <select
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
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
                  <select
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    required
                    className="block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2"
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

          {/* Product Features */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Features</h2>
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
                        value={brandName}
                        onChange={(e) => {
                          setBrandName(e.target.value);
                        }}
                        placeholder="Brand Name"
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2"
                      />
                    </div>

                    <div className="w-full">
                      <label>Form</label>
                      <select
                        value={form}
                        required
                        onChange={(e) => {
                          setForm(e.target.value);
                        }}
                        className=" w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                      >
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
                        onChange={(e: any) => {
                          setIsAyurvedic(e.target.value);
                        }}
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
                        value={container}
                        onChange={(e) => {
                          setContainer(e.target.value);
                        }}
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
                        value={quantity}
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                        placeholder="Quantity"
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>

                    <div>
                      <label>Total Stock</label>
                      <input
                        type="number"
                        required
                        value={stock}
                        min={0}
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
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
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Images</h2>
            </div>

            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="relative">
                      <label className="text-red-500 dark:text-red-300">
                        * Main Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        required
                        onChange={(e: any) => {
                          setMainImage(e.target.files[0]);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 "
                      />
                    </div>
                    <div className="relative">
                      <label className="text-red-500 dark:text-red-300 z-20 ">
                        * First Image
                      </label>
                      <input
                        required
                        type="file"
                        onChange={(e: any) => {
                          setPrimaryImage(e.target.files[0]);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 "
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <div className="relative">
                      <label className="text-red-500 dark:text-red-300 z-20">
                        * Second Image
                      </label>
                      <input
                        required
                        type="file"
                        onChange={(e: any) => {
                          setSecondImage(e.target.files[0]);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 "
                      />
                    </div>
                    <div className="relative">
                      <label className="text-red-500 dark:text-red-300">
                        * Third Image
                      </label>
                      <input
                        required
                        placeholder="Main Image"
                        type="file"
                        onChange={(e: any) => {
                          setThirdImage(e.target.files[0]);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 "
                      />
                    </div>
                  </div>
                  <div className="relative mt-2">
                    <label className="text-red-500 dark:text-red-300">
                      * Fourth Image
                    </label>
                    <input
                      required
                      placeholder="Main Image"
                      type="file"
                      onChange={(e: any) => {
                        setFourthImage(e.target.files[0]);
                      }}
                      className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded cursor-pointer bg-gray-00 "
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
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    <div>
                      <label>Discount</label>
                      <input
                        placeholder="Discount Price"
                        required
                        type="number"
                        value={discount}
                        onChange={(e) => {
                          setDiscount(e.target.value);
                        }}
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
                        onChange={(e) => {
                          setCoo(e.target.value);
                        }}
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
                        value={hsnCode}
                        onChange={(e) => {
                          setHsnCode(e.target.value);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>

                    <div>
                      <label>GST (%)</label>
                      <input
                        placeholder="GST "
                        required
                        type="number"
                        value={gst}
                        onChange={(e) => {
                          setGst(e.target.value);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                      />
                    </div>

                    <div>
                      <label>Shelf Life</label>
                      <input
                        placeholder="Shelf Life (Months) "
                        type="text"
                        required
                        value={shelfLife}
                        onChange={(e) => {
                          setShelfLife(e.target.value);
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                      />
                    </div>

                    <div>
                      <label>Suitable For</label>
                      <select
                        required
                        onChange={(e) => {
                          setSuitableFor(e.target.value);
                        }}
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
                          onChange={(e) => {
                            setPublish(e.target.value);
                          }}
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
                {loading ? "" : <Plus />}
                {loading ? <Loader title={"Adding..."} /> : "Add Product"}
              </span>
            </button>
            <button
              onClick={handelClearFields}
              type="reset"
              className="px-4 py-2 border border-red-300 hover:border-red-300 hover:bg-red-500 rounded bg-red-100 text-red-500 transition-all ease-linear duration-200 cursor-pointer dark:border-red-400"
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
