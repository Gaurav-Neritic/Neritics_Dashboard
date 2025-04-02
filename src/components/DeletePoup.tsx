
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import Loader from "./Loaders/Loader";

interface DeletePopupProps {
  isVisible: boolean;
  onClose: () => void;
  prodName: string;
  handelDelete: () => {}
}

const DeletePoup = ({
  isVisible,
  onClose,
  prodName,
  handelDelete
}: DeletePopupProps) => {
  const [loading, setLoading] = useState(false);



  if (!isVisible) return null;
  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
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
            className="px-4 py-2 border rounded-md border-lightBorder dark:border-darkBorder  dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            onClick={() => { handelDelete(); onClose() }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
          >
            {loading ? <Loader title="Deleting..." /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePoup;
