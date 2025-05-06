/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { SquarePen, Search, Download } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";
import Image from "next/image";
import * as XLSX from "xlsx";
import { useQuery } from "@tanstack/react-query";
import StockPopup from "../Popups/StockPopup";

interface filterProps {
  _id: string;
  title: string;
  stock: number;
  image: [string];
}

const StocksTable = () => {
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("")
  const [totalStock, setTotalStock] = useState(0)

  // Searchbar
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  //edit popup
  const [editPopup, setEditPopup] = useState(false);

  async function getProductsStocks() {
    try {
      const response = await axios.get("api/getProducts");

      if (response.data.data) {
        setFilteredProducts(response.data.data);
        return response.data.data;
      } else {
        toast.error("Failed to fetch the data");
      }
    } catch (error: any) {

      if (error.response.status === 401) {
        toast.success("No Products Found")
      }
    }
  }

  //SearchBar Handle
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.target.value;
    setSearchText(text);
    const filtered = getStocks.filter(
      (product: { title: string, _id: string }) =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product._id.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const { data: getStocks = [], isLoading, isError, } = useQuery({
    queryFn: getProductsStocks,
    queryKey: ["getStocks"],
    refetchOnWindowFocus: false,
  });

  // Excel Download handle
  const handleExcelExport = () => {
    try {
      const excelData = filteredProducts.map((product: { _id: string, title: string, stock: number }) => ({
        ID: product._id,
        Title: product.title,
        Stock: product.stock,
      }));
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const columnWidths = [{ wch: 24 }, { wch: 40 }, { wch: 10 }];
      worksheet["!cols"] = columnWidths;
      worksheet["!rows"] = Array(excelData.length).fill({ hpt: 20 });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "StockTable");

      XLSX.writeFile(workbook, "Stock_Data.xlsx");
      toast.success("Excel file downloaded successfully");
    } catch (error) {
      toast.error("Failed to download Excel file");
      console.error("Failed to download Excel file", error);
    }
  };

  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold">Stocks In Inventory</h1>
      <div className="flex items-center justify-between gap-2 mt-4 mb-6 md:flex-row">
        {/* Search Bar */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by product name or ID..."
            value={searchText}
            onChange={handleSearch}
            className="w-full py-2 pl-10 pr-4 text-sm border border-gray-300 rounded outline-none dark:border-darkBorder dark:bg-neutral-700"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
        <div>
          {/* Export Excel */}
          <button
            onClick={handleExcelExport}
            className={`flex items-center gap-2 px-3 py-2 bg-green-700  text-white rounded  ${filteredProducts.length === 0 ? "hidden" : "block  cursor-pointer hover:bg-green-600"} text-sm`}
            disabled={filteredProducts.length === 0}
            title="Download Excel">
            <span>Export</span>
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Products List */}
      <div className="overflow-x-auto border rounded border-lightBorder dark:border-darkBorder">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-lightBorder dark:border-darkBorder">
              <th className="px-2 py-3 text-sm font-semibold text-left uppercase lg:text-md">
                ID
              </th>
              <th className="px-2 py-3 text-sm font-semibold text-left uppercase lg:text-md ">
                Image
              </th>
              <th className="px-2 py-3 text-sm font-semibold text-left uppercase lg:text-md">
                Name
              </th>
              <th className="px-2 py-3 text-sm font-semibold text-center uppercase lg:text-md">
                In Stock
              </th>
              <th className="px-2 py-3 text-sm font-semibold uppercase text-centre lg:text-md">
                Total Stock
              </th>
              <th className="px-2 py-3 text-sm font-semibold text-center uppercase lg:text-md">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  <Loader title="Fetching" />
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={6} className="p-5 text-center">
                  <h1>Something Went Wrong</h1>
                </td>
              </tr>
            )}
            {!isLoading && filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="py-5 font-semibold text-center uppercase" >
                  <h1>Products Not Found</h1>
                </td>
              </tr>
            )}
            {filteredProducts.map(
              ({ _id, title, stock, image, }: filterProps) => (
                <tr
                  key={_id}
                  className="text-gray-500 border-b border-gray-200 last:border-b-0 dark:border-neutral-600 dark:text-gray-50">
                  <td className="px-2 py-3 text-sm" title={_id}>
                    <div className="truncate w-30">{_id}</div>
                  </td>

                  <td className="px-2 py-3 text-sm lg:text-md ">
                    <Image
                      src={image[0] || ""}
                      height={200}
                      width={200}
                      alt="img"
                      className="object-contain w-12 h-12 rounded ring ring-white" />
                  </td>
                  <td className="px-2 py-3 text-sm capitalize lg:text-md">
                    <div className="grid grid-row w-50">{title}</div>
                  </td>
                  <td className="px-2 py-3 text-sm text-center lg:text-md">
                    {stock <= 0 ? (<span className="text-red-500">🔴</span>)
                      : stock <= 10 ? (<span className="text-yellow-500">🟡</span>) : (<span className="text-green-500">🟢</span>)}
                  </td>
                  <td className="px-2 py-3 text-sm text-center lg:text-md">
                    {stock}
                  </td>
                  <td className="text-sm lg:text-md ">
                    <div className="flex items-center justify-center">
                      <button
                        className="cursor-pointer "
                        onClick={() => {
                          setEditPopup(true);
                          setProductId(_id);
                          setProductName(title);
                          setTotalStock(stock)
                        }}>
                        <SquarePen className="text-green-500 hover:text-green-600" />
                      </button>
                    </div>
                  </td>
                </tr>))}
          </tbody>
        </table>
      </div>
      {/* Edit Product Popup */}
      {
        editPopup && (
          <StockPopup
            isVisible={editPopup}
            onClose={() => { return setEditPopup(false); }}
            productId={productId}
            productName={productName}
            totalStock={totalStock} />
        )
      }
    </section >
  );
};

export default StocksTable;