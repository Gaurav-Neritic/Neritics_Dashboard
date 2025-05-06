import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import Loader from "../Loaders/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePopupProps {
  isVisible: boolean;
  onClose: () => void;
  prodName: string;
  id: string;
}

const DeletePoup = ({ isVisible, onClose, prodName, id }: DeletePopupProps) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductsData"] });
    },
  });

  async function handelDelete(id: string) {
    deleteMutation.mutate(id);
    onClose();
  }

  async function deleteProduct(id: string) {
    try {
      setLoading(true);
      const response = await axios.delete("api/deleteProduct", {
        data: { id },
        fetchOptions: { cache: "no-store" },
      });

      if (response.data.data) {
        toast.success("Product Deleted Successfully");
        setLoading(false);
        return response.data.data;
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Deleting the product", error);
      toast.error("Error: Try after few minutes");
    }
  }

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mx-5 bg-opacity-50 backdrop-blur-sm lg:mx-0 ">
      <div className="w-full p-6 mx-4 bg-white border rounded-lg shadow-lg dark:bg-neutral-800 border-neutral-700 lg:max-w-md lg:mx-0">
        <div className="flex items-center mb-4 text-red-500">
          <AlertCircle className="mr-2" />
          <h2 className="text-xl font-bold">Confirm Delete</h2>
        </div>
        <div className="mb-6 text-gray-600 dark:text-gray-300 ">
          Are you sure you want to delete{" "}
          <span className="font-semibold capitalize">{`"${prodName}"`} </span>?
          This action cannot be undone.
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md border-lightBorder dark:border-darkBorder dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handelDelete(id);
            }}
            className="px-4 py-2 text-white bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
          >
            {loading ? <Loader title="Deleting..." /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePoup;
