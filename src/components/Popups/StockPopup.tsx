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
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full mx-2 lg:mx-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold gap-2 flex items-center capitalize">
            Edit Product
          </h2>
          {/*cancel button */}
          <button
            onClick={() => onClose()}
            className="text-gray-500 hover:text-gray-700 cursor-pointer dark:text-gray-300 dark:hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handelSubmit}>
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
              value={productId}
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white cursor-not-allowed outline-none text-sm"
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
              value={productName}
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white cursor-not-allowed text-sm"
            />
          </div>
          {/* Previous Stock */}
          <div>
            <label
              htmlFor="totalStock"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 "
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
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white cursor-not-allowed text-sm"
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
              value={newStock}
              onChange={(e: any) => setNewStock(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-white text-sm"
            />
          </div>

          {/* Save Changes */}
          <div className="flex justify-end space-x-3 pt-4">
            {/*cancel button */}
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer text-sm"
            >
              Cancel
            </button>
            {/* save button */}
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer text-sm"
            >
              {editStockMutation.isPending ? (
                <Loader title="Updating..." />
              ) : (
                "Update Stock"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockPopup;
