"use client";
import axios from "axios";
import { Images, ImageUp, RotateCw, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface editImageProps {
  isVisible: boolean;
  onClose: () => void;
  imgIndex: number;
  id: string;
  reRender: () => {};
}

const EditImagePopup = ({
  isVisible,
  onClose,
  imgIndex,
  id,
  reRender,
}: editImageProps) => {
  const [editImage, setEditImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handelEditUpload = async () => {
    const formData = new FormData();
    formData.append("editImage", editImage);
    formData.append("imgIndex", imgIndex.toString());
    formData.append("productId", id);
    try {
      setLoading(true);
      const response = await axios.put("../api/editImage", formData);

      if (response.data.data) {
        toast.success("Image Updated Successfully");
        setLoading(false);
        reRender();
        onClose();
      } else {
        setLoading(false);
        toast.error("Error Updating the image");
        onClose();
      }
    } catch (error) {
      setLoading(false);
      console.log("Error Updating the image");
      toast.error("Failed to upload try again!");
      onClose();
    }
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
          {imgIndex === 1 && (
            <label>
              * 1 <sup>st</sup> Image{" "}
            </label>
          )}
          {imgIndex === 2 && (
            <label>
              * 2 <sup>nd</sup> Second Image{" "}
            </label>
          )}
          {imgIndex === 3 && (
            <label>
              * 3 <sup>rd</sup> Third Image{" "}
            </label>
          )}
          {imgIndex === 4 && (
            <label>
              * 4 <sup>th</sup> Fourth Image{" "}
            </label>
          )}
          <div className="flex justify-start items-start gap-6 my-4 ">
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
              {loading ? (
                <RotateCw className="animate-spin text-darkMode" />
              ) : (
                <ImageUp />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImagePopup;
