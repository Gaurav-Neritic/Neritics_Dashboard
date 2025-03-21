"use client";
import axios from "axios";
import { X, SquarePen } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";

const StocksTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //edit popup
  const [editPopup, setEditPopup] = useState(false);
  const [productToEdit, setProductToEdit]: any = useState("");
  const [editForm, setEditForm]: any = useState({
    productId: "",
    productName: "",
    inStock: "",
    totalStock: "",
  });

  // handleEdit
  const handleEdit = ({
    _id,
    title,
    stock,
  }: {
    _id: string;
    title: string;
    // Make the stock type number in model
    stock: string;
  }) => {
    setProductToEdit(_id);
    setEditForm({
      productId: _id,
      productName: title,
      inStock: stock,
      totalStock: stock,
    });
    setEditPopup(true);
  };

  const handelEditStock = async (_id: string, newStock: string) => {
    try {
      setLoading(true);
      const response = await axios.put("api/editStock", {
        _id,
        newStock,
      });
      if (response.data.data) {
        toast.success("Stock Updated");
        setProductToEdit(null);
        setLoading(false);
        setEditPopup(false);
        getProductsStocks();
      } else {
        toast.error("Failed to update the stock");
        setLoading(false);
        setEditPopup(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error editing the stock", error);
      toast.error("Failed to update the stock");
      setEditPopup(false);
    }
    setEditPopup(false);
    setProductToEdit(null);
  };

  const cancelEdit = () => {
    setEditPopup(false);
    setProductToEdit(null);
  };

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value }: any = e.target;
    setEditForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function getProductsStocks() {
    try {
      const response = await axios.get("api/getProducts");

      if (response.data.data) {
        setProducts(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Failed to fetch the data");
        setProducts([]);
      }
    } catch (error) {
      console.log("Error Fetching Data: ", error);
      toast.error("Failed to fetch the data");
    }
  }

  useEffect(() => {
    getProductsStocks();
  }, []);

  return (
    <section className="p-5">
      <h1 className="text-2xl font-bold mb-6">Stocks In Inventory</h1>
      {/* Products List */}
      <div className="border border-lightBorder dark:border-darkBorder  rounded">
        <div className=" py-3 px-5 grid grid-cols-8 place-items-center ">
          <h1 className="col-span-2 w-full truncate">Id</h1>
          <h1 className="col-span-3 w-full truncate">Name</h1>
          <h1 className="col-span-1 w-full truncate">In Stock</h1>
          <h1 className="col-span-1 w-full truncate">Total Stock</h1>
          <h1 className="col-span-1 w-full truncate">Update</h1>
        </div>
        <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
        {products.length !== 0 &&
          products.map(
            ({
              _id,
              title,
              stock,
            }: {
              _id: string;
              title: string;
              stock: string;
            }) => (
              <div
                key={_id}
                className="px-5 py-3 grid grid-cols-8 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50"
              >
                <h1 className="col-span-2 w-full truncate">{_id}</h1>
                <h1 className="col-span-3 w-full truncate">{title}</h1>
                <h1 className="col-span-1 w-full truncate">
                  {stock.trim() === "0" || stock.length === 0 ? "No" : "Yes"}
                </h1>
                <h1 className="col-span-1 w-full truncate">{stock}</h1>
                <div className="col-span-1 w-full truncate">
                  <button
                    className="cursor-pointer flex items-center"
                    onClick={() =>
                      handleEdit({
                        _id,
                        title,
                        stock,
                      })
                    }
                  >
                    <SquarePen className="text-green-500 hover:text-green-600 " />
                  </button>
                </div>
              </div>
            )
          )}
      </div>

      {/* Edit Product Popup */}
      {editPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold gap-2 flex items-center capitalize">
                Edit Product
              </h2>
              {/*cancel button */}
              <button
                onClick={cancelEdit}
                className="text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-300 dark:hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                handelEditStock(editForm.productId, editForm.inStock);
              }}
            >
              {/* Product Id */}
              <div>
                <label
                  htmlFor="productId"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  id="productId"
                  name="productId"
                  required
                  value={editForm.productId}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white cursor-not-allowed outline-none"
                  readOnly
                />
              </div>
              {/* Product Name */}
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  disabled
                  value={editForm.productName}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white cursor-not-allowed"
                />
              </div>
              {/* Previous Stock */}
              <div>
                <label
                  htmlFor="totalStock"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Previous Stock
                </label>
                <input
                  type="number"
                  id="totalStock"
                  required
                  disabled
                  name="totalStock"
                  value={editForm.totalStock}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                />
              </div>

              {/* In Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Stock
                </label>
                <input
                  id="inStock"
                  name="inStock"
                  required
                  type="number"
                  min={0}
                  value={editForm.inStock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white"
                />
              </div>

              {/* Save Changes */}
              <div className="flex justify-end space-x-3 pt-4">
                {/*cancel button */}
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer"
                >
                  Cancel
                </button>
                {/* save button */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
                >
                  {loading ? <Loader title="Updating..." /> : "Update Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default StocksTable;
