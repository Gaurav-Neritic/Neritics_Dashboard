"use client";
import axios from "axios";
import { Images, ImageUp, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface editImageProps {
  isVisible: boolean;
  onClose: () => void;
  imgIndex: number;
  id: string;
}

const EditImagePopup = ({
  isVisible,
  onClose,
  imgIndex,
  id,
}: editImageProps) => {
  const [editImage, setEditImage] = useState("");

  const handelEditUpload = async () => {
    const formData = new FormData();
    if (editImage) formData.append("editImage", editImage);
    formData.append("imgIndex", imgIndex.toString());
    formData.append("productId", id);
    try {
      const response = await axios.put("../api/editImage", formData);

      if (response.data.data) {
        toast.success("Image Updated Successfully");
      } else {
        toast.error("Error Updating the image");
      }
    } catch (error) {
      console.log("Error Updating the image");
      toast.error("Failed to upload try again!");
    }
  };

  // Image Preview
  const getPreviewUrl = (file: any) => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
  };

  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg w-fit">
        <div className="flex items-center justify-between p-5  gap-4">
          <div className="flex items-center justify-center  gap-4">
            <Images className="w-8 h-8 " />
            <h1 className="text-2xl font-semibold ">Edit Image</h1>
          </div>
          <div>
            <button onClick={() => onClose()} className="cursor-pointer">
              <X />
            </button>
          </div>
        </div>
        {/* Main Image */}
        <div className="p-5">
          {imgIndex === 0 && <label>* Main Image </label>}
          {imgIndex === 1 && <label>* First Image </label>}
          {imgIndex === 2 && <label>* Second Image </label>}
          {imgIndex === 3 && <label>* Third Image </label>}
          {imgIndex === 4 && <label>* Fourth Image </label>}
          <div className="flex justify-start items-start gap-6 mb-2 ">
            <input
              type="file"
              required
              onChange={(e: any) => {
                setEditImage(e.target.files[0]);
              }}
              className="p-2 w-fit cursor-pointer rounded border border-lightBorder dark:border-darkBorder"
            />
            <button
              onClick={handelEditUpload}
              className="p-2 border border-lightBorder dark:border-darkBorder text-green-500 hover:text-green-600  rounded cursor-pointer"
            >
              <ImageUp />
            </button>

            {editImage && (
              <img
                /* @ts-ignore */
                src={getPreviewUrl(editImage)}
                alt="Main Image Preview"
                className="mt-2  p-1 h-20 w-20 object-cover rounded-full bg-gray-100 dark:bg-neutral-700"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImagePopup;
