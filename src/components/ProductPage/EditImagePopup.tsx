import { Images } from 'lucide-react'
import React from 'react'


const EditImagePopup = () => {
  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg  max-w-2xl  w-full">
            <div className="flex items-center  gap-4">
              <Images className="w-8 h-8 " />
              <h1 className="text-2xl font-semibold ">Edit Image</h1>
            </div>
            {/* Main Image */}
            <div className="p-5">
              <div className="flex justify-start items-start gap-6 mb-2 ">
                <label>* Main Image: </label>
                <input
                  type="file"
                  required
                  className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
                />
                <button className="p-2 border rounded ">Upload</button>
              </div>
              {/* First Image  */}
              <div className="flex justify-start items-start gap-6 mb-2 ">
                <label>* First Image: </label>
                <input
                  type="file"
                  required
                  className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
                />
                <button className="p-2 border rounded ">Upload</button>
              </div>
              {/* Second Image */}
              <div className="flex justify-start items-start gap-6 mb-2 ">
                <label>* Second Image: </label>
                <input
                  type="file"
                  required
                  className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
                />
                <button className="p-2 border rounded ">Upload</button>
              </div>
              {/* Third Image */}
              <div className="flex justify-start items-start gap-6 mb-2 ">
                <label>* Third Image: </label>
                <input
                  type="file"
                  required
                  className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
                />
                <button className="p-2 border rounded ">Upload</button>
              </div>
              {/* Fourth */}
              <div className="flex justify-start items-start gap-6 mb-2 ">
                <label>* Fourth Image: </label>
                <input
                  type="file"
                  required
                  className="p-2 w-fit  rounded border border-lightBorder dark:border-darkBorder"
                />
                <button className="p-2 border rounded ">Upload</button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default EditImagePopup
