"use client";
import {  Trash2 } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="p-5">
      <div className="">
        <h1 className="text-2xl font-bold">Enquiry</h1>
      </div>
      {/* Sale Lists */}
      <div className="mt-5 border rounded border-lightBorder dark:border-darkBorder">
        <div className="grid grid-cols-6 px-5 py-3 place-items-center">
          <h1 className="text-md ">Email Id</h1>
          <h1 className="text-md">User Name</h1>
          <h1 className="text-md">Phone Number </h1>
          <h1 className="text-md">Message</h1>
          <h1 className="text-md">Status</h1>
          <h1 className="text-md">Action</h1>
        </div>
        <hr className="my-1 text-gray-300 dark:border-neutral-700" />
        {/* enquiry-1 */}
        <div className="grid grid-cols-6 gap-4 px-5 py-3 text-gray-500 border-b border-gray-200 place-items-center last:border-b-0 dark:border-neutral-600 dark:text-gray-50">
          <h1 className="w-full text-sm truncate">
            Sanketpathare8808@gmail.com
          </h1>
          <h1 className="text-sm">Sanket Pathare</h1>
          <h1 className="text-sm">+91 9011513014</h1>
          <h1 className="text-sm line-clamp-2"> Issue with Order #12345 </h1>
          <div className="">
            {" "}
            <button className="cursor-pointer" onClick={handleChange}>
              {isToggled ? " 🟢  Read" : "🔴 UnRead"}
            </button>
          </div>
          <div className="">
            <button className="cursor-pointer ">
              <Trash2 className="text-red-500 hover:text-red-600 " />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
