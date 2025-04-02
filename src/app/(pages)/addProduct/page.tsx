"use client";

import Loader from "@/components/Loaders/Loader";
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
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("")
  //image
  const [mainImage, setMainImage] = useState(null);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);
  //image
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
  // Additional Infformation
  const [benefits, setBenefits] = useState("")
  const [alergyInfo, setAlergyInfo] = useState("")
  const [specialIngredients, setSpecialIngredients] = useState("")
  const [coating, setCoating] = useState("")
  const [height, setHeight] = useState("")
  const [width, setWidth] = useState("")
  const [weight, setWeight] = useState("")
  // Additional Infformation

  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e: React.FormEvent) => {

    // Taking the addOn Info and setting it in an array
    const benefitArray = benefits.split(",").map((benefit: string) => benefit.trim()).filter((benefit: string) => benefit.length > 0);

    const specialIngredientsArray: any = specialIngredients.split(",").map((special: string) => special.trim()).filter((special: string) => special.length > 0);

    const alergyInfoArray: any = alergyInfo.split(",").map((allergy: string) => allergy.trim()).filter((allergy: string) => allergy.length > 0);

    const coatingArray: any = coating.split(",").map((coate: string) => coate.trim()).filter((coate: string) => coate.length > 0);


    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("stock", stock);
    //image
    if (mainImage) formData.append("mainImage", mainImage);
    if (primaryImage) formData.append("primaryImage", primaryImage);
    if (secondImage) formData.append("secondImage", secondImage);
    if (thirdImage) formData.append("thirdImage", thirdImage);
    if (fourthImage) formData.append("fourthImage", fourthImage);

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
    formData.append("benefits", benefitArray);
    formData.append("specialIngerdients", specialIngredientsArray);
    formData.append("allergy", alergyInfoArray);
    formData.append("coating", coatingArray);
    formData.append("height", height);
    formData.append("width", width);
    formData.append("weight", weight);
    formData.append("gender", gender)
    formData.append("ageRange", ageRange)
    try {
      // Checks if the selected types and categorys are defaults
      if (category === "Select Category") return setCategory("");
      if (type === "Select Type") return setType("");
      if (isAyurvedic === "Nature Of Medicine") return setIsAyurvedic("");
      if (container === "Container Type") return setContainer("");
      if (suitableFor === "Edible For") return setSuitableFor("");
      if (publish === "Publishing Status") return setPublish("");
      if (ageRange === "Select Age Range") return setPublish("");
      if (form === "Select Form") return setForm("");

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
      setMainImage(null);
      setPrimaryImage(null);
      setSecondImage(null);
      setThirdImage(null);
      setFourthImage(null);
      setPrice("");
      setDiscount("");
      setHsnCode("");
      setGst("");
      setShelfLife("");
      setPublish("");
      setBenefits("");
      setSpecialIngredients("");
      setAlergyInfo("");
      setCoating("");
      setGender("");
      setAgeRange("");
      setHeight("");
      setWidth("");
      setWeight("")
      toast.success("All Fields Cleared");
    } catch (error) {
      setLoading(false);
      toast.error("Error Clearing The Fields");
      toast.error("Try Refreshing");
    }
  };
  // Image Preview
  const getPreviewUrl = (file: any) => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
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
        {/* Grid col-1  */}
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
                    className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
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
                    className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
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
                    {/* Brand Name */}
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
                    {/* Form */}
                    <div className="w-full">
                      <label>Form</label>
                      <select
                        value={form}
                        required
                        onChange={(e) => {
                          setForm(e.target.value);
                        }}
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Select Form</option>
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
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Nature Of Medicine</option>
                        <option>True</option>
                        <option>False</option>
                      </select>
                    </div>
                    {/* Container */}
                    <div>
                      <label>Container</label>
                      <select
                        required
                        value={container}
                        onChange={(e) => {
                          setContainer(e.target.value);
                        }}
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Container Type</option>
                        <option>Bottle</option>
                        <option>Strip</option>
                      </select>
                    </div>
                    {/* Quantity In Container */}
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
                    {/* Total Stock */}
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

          {/* Dimension OF Product*/}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">
                Dimension of Product
              </h2>
            </div>
            {/* height  */}
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Height ( In cm )</label>
                      <input
                        placeholder="Height in CM"
                        required
                        type="number"
                        value={height}
                        onChange={(e) => { setHeight(e.target.value) }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    <div>
                      <label>Width ( In cm )</label>
                      <input
                        placeholder="Width in CM"
                        required
                        type="number"
                        value={width}
                        onChange={(e) => { setWidth(e.target.value) }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    <div>
                      <label>Weight ( In gm )</label>
                      <input
                        placeholder="Weight in GM"
                        required
                        type="number"
                        value={weight}
                        onChange={(e) => { setWeight(e.target.value) }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    {/*  */}
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
            {/*  Price (MRP)  */}
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-2 gap-4">
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
                    {/* Discount */}
                    <div>
                      <label>Discount ( In ₹ )</label>
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
                    {/* Main Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300">
                        * Main Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        required
                        onChange={(e: any) => {
                          setMainImage(e.target.files[0]);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:border-darkBorder dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {mainImage && (
                        <img
                          src={getPreviewUrl(mainImage) || ""}
                          alt="Main Image Preview"
                          className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                        />
                      )}
                    </div>
                    {/*  First Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300 z-20 ">
                        * 1<sup>st</sup> Image
                      </label>
                      <input
                        type="file"
                        required
                        onChange={(e: any) => {
                          setPrimaryImage(e.target.files[0]);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:border-darkBorder dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {primaryImage && (
                        <img
                          src={getPreviewUrl(primaryImage) || ""}
                          alt="Main Image Preview"
                          className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    {/* Second Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300 z-20">
                        * 2<sup>nd</sup> Image
                      </label>
                      <input
                        type="file"
                        required
                        onChange={(e: any) => {
                          setSecondImage(e.target.files[0]);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:border-darkBorder dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {secondImage && (
                        <img
                          src={getPreviewUrl(secondImage) || ""}
                          alt="Main Image Preview"
                          className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                        />
                      )}
                    </div>
                    {/* Third Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300">
                        * 3<sup>rd</sup> Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        required
                        onChange={(e: any) => {
                          setThirdImage(e.target.files[0]);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:border-darkBorder dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {thirdImage && (
                        <img
                          src={getPreviewUrl(thirdImage) || ""}
                          alt="Main Image Preview"
                          className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                        />
                      )}
                    </div>
                  </div>
                  {/* Fourth Image  */}
                  <div className="relative mt-2">
                    <label className="text-neutral-700 dark:text-gray-300">
                      * 4<sup>th</sup> Image
                    </label>
                    <input
                      placeholder="Main Image"
                      type="file"
                      required
                      onChange={(e: any) => {
                        setFourthImage(e.target.files[0]);
                      }}
                      className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:border-darkBorder dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                    />
                    {fourthImage && (
                      <img
                        src={getPreviewUrl(fourthImage) || ""}
                        alt="Main Image Preview"
                        className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gender and AgeRange */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Targeted For</h2>
            </div>
            {/*  Price (MRP)  */}
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label>Gender (Both/Male/Female)</label>
                      <select
                        required
                        onChange={(e) => {
                          setGender(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Both</option>
                      </select>
                    </div>
                    {/* Discount */}
                    <div>
                      <label>Age Range (From 18 )</label>
                      <select
                        required
                        onChange={(e) => {
                          setAgeRange(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Select Age Range</option>
                        <option>1 to 18</option>
                        <option>18 to 65</option>
                        <option>65 and Above</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Additional Info  */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">Additional Info {"  "}( Separate by " , " )</h2>
            </div>
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-2 gap-4 place-items-center ">
                    {/* Benefit 1  */}
                    <div>
                      <label>Benefits </label>
                      <textarea
                        placeholder="Enter Benefits "
                        required
                        value={benefits}
                        rows={3}
                        onChange={(e) => {
                          setBenefits(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    {/* Benefit 2  */}
                    <div>
                      <label>Special Ingredients</label>
                      <textarea
                        placeholder="Enter Special Ingredients"
                        required
                        rows={3}
                        value={specialIngredients}
                        onChange={(e) => {
                          setSpecialIngredients(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    {/* Benefit 3  */}
                    <div>
                      <label>Allergy Info</label>
                      <textarea
                        placeholder="Enter Allergy Info"
                        required
                        rows={3}
                        value={alergyInfo}
                        onChange={(e) => {
                          setAlergyInfo(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                    {/* Benefit 4  */}
                    <div>
                      <label>Coating</label>
                      <textarea
                        placeholder="Enter Coating Info"
                        required
                        rows={3}
                        value={coating}
                        onChange={(e) => {
                          setCoating(e.target.value)
                        }}
                        className="block w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded mt-2  "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center text-sm py-3 text-gray-600 animate-pulse"><sup>*</sup>Note ( Use "," comma for adding multiple values)</div>
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
                    {/* Country Of Origin */}
                    <div>
                      <label>Country Of Origin</label>
                      <select
                        onChange={(e) => {
                          setCoo(e.target.value);
                        }}
                        required
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
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
                    {/* GST  */}
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
                    {/* Shelf Life */}
                    <div>
                      <label>Shelf Life ( In Months )</label>
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
                    {/* Suitable For */}
                    <div>
                      <label>Suitable For</label>
                      <select
                        required
                        onChange={(e) => {
                          setSuitableFor(e.target.value);
                        }}
                        className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
                      >
                        <option>Edible For</option>
                        <option>Vegeterian</option>
                        <option>Non Vegeterian</option>
                      </select>
                    </div>
                    {/* List Product */}
                    <div className="w-full">
                      <div className="relative">
                        <label>List Product</label>
                        <select
                          required
                          onChange={(e) => {
                            setPublish(e.target.value);
                          }}
                          className="w-full border border-lightBorder dark:border-darkBorder  outline-none focus:outline-0 px-4 py-2 rounded text-gray-400 mt-2 dark:bg-darkMode"
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
