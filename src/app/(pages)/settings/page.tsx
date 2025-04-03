"use client";

import { SquarePlus, Plus } from "lucide-react";
import React, { useState } from "react";

const SettingsPage = () => {
  return (
    <div className="p-5">
      <div className="">
        <h1 className="text-2xl font-bold"> General Settings</h1>
      </div>
      {/* Category Settings: */}
      <div className="w-auto">
        <div className="mt-5 border border-lightBorder dark:border-darkBorder rounded">
          <div className="p-4">
            <h1 className="text-lg mb-1">Category Settings:</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              {/*Product Category */}
              <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm mb-1"> Product Category</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder  rounded outline-none"
                    placeholder="Add new Product category"
                  />
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SquarePlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/*Product Category */}
              <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm  mb-1"> Product Type</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder rounded outline-none"
                    placeholder="Add new Product Type"
                  />
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SquarePlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/*Product Category */}
              <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm  mb-1">Form Category</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder rounded outline-none"
                    placeholder="Add new Form"
                  />
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SquarePlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/*Product Category */}
              <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm  mb-1"> Container Category</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder rounded outline-none"
                    placeholder="Add new container"
                  />
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SquarePlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/*Product Category */}
              <div className="m-4 p-4 border border-lightBorder dark:border-darkBorder rounded ">
                <h1 className="text-sm  mb-1">Country Of Origin</h1>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-lightBorder dark:border-darkBorder  rounded outline-none"
                    placeholder="Add country"
                  />
                  <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                    <SquarePlus className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
