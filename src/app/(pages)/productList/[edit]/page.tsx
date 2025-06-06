/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loader from "@/components/Loaders/Loader";
import EditImagePopup from "@/components/ProductPage/EditImagePopup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FilePenLine, ImagePlus, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = ({ params }: any) => {
  const router = useRouter();
  const { edit }: any = use(params);
  const [details, setDetails]: any = useState({});

  const [name, setName] = useState("");
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
  const [imgIndex, setImgIndex] = useState(0);
  const [benefits, setBenefits] = useState("");
  const [alergyInfo, setAlergyInfo] = useState("");
  const [specialIngredients, setSpecialIngredients] = useState("");
  const [coating, setCoating] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");

  const [categoryData, setCategoryData] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [containerData, setContainerData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const queryClient = useQueryClient();

  // image edit popup
  const [popup, setPopup] = useState(false);

  async function getEditableProduct() {
    try {
      const id = await edit;
      const response = await axios.post("../api/getProductDetail", { id });

      if (response.data.data) {
        setDetails(response.data.data);
      } else {
        toast.error("Error Fetching Data");
      }
    } catch (error) {
      console.log("Error Fetching products data : ", error);
      toast.error("Error Fetching Data");
    }
  }

  // Taking the addOn Info and setting it in an array

  async function updateProduct() {
    try {
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
        benefits,
        specialIngredients,
        alergyInfo,
        coating,
        height,
        width,
        weight,
        gender,
        ageRange,
      };
      setLoading(true);
      const response = await axios.put("../api/editProduct", { data });

      if (response.data.data) {
        toast.success("Product Updated Successfully");
        setLoading(false);
      } else {
        toast.error("Error Updating Data");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Updating products data : ", error);
      toast.error("Error Updating Data");
    }
  }

  const handelUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      router.push("/productList");
      queryClient.invalidateQueries({ queryKey: ["getProductsData"] });
    },
  });

  async function getCategories() {
    try {
      const response = await axios.get("../api/getCategory");

      if (response.data.data) {
        setCategoryData(response.data.data);
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
      const response = await axios.get("../api/getTypes");

      if (response.data.data) {
        setTypeData(response.data.data);
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
      const response = await axios.get("../api/getFormTypes");

      if (response.data.data) {
        setFormData(response.data.data);
      } else {
        toast.error("Error Fetching the form types");
      }
    } catch (error) {
      console.log("Error Fetching the form types", error);
      toast.error("Error Fetching the form types");
    }
  }

  async function getContainerTypes() {
    try {
      const response = await axios.get("../api/getContainerTypes");

      if (response.data.data) {
        setContainerData(response.data.data);
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
      const response = await axios.get("../api/getCountries");

      if (response.data.data) {
        setCountryData(response.data.data);
      } else {
        toast.error("Error Fetching the country");
      }
    } catch (error) {
      console.log("Error Fetching the country ", error);
      toast.error("Error Fetching the country ");
    }
  }

  useEffect(() => {
    try {
      {
        getEditableProduct();
        getCategories();
        getTypes();
        getProductForms();
        getContainerTypes();
        getCountries();
      }
    } catch (error) {
      console.error("Error Fetching products data : ", error);
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
      setHeight(details?.dimensions[0]);
      setWidth(details?.dimensions[1]);
      setWeight(details?.dimensions[2]);
      setBenefits(details?.benefits);
      setAlergyInfo(details?.allergyInformation);
      setSpecialIngredients(details?.specialIngredients);
      setCoating(details?.coating);
      setAgeRange(details?.ageRange);
      setGender(details?.targetedGender);
    }
  }, [details]);

  return (
    <section className="p-5">
      <div>
        <div className="flex items-center justify-start gap-3 py-5">
          <div className="hidden p-1 border border-gray-500 rounded lg:block">
            <FilePenLine />
          </div>
          <div>
            <p className="text-sm font-normal text-gray-500">
              Product Id - {edit}
            </p>
            <h1 className="text-lg lg:text-[28px] font-semibold capitalize">
              Editing -{" "}
              <span className="text-sm font-normal lg:text-xl">{name}</span>
            </h1>
          </div>
        </div>
        <form onSubmit={handelUpdate}>
          <div className="p-2">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 ">
              <div className="border-gray-400 rounded ">
                {/* Product Description */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg antialiased font-semibold">
                      Description
                    </h2>
                  </div>

                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder">
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
                          className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                          className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Category */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg antialiased font-semibold">
                      Category
                    </h2>
                  </div>

                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <label>Product Category</label>
                        <select
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                          }}
                          required
                          className="block w-full px-4 py-2 mt-2 text-gray-400 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 dark:bg-darkMode"
                        >
                          <option>Select Category</option>

                          {categoryData.map(({ _id, label }) => {
                            return <option key={_id}>{label}</option>;
                          })}
                        </select>
                      </div>

                      <div className="w-full py-2">
                        <label>Product Type</label>
                        <select
                          value={type}
                          onChange={(e) => {
                            setType(e.target.value);
                          }}
                          className="block w-full px-4 py-2 mt-2 text-gray-400 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0"
                        >
                          <option>Select Type</option>
                          {typeData.map(({ _id, label }) => {
                            return <option key={_id}>{label}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product Features */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg antialiased font-semibold">
                      Features
                    </h2>
                  </div>

                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:place-items-center ">
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0"
                            />
                          </div>

                          <div className="w-full">
                            <label>Form</label>
                            <select
                              value={form}
                              onChange={(e) => {
                                setForm(e.target.value);
                              }}
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0"
                            >
                              <option>Select Form</option>
                              {formData.map(({ _id, label }) => {
                                return <option key={_id}>{label}</option>;
                              })}
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0"
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0"
                            >
                              <option>Container Type</option>
                              {containerData.map(({ _id, label }) => {
                                return <option key={_id}>{label}</option>;
                              })}
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                    <h2 className="text-lg antialiased font-semibold">
                      Dimension of Product
                    </h2>
                  </div>
                  {/* height  */}
                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:place-items-center ">
                          <div>
                            <label>Height ( In cm )</label>
                            <input
                              placeholder="Height in CM"
                              required
                              type="number"
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
                            />
                          </div>
                          <div>
                            <label>Width ( In cm )</label>
                            <input
                              placeholder="Width in CM"
                              required
                              type="number"
                              value={width}
                              onChange={(e) => {
                                setWidth(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
                            />
                          </div>
                          <div>
                            <label>Weight ( In gm )</label>
                            <input
                              placeholder="Weight in GM"
                              required
                              type="number"
                              value={weight}
                              onChange={(e) => {
                                setWeight(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0"
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
                    <h2 className="text-lg antialiased font-semibold">
                      Pricing
                    </h2>
                  </div>

                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
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
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                    <h2 className="text-lg antialiased font-semibold">
                      Images
                    </h2>
                  </div>
                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div className="relative grid grid-cols-2 gap-5 group">
                      {images.map((img: string, index: number) => {
                        return (
                          <div
                            key={index}
                            className="relative py-2 border rounded border-lightBorder dark:border-darkBorder place-items-center"
                          >
                            <div>
                              <Image
                                src={img}
                                width={200}
                                height={200}
                                loading="lazy"
                                alt="saved images"
                                className="border rounded h-18 w-18 border-lightBorder dark:border-darkBorder"
                              />
                            </div>

                            <div className="absolute top-1 right-1">
                              <button
                                onClick={() => {
                                  setImgIndex(index);
                                  setPopup(!popup);
                                }}
                                className="cursor-pointer text-lightBorder hover:text-darkBorder dark:hover:text-lightBorder dark:text-darkBorder"
                              >
                                <ImagePlus />
                              </button>
                            </div>

                            <h1>img {index + 1}</h1>
                            {popup && (
                              <EditImagePopup
                                id={edit}
                                isVisible={popup}
                                onClose={() => setPopup(false)}
                                imgIndex={imgIndex}
                                reRender={() => {
                                  return getEditableProduct();
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Gender and AgeRange */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg antialiased font-semibold">
                      Targeted For
                    </h2>
                  </div>
                  {/*  Price (MRP)  */}
                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:place-items-center ">
                          <div>
                            <label>Gender (Both/Male/Female)</label>
                            <select
                              required
                              value={gender}
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                              value={ageRange}
                              onChange={(e) => {
                                setAgeRange(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                    <h2 className="text-lg antialiased font-semibold">
                      Additional Info {"  "}( Separate by &quot; , &quot; )
                    </h2>
                  </div>
                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:place-items-center ">
                          {/* Benefit 1  */}
                          <div>
                            <label>Benefits </label>
                            <textarea
                              placeholder="Enter Benefits "
                              required
                              value={benefits}
                              rows={3}
                              onChange={(e) => {
                                setBenefits(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                                setSpecialIngredients(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                                setAlergyInfo(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                                setCoating(e.target.value);
                              }}
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 " />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center py-3 text-sm text-gray-600 dark:text-gray-200 animate-pulse">
                      <sup>*</sup>Note ( Use &quot;,&quot; comma for adding multiple
                      values)
                    </div>
                  </div>
                </div>
                {/* Product Manufacturing */}
                <div className="py-5">
                  <div className="pb-2">
                    <h2 className="text-lg antialiased font-semibold">
                      Manufacturing
                    </h2>
                  </div>

                  <div className="p-4 border rounded border-lightBorder dark:border-darkBorder ">
                    <div>
                      <div className="w-full py-2">
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:place-items-center ">
                          <div>
                            <label>Country Of Origin</label>
                            <select
                              value={coo}
                              onChange={(e) => {
                                setCoo(e.target.value);
                              }}
                              required
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 dark:bg-darkMode"
                            >
                              <option>Select Country</option>
                              {countryData.map(({ _id, label }) => {
                                return <option key={_id}>{label}</option>;
                              })}
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
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0 "
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
                              className="block w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder focus:outline-0"
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
                              className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0"
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
                                className="w-full px-4 py-2 mt-2 border rounded outline-none border-lightBorder dark:border-darkBorder dark:bg-darkMode focus:outline-0 "
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
                <div className="py-3">
                  {category === "Select Category" ||
                    type === "Select Type" ||
                    isAyurvedic === "Nature Of Medicine" ||
                    container === "Container Type" ||
                    suitableFor === "Edible For" ||
                    gender === "Select Gender" ||
                    form === "Select Form" ||
                    ageRange === "Select Age Range" ||
                    publish === "Publishing Status" ||
                    coo === "Select Country" ? (
                    <div className="w-full px-4 py-2 text-center text-red-500 border rounded animate-bounce border-lightBorder dark:border-darkBorder">
                      Note : Please Select Valid Options Only
                    </div>
                  ) : (
                    <button
                      type="submit"
                      title="Save Updates"
                      className={`px-4 py-2 tex-sm border border-blue-300 hover:border-blue-300 hover:bg-blue-200 rounded bg-blue-100 text-blue-600 transition-all ease-linear duration-200 cursor-pointer dark:border-blue-400`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {loading ? "" : <Save className="w-5 h-5" />}
                        {loading ? <Loader title={"Saving..."} /> : "Save"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Page;