"use client";

import Loader from "@/components/Loaders/Loader";
import axios from "axios";
import { Eraser, FilePenLine, Images, ImageUp, Plus, Save } from "lucide-react";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page({ params }: any) {
  const router = useRouter();
  const { edit }: any = use(params);
  const [details, setDetails]: any = useState({});

  const [name, setName]: any = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [stock, setStock] = useState("");
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
  const [images, setImages] = useState([]);

  // image edit popup
  const [popup, setPopup] = useState(false);

  async function getEditableProduct() {
    try {
      const id = await edit;
      const response = await axios.post("../api/getProductDetail", { id });

      if (response.data.data) {
        setDetails(response.data.data);
        toast.success("Data fetched");
        console.log(details);
      } else {
        toast.error("Error Fetching Data");
      }
    } catch (error) {
      console.log("Error Fetching products data : ", error);
      toast.error("Error Fetching Data");
    }
  }

  const handelUpdate = async (e: React.FormEvent) => {
    // Checks if the selected types and categorys are defaults
    if (category === "Select Category") return setCategory("");
    if (type === "Select Type") return setType("");
    if (isAyurvedic === "Nature Of Medicine") return setIsAyurvedic("");
    if (container === "Container Type") return setContainer("");
    if (suitableFor === "Edible For") return setSuitableFor("");
    if (publish === "Publishing Status") return setPublish("");

    const data = {
      edit,
      name,
      description,
      price,
      quantity,
      stock,
      discount,
      category,
      type,
      brandName,
      form,
      isAyurvedic,
      container,
      coo,
      hsnCode,
      gst,
      shelfLife,
      suitableFor,
      publish,
    };
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.put("../api/editProduct", { data });

      if (response.data.data) {
        toast.success("Product Updated Successfully");
        setLoading(false);
        router.push("/productList");
      } else {
        toast.error("Error Updating Data");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Updating products data : ", error);
      toast.error("Error Updating Data");
    }
  };

  useEffect(() => {
    try {
      getEditableProduct();
    } catch (error) {
      console.log("Error Fetching products data : ", error);
      toast.error("Error Fetching Data");
    }
  }, []);

  useEffect(() => {
    if (details && Object.keys(details).length !== 0) {
      setName(details?.title);
      setDescription(details?.description);
      setPrice(details?.price);
      setDiscount(details?.discount);
      setQuantity(details?.quantity);
      setStock(details?.stock);
      setType(details?.type);
      setCategory(details?.category);
      setPrice(details?.price);
      setHsnCode(details?.hsnCode);
      setGst(details?.gstOnProduct);
      setShelfLife(details?.shelfLife);
      setPublish(details?.listingStatus ? "Publish" : "UnList");
      setBrandName(details?.brand);
      setIsAyurvedic(details?.ayurvedic ? "True" : "False");
      setContainer(details?.containerType);
      setForm(details?.form);
      setSuitableFor(
        details?.suitableForVegeterian ? "Vegeterian" : "Non Vegeterian"
      );
      setCoo(details?.countryOfOrigin);
      setImages(details?.image);
    }
  }, [details]);

  return (
    <section className="p-5">
      <div>
        <div className="flex items-center justify-start gap-3 py-5">
          <div className="p-1 border border-gray-500 rounded">
            <FilePenLine />
          </div>
          <div>
            <p className="text-sm font-normal text-gray-500">
              Product Id - {edit}
            </p>
            <h1 className="text-[28px] font-semibold capitalize">
              Editing - <span className="text-xl font-normal ">{name}</span>
            </h1>
          </div>
        </div>
        <form onSubmit={handelUpdate}>
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
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder="Name"
                          required
                          className="block w-full border border-lightBorder dark:border-darkBorder outline-none focus:outline-0 px-4 py-2 mt-2 rounded "
                        />
                      </div>

                      <div className="w-full py-2">
                        <label>Content ( Description )</label>
                        <textarea
                          placeholder="Content Details"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
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
                          value={category}
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
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
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
                              value={brandName}
                              onChange={(e) => {
                                setBrandName(e.target.value);
                              }}
                              required
                              placeholder="Brand Name"
                              className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2"
                            />
                          </div>

                          <div className="w-full">
                            <label>Form</label>
                            <select
                              value={form}
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
                              value={isAyurvedic}
                              onChange={(e) => {
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
                              onChange={(e) => setStock(e.target.value)}
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
                {/* Images editing div */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg font-semibold antialiased">
                      Images
                    </h2>
                  </div>
                  <div className="border rounded border-lightBorder dark:border-darkBorder p-4 ">
                    <div className="grid grid-cols-2 gap-5 relative group">
                      {images.map((img, index) => {
                        return (
                          <div
                            key={index}
                            className="border border-lightBorder dark:border-darkBorder rounded py-2 place-items-center"
                          >
                            <img
                              src={img}
                              alt="saved images"
                              className="h-10 w-10 rounded-full border border-lightBorder dark:border-darkBorder"
                            />
                            <h1>img {index + 1}</h1>
                          </div>
                        );
                      })}
                      <div className="absolute h-full w-full top-0 left-0 group-hover:block hidden backdrop-blur-sm border border-lightBorder rounded dark:border-darkBorder">
                        <button
                          onClick={() => setPopup(!popup)}
                          type="button"
                          className="absolute top-0 left-0 right-0 bottom-0 m-auto text-xl text-center flex items-center justify-center gap-3 font-semibold uppercase cursor-pointer"
                        >
                          <ImageUp className="h-7 w-7" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

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
                              value={price}
                              onChange={(e) => {
                                setPrice(e.target.value);
                              }}
                              required
                              type="number"
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>
                          <div>
                            <label>Discount</label>
                            <input
                              placeholder="Discount Price"
                              value={discount}
                              onChange={(e) => setDiscount(e.target.value)}
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
                              value={coo}
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
                              value={hsnCode}
                              onChange={(e) => setHsnCode(e.target.value)}
                              required
                              type="number"
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                            />
                          </div>

                          <div>
                            <label>GST (%)</label>
                            <input
                              value={gst}
                              onChange={(e) => setGst(e.target.value)}
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
                              value={shelfLife}
                              onChange={(e) => {
                                setShelfLife(e.target.value);
                              }}
                              type="number"
                              min={1}
                              required
                              className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            />
                          </div>

                          <div>
                            <label>Suitable For</label>
                            <select
                              value={suitableFor}
                              onChange={(e) => {
                                setSuitableFor(e.target.value);
                              }}
                              required
                              className=" w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2 "
                            >
                              <option>Edible For</option>
                              <option>Vegeterian</option>
                              <option>Non Vegeterian</option>
                            </select>
                          </div>

                          <div className="w-full">
                            <div className="relative">
                              <label>Publish / Un-Publish</label>
                              <select
                                required
                                value={publish}
                                onChange={(e) => {
                                  setPublish(e.target.value);
                                }}
                                className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                              >
                                <option>Publishing Status</option>
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
                      {loading ? "" : <Save />}
                      {loading ? <Loader title={"Saving..."} /> : "Save"}
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

      {popup && (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg  max-w-2xl  w-full">
            <div className="flex items-center  gap-4">
              <Images className="w-5 h-5 " />
              <h1>Edit Image</h1>
            </div>
              {/* Main Image */}
              <div className="p-5">
            <div className="flex justify-start items-start gap-6 mb-2 ">
            <label>* Main Image: </label>
              <input
                type="file"
                required
                className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
              />
               <button className="p-2 border rounded ">
                 Upload
               </button>
            </div>
              {/* First Image  */}
              <div className="flex justify-start items-start gap-6 mb-2 ">
            <label>* First Image: </label>
              <input
                type="file"
                required
                className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
              />
               <button className="p-2 border rounded ">
                 Upload
               </button>
            </div>
            {/* Second Image */}
            <div className="flex justify-start items-start gap-6 mb-2 ">
            <label>* Second Image: </label>
              <input
                type="file"
                required
                className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
              />
               <button className="p-2 border rounded ">
                 Upload
               </button>
            </div>
            {/* Third Image */}
            <div className="flex justify-start items-start gap-6 mb-2 ">
            <label>* Third Image: </label>
              <input
                type="file"
                required
                className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
              />
               <button className="p-2 border rounded ">
                 Upload
               </button>
            </div>
            {/* Fourth */}
            <div className="flex justify-start items-start gap-6 mb-2 ">
            <label>* Fourth Image: </label>
              <input
                type="file"
                required
                className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
              />
               <button className="p-2 border rounded ">
                 Upload
               </button>
            </div>
              </div>
          </div>
        </div>
      )}
    </section>
  );
}
