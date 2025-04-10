import { Images, ImageUp, X } from "lucide-react";
import React from "react";

const ImagePopup = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Images className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Edit Image</h1>
          </div>
          <button
            className="cursor-pointer focus:outline-none"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            required
            className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-3 file:mr-4 file:bg-gray-300 file:hover:bg-gray-200 file:text-black rounded"
          />
          <button className="p-2 border border-lightBorder dark:border-darkBorder text-green-500 hover:text-green-600  rounded cursor-pointer">
          <ImageUp />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImagePopup;
