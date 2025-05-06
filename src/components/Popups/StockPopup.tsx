"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { X } from "lucide-react";
import React, { useState } from "react";
import Loader from "../Loaders/Loader";

interface stockPopupProps {
  isVisible: boolean;
  onClose: () => void;
  productId: string;
  productName: string;
  totalStock: number;
}

const StockPopup = ({
  isVisible,
  onClose,
  productId,
  productName,
  totalStock,
}: stockPopupProps) => {
  const [newStock, setNewStock] = useState(totalStock);
  const queryClient = useQueryClient();

  async function editStock() {
    try {
      const response = await axios.put("../api/editStock", {
        productId,
        newStock,
      });
      if (response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log("Error editing the stock", error);
      return [];
    }
  }

  const editStockMutation = useMutation({
    mutationFn: editStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getStocks"] });
      onClose();
    },
  });

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editStockMutation.mutate();
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md p-6 mx-2 bg-white border rounded-lg shadow-lg dark:bg-neutral-800 border-neutral-700 lg:mx-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 text-2xl font-bold capitalize">
            Edit Product
          </h2>
          {/*cancel button */}
          <button
            onClick={() => onClose()}
            className="text-gray-500 cursor-pointer hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handelSubmit}>
          {/* Product Id */}
          <div>
            <label
              htmlFor="productId"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              required
              value={productId}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md outline-none cursor-not-allowed dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              readOnly
            />
          </div>
          {/* Product Name */}
          <div>
            <label
              htmlFor="productName"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              disabled
              value={productName}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>
          {/* Previous Stock */}
          <div>
            <label
              htmlFor="totalStock"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300 "
            >
              Previous Stock
            </label>
            <input
              type="number"
              id="totalStock"
              required
              disabled
              name="totalStock"
              value={totalStock}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md cursor-not-allowed dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>

          {/* In Stock */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              New Stock
            </label>
            <input
              id="inStock"
              name="inStock"
              required
              type="number"
              min={0}
              value={newStock}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewStock(
                Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
            />
          </div>

          {/* Save Changes */}
          <div className="flex justify-end pt-4 space-x-3">
            {/*cancel button */}
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
            >
              Cancel
            </button>
            {/* save button */}
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-green-600 rounded-md cursor-pointer hover:bg-green-700"
            >
              {editStockMutation.isPending ? (
                <Loader title="Updating..." />
              ) : (
                "Update Stock"
              )}
            </button>
          </div>
        </form>
      </div >
    </div >
  );
};

export default StockPopup;
