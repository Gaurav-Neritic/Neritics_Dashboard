"use client";
import DeletePoup from "@/components/Popups/DeletePoup";
import Loader from "@/components/Loaders/Loader";
import ProductCard from "@/components/ProductPage/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SlidersHorizontal, Trash2, FilePenLine, LayoutGrid, Logs, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

interface productDataProps {
  _id: string;
  title: string;
  price: number;
  category: string;
  stock: number;
  discount: number;
  image: [string];
  listingStatus: boolean;
}

const ProductList = () => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [listView, setListView] = useState(true);
  const [filter, setFilter] = useState("");
  const [prodId, setProdId] = useState("");
  const [name, setName] = useState("");
  const [searchText, setSearchText] = useState("")

  async function getProducts() {
    try {
      const response = await axios.get("api/getProducts");
      if (response.data.data) {
        return response.data.data
      }
      return [];
    } catch (error: any) {
      error.response.status === 401
        ? toast.success("No Products Found")
        : toast.error("Failed to fetch the product data");
      return [];
    }
  }

  const handleSearch = (e: any) => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
    const filtered = getProductsData.filter(
      (product: any) =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product._id.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const { data: getProductsData = [], isLoading, isError } = useQuery({
    queryFn: getProducts, queryKey: ['getProductsData'], refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (filter === "Listed") {
      setFilteredProducts(
        getProductsData.filter((product: any) => product.listingStatus === true)
      );
    } else if (filter === "UnListed") {
      setFilteredProducts(
        getProductsData.filter((product: any) => product.listingStatus === false)
      );
    } else {
      setFilteredProducts(getProductsData);
    }
  }, [filter]);

  // Excel Download handle
  const handleExcelExport = () => {
    try {
      const excelData = filteredProducts.map((product: any) => ({
        ID: product._id,
        Title: product.title,
        Images: product.image[0],
        Price: product.price,
        Stock: product.stock,
        Discount: product.discount,
        Status: product.listingStatus ? "Listed" : "Unlisted",
      }));
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const columnWidths = [
        { wch: 24 },
        { wch: 40 },
        { wch: 100 },
        { wch: 10 },
        { wch: 15 },
        { wch: 10 },
        { wch: 10 },
        { wch: 15 },
      ];
      worksheet["!cols"] = columnWidths;
      worksheet["!rows"] = Array(excelData.length).fill({ hpt: 30 });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Product Lists");

      XLSX.writeFile(workbook, "Product_Lists.xlsx");
      toast.success("Excel file downloaded successfully");
    } catch (error) {
      toast.error("Failed to download Excel file");
    }
  };

  useEffect(() => {
    setFilteredProducts(getProductsData);
  }, [getProductsData.length])


  return (
    <section className="p-5">
      <div className="border px-4 py-2 rounded border-lightBorder dark:border-darkBorder ">
        <div className="flex items-center justify-start gap-3">
          <SlidersHorizontal />
          <select className="border  border-lightBorder dark:border-darkBorder px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Filter One</option>
            <option className="dark:text-black">Option 2</option>
            <option className="dark:text-black">Option 3</option>
            <option className="dark:text-black">Option 4</option>
          </select>
          <select className="border  border-lightBorder dark:border-darkBorder px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Type</option>
            <option className="dark:text-black">Type 2</option>
            <option className="dark:text-black">Type 3</option>
            <option className="dark:text-black">Type 4</option>
          </select>

          <select className="border  border-lightBorder dark:border-darkBorder px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Range</option>
            <option className="dark:text-black">From 1 to 2</option>
            <option className="dark:text-black">From 2 to 3</option>
            <option className="dark:text-black">From 3 to 4</option>
          </select>

          <select className="border  border-lightBorder dark:border-darkBorder px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Time</option>
            <option className="dark:text-black">Recently</option>
            <option className="dark:text-black">Frequently</option>
            <option className="dark:text-black">Earlier</option>
          </select>

          <select onChange={(e) => { setFilter(e.target.value); }}
            className="border border-lightBorder dark:border-darkBorder px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">All</option>
            <option className="dark:text-black">Listed</option>
            <option className="dark:text-black">UnListed</option>
          </select>
        </div>
      </div>

      {/*    Product Button (ListView & CardView) */}
      <div className="py-5 flex justify-between items-center">
        <div>
          <h1 className="text-xl uppercase font-semibold">Product Lists</h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchText}
            onChange={handleSearch}
            className="py-2 px-4 border border-gray-300 dark:border-darkBorder rounded dark:bg-neutral-700 outline-none text-sm"
          />
          <button
            onClick={handleExcelExport}
            className={`flex items-center justify-center  gap-2 px-3 py-2 bg-green-700  text-white rounded ${filteredProducts?.length === 0 ? "hidden" : "block  cursor-pointer hover:bg-green-600"}`}
            disabled={filteredProducts?.length === 0}
            title="Download Excel"
          >
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </button>



          <div className="flex gap-3">
            <button
              title="Grid View"
              onClick={() => setListView(false)}
              className=" flex gap-2 p-2 border border-lightBorder dark:border-darkBorder rounded cursor-pointer"
            >
              <LayoutGrid className="h-[20px] w-[20px]" />
            </button>
            <button
              title="List View"
              onClick={() => setListView(true)}
              className=" flex gap-2 p-2 border border-lightBorder dark:border-darkBorder rounded cursor-pointer"
            >
              <Logs className="h-[20px] w-[20px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="py-2">
        <div className="p-1 border border-lightBorder dark:border-darkBorder  rounded ">
          <div className={` ${listView ? "block" : "hidden py-0 px-0"} m-5  border border-lightBorder dark:border-darkBorder  rounded`} >
            <div className={`py-3 px-5 gap-5 grid grid-cols-9 place-items-center `} >
              <h1 className="w-full truncate col-span-1">Products Id</h1>
              <h1 className="w-full truncate col-span-2">Products Name</h1>
              <div className="w-full col-span-1 place-items-center">
                <h1 className="truncate ">Image</h1>
              </div>
              <h1 className="w-full truncate col-span-1">Price</h1>
              <h1 className="w-full truncate col-span-1">Category</h1>
              <div className="w-full col-span-1 place-items-center">
                <h1 className="truncate ">Publish</h1>
              </div>
              <div className="w-full col-span-1 place-items-center">
                <h1 className="truncate ">Stock</h1>
              </div>
              <h1 className="w-full truncate col-span-1">Action</h1>
            </div>
            <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
            <div>
              {/* Product Item */}
              <div className={`${listView ? "block" : "hidden"}`}>
                {/*  */}
                {isLoading && <div className="p-5"><Loader title="Fetching" /></div>}
                {(!isLoading && filteredProducts.length === 0) && <div className="flex items-center justify-center py-5 uppercase font-semibold"><h1>Products Not Found</h1></div>}
                {isError && <div className="p-5 flex items-center justify-center"><h1>Something Went Wrong</h1></div>}
                {filteredProducts?.length !== 0 &&
                  filteredProducts?.map(
                    ({
                      _id,
                      title,
                      price,
                      category,
                      stock,
                      listingStatus,
                      image,
                    }: productDataProps) => {
                      return (
                        <div
                          key={_id}
                          className="py-3 px-5 grid grid-cols-9 place-items-start gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50"
                        >
                          <h1 className="col-span-1 w-full truncate " title={_id}>{_id}</h1>
                          <h1 className="col-span-2 line-clamp-2 capitalize">
                            {title}
                          </h1>
                          <div className="col-span-1 w-full place-items-center">
                            <Image
                              src={image[0] || "/placeholder.jpg"}
                              width={20}
                              height={20}
                              alt="img"
                              className=" h-10 w-10 rounded bg-lightBorder dark:bg-darkBorder"
                            />
                          </div>

                          <h1 className="col-span-1">₹ {price}</h1>
                          <h1 className="col-span-1">{category}</h1>
                          <div className="col-span-1 w-full place-items-center">
                            <h1>{listingStatus ? "🟢" : "🔴"}</h1>
                          </div>
                          <div className="col-span-1 w-full place-items-center">
                            <h1 className="col-span-1">{stock}</h1>
                          </div>

                          <div className="flex gap-4 col-span-1">
                            <Link
                              href={`/productList/${_id}`}
                              className="text-green-400 hover:text-green-500"
                            >
                              <FilePenLine className="text-sm cursor-pointer" />
                            </Link>
                            <button
                              className="text-red-400 hover:text-red-500"
                              onClick={() => {
                                setProdId(_id);
                                setName(title);
                                setDeletePopup(true);
                              }}
                            >
                              <Trash2 className="text-sm cursor-pointer" />
                            </button>
                          </div>
                          {
                            <DeletePoup
                              id={prodId}
                              isVisible={deletePopup}
                              prodName={name}
                              onClose={() => {
                                setDeletePopup(false);
                              }} />
                          }
                        </div>
                      );
                    }
                  )}

                {/*  */}
              </div>
            </div>
          </div>

          {/* Grid View */}
          <div className={`${listView ? "hidden" : "block "}`}>
            <div className="grid grid-cols-3 gap-5 p-5">
              {filteredProducts.length !== 0 &&
                filteredProducts.map(
                  ({
                    _id,
                    title,
                    price,
                    category,
                    stock,
                    discount,
                    listingStatus,
                    image,
                  }: productDataProps) => {
                    return (
                      <ProductCard
                        key={_id}
                        _id={_id}
                        image={image}
                        title={title}
                        price={price}
                        stock={stock}
                        category={category}
                        listingStatus={listingStatus} />
                    );
                  }
                )}
            </div>
            {filteredProducts.length === 0 && (
              <div className="place-items-center uppercase text-gray-600 font-semibold py-10">
                <h1>No Products to display</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </section >
  );
};

export default ProductList;
