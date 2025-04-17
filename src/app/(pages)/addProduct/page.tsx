"use client";
import Image from "next/image";
import Loader from "@/components/Loaders/Loader";
import Input from "@/components/ProductForm/Input";
import InputNumber from "@/components/ProductForm/InputNumber";
import Select from "@/components/ProductForm/Select";
import TextArea from "@/components/ProductForm/TextArea";
import axios from "axios";
import { AppWindowMac, Eraser, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    category: "",
    type: "",
    stock: "",
    gender: "",
    ageRange: "",
    brandName: "",
    form: "",
    isAyurvedic: "",
    container: "",
    coo: "",
    hsnCode: "",
    gst: "",
    shelfLife: "",
    suitableFor: "",
    publish: "",
    benefits: "",
    alergyInfo: "",
    specialIngredients: "",
    coating: "",
    height: "",
    width: "",
    weight: "",
    categoryData: [],
    typeData: [],
    formData: [],
    containerData: [],
    countryData: [],
  });
  //image
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [primaryImage, setPrimaryImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);
  const [thirdImage, setThirdImage] = useState<File | null>(null);
  const [fourthImage, setFourthImage] = useState<File | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e: FormEvent) => {
    // Taking the addOn Info and setting it in an array
    const benefitArray: string[] = productData.benefits
      .split(",")
      .map((benefit: string) => benefit.trim())
      .filter((benefit: string) => benefit.length > 0);

    const specialIngredientsArray: string[] = productData.specialIngredients
      .split(",")
      .map((special: string) => special.trim())
      .filter((special: string) => special.length > 0);

    const alergyInfoArray: string[] = productData.alergyInfo
      .split(",")
      .map((allergy: string) => allergy.trim())
      .filter((allergy: string) => allergy.length > 0);

    const coatingArray: string[] = productData.coating
      .split(",")
      .map((coate: string) => coate.trim())
      .filter((coate: string) => coate.length > 0);

    const formData = new FormData();
    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("discount", productData.discount);
    formData.append("quantity", productData.quantity);
    formData.append("category", productData.category);
    formData.append("type", productData.type);
    formData.append("stock", productData.stock);
    //image
    if (mainImage) formData.append("mainImage", mainImage);
    if (primaryImage) formData.append("primaryImage", primaryImage);
    if (secondImage) formData.append("secondImage", secondImage);
    if (thirdImage) formData.append("thirdImage", thirdImage);
    if (fourthImage) formData.append("fourthImage", fourthImage);

    formData.append("brandName", productData.brandName);
    formData.append("form", productData.form);
    formData.append("container", productData.container);
    formData.append("gst", productData.gst);
    formData.append("hsnCode", productData.hsnCode);
    formData.append("coo", productData.coo);
    formData.append("shelfLife", productData.shelfLife);
    formData.append("isAyurvedic", productData.isAyurvedic);
    formData.append("suitableFor", productData.suitableFor);
    formData.append("publish", productData.publish);
    formData.append("benefits", JSON.stringify(benefitArray));
    formData.append(
      "specialIngerdients",
      JSON.stringify(specialIngredientsArray)
    );
    formData.append("allergy", JSON.stringify(alergyInfoArray));
    formData.append("coating", JSON.stringify(coatingArray));
    formData.append("height", productData.height);
    formData.append("width", productData.width);
    formData.append("weight", productData.weight);
    formData.append("gender", productData.gender);
    formData.append("ageRange", productData.ageRange);
    try {
      // Checks if the selected types and categorys are defaults
      if (productData.category === "Category")
        return (productData.category = "");
      if (productData.type === "Type") return (productData.type = "");
      if (productData.isAyurvedic === "Nature Of Med")
        return (productData.isAyurvedic = "");
      if (productData.container === "Container Type")
        return (productData.container = "");
      if (productData.suitableFor === "Edible For")
        return (productData.suitableFor = "");
      if (productData.publish === "Listing Status")
        return (productData.publish = "");
      if (productData.ageRange === "Age Range")
        return (productData.ageRange = "");
      if (productData.form === "Form") return (productData.form = "");

      e.preventDefault();
      setLoading(true);
      const response = await axios.post("api/addProduct", formData);
      if (response.data.data) {
        toast.success("Product added");
        handelClearFields();
        setLoading(false);
        router.push('/productList')
      } else {
        setLoading(false);
        toast.error("Failed to add the product");
      }
    } catch (error: unknown) {
      setLoading(false);
      console.log("Error Adding the product !", error);
      toast.error("Error Adding the product !");
    }
  };

  const handelClearFields = () => {
    try {
      (productData.title = ""),
        (productData.description = ""),
        (productData.price = ""),
        (productData.discount = ""),
        (productData.quantity = ""),
        (productData.category = ""),
        (productData.type = ""),
        (productData.stock = ""),
        (productData.gender = ""),
        (productData.ageRange = ""),
        (productData.brandName = ""),
        (productData.form = ""),
        (productData.isAyurvedic = ""),
        (productData.container = ""),
        (productData.coo = ""),
        (productData.hsnCode = ""),
        (productData.gst = ""),
        (productData.shelfLife = ""),
        (productData.suitableFor = ""),
        (productData.publish = ""),
        (productData.benefits = ""),
        (productData.alergyInfo = ""),
        (productData.specialIngredients = ""),
        (productData.coating = ""),
        (productData.height = ""),
        (productData.width = ""),
        (productData.weight = ""),
        setMainImage(null),
        setPrimaryImage(null),
        setSecondImage(null),
        setThirdImage(null),
        setFourthImage(null),
        toast.success("All Fields Cleared");
    } catch (error) {
      setLoading(false);
      toast.error("Error Clearing The Fields");
      toast.error("Try Refreshing");
    }
  };
  // Image Preview
  const getPreviewUrl = (file: File | null) => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
  };

  const handelChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get("api/getCategory");

        if (response.data.data) {
          setProductData((prevState) => ({
            ...prevState,
            categoryData: response.data.data,
          }));
        } else {
          toast.error("Error Fetching the category");
        }
      } catch (error) {
        console.log("Error Fetching the category", error);
        toast.error("Error Fetching the category");
      }
    }

    async function getTypes() {
      try {
        const response = await axios.get("api/getTypes");

        if (response.data.data) {
          setProductData((prevState) => ({
            ...prevState,
            typeData: response.data.data,
          }));
        } else {
          toast.error("Error Fetching the type");
        }
      } catch (error) {
        console.log("Error Fetching the type", error);
        toast.error("Error Fetching the type");
      }
    }

    async function getProductForms() {
      try {
        const response = await axios.get("api/getFormTypes");

        if (response.data.data) {
          setProductData((prevState) => ({
            ...prevState,
            formData: response.data.data,
          }));
        } else {
          toast.error("Error Fetching the type");
        }
      } catch (error) {
        console.log("Error Fetching the type", error);
        toast.error("Error Fetching the type");
      }
    }

    async function getContainerTypes() {
      try {
        const response = await axios.get("api/getContainerTypes");

        if (response.data.data) {
          setProductData((prevState) => ({
            ...prevState,
            containerData: response.data.data,
          }));
        } else {
          toast.error("Error Fetching the container type");
        }
      } catch (error) {
        console.log("Error Fetching the container type", error);
        toast.error("Error Fetching the container type");
      }
    }

    async function getCountries() {
      try {
        const response = await axios.get("api/getCountries");

        if (response.data.data) {
          setProductData((prevState) => ({
            ...prevState,
            countryData: response.data.data,
          }));
        } else {
          toast.error("Error Fetching the country");
        }
      } catch (error) {
        console.log("Error Fetching the country ", error);
        toast.error("Error Fetching the country ");
      }
    }

    getTypes();
    getCategories();
    getProductForms();
    getContainerTypes();
    getCountries();
  }, []);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
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
                  <Input
                    name={"title"}
                    value={productData.title}
                    placeholder={"Enter Product Name"}
                    onChange={handelChange}
                  />
                </div>

                <div className="w-full py-2">
                  <label>Content ( Description )</label>
                  <TextArea
                    name={"description"}
                    value={productData.description}
                    placeholder={"Enter Product Description"}
                    onChange={handelChange}
                    rows={8}
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

            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <label>Product Category</label>
                  <Select
                    name={"category"}
                    value={productData.category}
                    onChange={handelChange}
                    options={productData.categoryData}
                    defaultOption="Category"
                  />
                </div>

                <div className="w-full py-2">
                  <label>Product Type</label>
                  <Select
                    name={"type"}
                    value={productData.type}
                    onChange={handelChange}
                    options={productData.typeData}
                    defaultOption={"Type"}
                  />
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    {/* Brand Name */}
                    <div>
                      <label>Brand Name</label>
                      <Input
                        name={"brandName"}
                        value={productData.brandName}
                        placeholder={"Enter Brand"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* Form */}
                    <div className="w-full">
                      <label>Form</label>
                      <Select
                        name={"form"}
                        value={productData.form}
                        onChange={handelChange}
                        options={productData.formData}
                        defaultOption={"Form"}
                      />
                    </div>

                    {/* HSN Code and GST  */}
                    <div>
                      <label>Ayurvedic</label>
                      <Select
                        name={"isAyurvedic"}
                        value={productData.isAyurvedic}
                        onChange={handelChange}
                        options={[{ label: "True" }, { label: "False" }]}
                        defaultOption={"Nature of Med"}
                      />
                    </div>
                    {/* Container */}
                    <div>
                      <label>Container</label>
                      <Select
                        name={"container"}
                        value={productData.container}
                        onChange={handelChange}
                        options={productData.containerData}
                        defaultOption={"Container Type"}
                      />
                    </div>
                    {/* Quantity In Container */}
                    <div>
                      <label>Quantity In Container </label>
                      <InputNumber
                        name={"quantity"}
                        value={productData.quantity}
                        placeholder={"Quantity"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* Total Stock */}
                    <div>
                      <label>Total Stock</label>
                      <InputNumber
                        name={"stock"}
                        value={productData.stock}
                        placeholder={"Stock"}
                        onChange={handelChange}
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
                  <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    <div>
                      <label>Height ( In cm )</label>
                      <InputNumber
                        name={"height"}
                        value={productData.height}
                        placeholder={"Height"}
                        onChange={handelChange}
                      />
                    </div>
                    <div>
                      <label>Width ( In cm )</label>
                      <InputNumber
                        name={"width"}
                        value={productData.width}
                        placeholder={"Width"}
                        onChange={handelChange}
                      />
                    </div>
                    <div>
                      <label>Weight ( In gm )</label>
                      <InputNumber
                        name={"weight"}
                        value={productData.weight}
                        placeholder={"Weight"}
                        onChange={handelChange}
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    <div>
                      <label>Price (MRP)</label>
                      <InputNumber
                        name={"price"}
                        value={productData.price}
                        placeholder={"Price"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* Discount */}
                    <div>
                      <label>Discount ( In ₹ )</label>
                      <InputNumber
                        name={"discount"}
                        value={productData.discount}
                        placeholder={"Discount"}
                        onChange={handelChange}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {/* Main Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300">
                        * Main Image
                      </label>
                      <input
                        placeholder="Main Image"
                        type="file"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setMainImage(e.target.files?.[0] || null);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {mainImage && (
                        <Image
                          src={getPreviewUrl(mainImage) || ""}
                          width={20}
                          height={20}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setPrimaryImage(e.target.files?.[0] || null);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {primaryImage && (
                        <Image
                          src={getPreviewUrl(primaryImage) || ""}
                          width={20}
                          height={20}
                          alt="Main Image Preview"
                          className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
                        />
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {/* Second Image */}
                    <div className="relative">
                      <label className="text-neutral-700 dark:text-gray-300 z-20">
                        * 2<sup>nd</sup> Image
                      </label>
                      <input
                        type="file"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSecondImage(e.target.files?.[0] || null);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {secondImage && (
                        <Image
                          src={getPreviewUrl(secondImage) || ""}
                          width={20}
                          height={20}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setThirdImage(e.target.files?.[0] || null);
                        }}
                        className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode  dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                      />
                      {thirdImage && (
                        <Image
                          src={getPreviewUrl(thirdImage) || ""}
                          width={20}
                          height={20}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFourthImage(e.target.files?.[0] || null);
                      }}
                      className="w-full text-gray-700 font-medium text-sm bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded
                        dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500"
                    />
                    {fourthImage && (
                      <Image
                        src={getPreviewUrl(fourthImage) || ""}
                        width={20}
                        height={20}
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
              <h2 className="text-lg font-semibold antialiased">
                Targeted For
              </h2>
            </div>
            {/*  Price (MRP)  */}
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    <div>
                      <label>Gender (Both/Male/Female)</label>
                      <Select
                        name={"gender"}
                        value={productData.gender}
                        onChange={handelChange}
                        options={[
                          { label: "Male" },
                          { label: "Female" },
                          { label: "Both" },
                        ]}
                        defaultOption={"Gender"}
                      />
                    </div>
                    {/* Discount */}
                    <div>
                      <label>Age Range (From 18 )</label>
                      <Select
                        name={"ageRange"}
                        value={productData.ageRange}
                        onChange={handelChange}
                        options={[
                          { label: "1 to 18" },
                          { label: "18 to 65" },
                          { label: "65 and Above" },
                        ]}
                        defaultOption={"Age Range"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Additional Info  */}
          <div className="py-5">
            <div className="pb-2">
              <h2 className="text-lg font-semibold antialiased">
                Additional Info {"  "}( Separate by " , " )
              </h2>
            </div>
            <div className="border rounded border-lightBorder dark:border-darkBorder  p-4 ">
              <div>
                <div className="w-full py-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    {/* Benefit 1  */}
                    <div>
                      <label>Benefits </label>
                      <TextArea
                        name={"benefits"}
                        value={productData.benefits}
                        placeholder={"Enter Benefits"}
                        onChange={handelChange}
                        rows={3}
                      />
                    </div>
                    {/* Benefit 2  */}
                    <div>
                      <label>Special Ingredients</label>
                      <TextArea
                        name={"specialIngredients"}
                        value={productData.specialIngredients}
                        placeholder={"Enter Special Ingredients"}
                        onChange={handelChange}
                        rows={3}
                      />
                    </div>
                    {/* Benefit 3  */}
                    <div>
                      <label>Allergy Info</label>
                      <TextArea
                        name={"alergyInfo"}
                        value={productData.alergyInfo}
                        placeholder={"Enter Allergy Info "}
                        onChange={handelChange}
                        rows={3}
                      />
                    </div>
                    {/* Benefit 4  */}
                    <div>
                      <label>Coating</label>
                      <TextArea
                        name={"coating"}
                        value={productData.coating}
                        placeholder={"Enter Coating"}
                        onChange={handelChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center text-sm py-3 text-gray-600 animate-pulse">
                <sup>*</sup>Note ( Use "," comma for adding multiple values)
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:place-items-center ">
                    {/* Country Of Origin */}
                    <div>
                      <label>Country Of Origin</label>
                      <Select
                        name={"coo"}
                        value={productData.coo}
                        onChange={handelChange}
                        options={productData.countryData}
                        defaultOption={"Country"}
                      />
                    </div>

                    {/* HSN Code and GST  */}
                    <div>
                      <label>HSN Code</label>
                      <InputNumber
                        name={"hsnCode"}
                        value={productData.hsnCode}
                        placeholder={"HSN Code"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* GST  */}
                    <div>
                      <label>GST (%)</label>
                      <InputNumber
                        name={"gst"}
                        value={productData.gst}
                        placeholder={"GST"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* Shelf Life */}
                    <div>
                      <label>Shelf Life ( In Months )</label>
                      <Input
                        name={"shelfLife"}
                        value={productData.shelfLife}
                        placeholder={"Shelf Life"}
                        onChange={handelChange}
                      />
                    </div>
                    {/* Suitable For */}
                    <div>
                      <label>Suitable For</label>
                      <Select
                        name={"suitableFor"}
                        value={productData.suitableFor}
                        onChange={handelChange}
                        options={[
                          { label: "Vegeterian" },
                          { label: "Non Vegeterian" },
                        ]}
                        defaultOption="Edible For"
                      />
                    </div>
                    {/* List Product */}
                    <div className="w-full">
                      <div className="relative">
                        <label>List Product</label>
                        <Select
                          name={"publish"}
                          value={productData.publish}
                          onChange={handelChange}
                          options={[{ label: "Publish" }, { label: "UnList" }]}
                          defaultOption="Listing Status"
                        />
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
