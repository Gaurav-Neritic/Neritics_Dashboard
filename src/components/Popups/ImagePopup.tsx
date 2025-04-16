import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Images, ImageUp, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface imageProps {
  isVisible: boolean;
  onClose: () => void;
  id: any
}

const ImagePopup = ({ isVisible, onClose, id }: imageProps) => {

  const [newImage, setNewImage] = useState<File | null>(null)
  const queryClient = useQueryClient();
  const updateBlogImage = async () => {
    const formData = new FormData();
    formData.append('newImage', newImage as File)
    formData.append('id', id as string)
    try {
      const response = await axios.put('../api/editBlogImage', formData);

      if (response.data.data) {
        toast.success("Image Updated!")
        return response.data.data;
      }
      return []
    } catch (error) {
      console.log("Error updating the image", error)
    }
  }

  const updateImageMutation = useMutation({
    mutationFn: updateBlogImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogDetails'] });
      onClose();
    },
    onError: () => {
      toast.error("Something Went Wrong")
    }
  })

  const handelUpdateImage = (e: React.MouseEvent) => {
    e.preventDefault();
    updateImageMutation.mutate();
  }

  const getPreviewUrl = (file: File) => {
    if (!file) {
      return null;
    }
    return URL.createObjectURL(file);
  };


  if (!isVisible) return null
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 mx-5 lg:mx-0">
      <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Images className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Edit Image</h1>
          </div>
          <button
            type="button"
            className="cursor-pointer focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewImage(e.target.files?.[0] || null)
            }}
            required
            className="w-full text-gray-700 font-medium text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-3 file:mr-4 file:bg-gray-300 file:hover:bg-gray-200 file:text-black rounded"
          />
          <button
            type="button"
            onClick={handelUpdateImage}
            className="p-2 border border-lightBorder dark:border-darkBorder text-green-500 hover:text-green-600  rounded cursor-pointer">
            {updateImageMutation.isPending ? <Loader2 className="animate-spin" /> : < ImageUp />}
          </button>
          {newImage && (
            <img
              src={
                getPreviewUrl(newImage) ||
                "https://dummyimage.com/600x400/000/fff"
              }
              alt="Main Image Preview"
              className="mt-2  p-1 h-18 w-18 object-cover rounded-sm border-2 border-gray-100 dark:bg-neutral-700"
            />
          )}
        </div>

      </div>
    </div>
  );
};
export default ImagePopup;
