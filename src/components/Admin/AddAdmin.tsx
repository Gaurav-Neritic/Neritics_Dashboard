"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const AddAdmin = () => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <div className="p-5 ">
      <div className="border border-lightBorder dark:border-darkBorder rounded">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-lg mb-1">Admin Access Requests:</h1>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="cursor-pointer flex gap-2"
          >
            {isVisible ? "Show Less" : "Show More"}{" "}
            {isVisible ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        {isVisible && (
          <div className="grid grid-cols-4 place-items-center m-5 py-2 border border-lightBorder dark:border-darkBorder rounded ">
            <div>
              <Image
                src={"/placeholder.jpg"}
                alt="image"
                width={50}
                height={50}
                className="w-10 h-10 object-cover"
              />
            </div>
            <div>
              <h1>Name</h1>
            </div>
            <div>
              <h1>Email</h1>
            </div>
            <div>
              <button className="">Authorize</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAdmin;
