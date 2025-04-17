"use client";
import { useUser } from "@/app/context/UserContext";
import Image from "next/image";
import React from "react";

const page = () => {
  const { user } = useUser();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="py-5">
        <div className=" border border-lightBorder dark:border-darkBorder rounded">
          <div className="p-5">
            {/* Avatar */}
            <div>
              <h1 className="text-lg py-2">Avatar:</h1>
              <div className="p-1 w-fit border border-lightBorder dark:border-darkBorder rounded  relative">
                <Image
                  src={user?.avatar || "/placeholder.jpg"}
                  width={200}
                  height={200}
                  alt="image"
                  className="object-contain rounded "
                />
                <div className="absolute -top-1 -right-3">
                  {user?.isSuperAdmin ? (
                    <div className="px-2 text-xs rounded-full bg-gradient-to-r from-red-500 to-yellow-400 text-white border-b-2 border-lightBorder">
                      Super Admin
                    </div>
                  ) : (
                    <div className="px-2 text-xs rounded-full bg-gradient-to-r from-teal-300 to-green-500 text-white border-b-2 border-lightBorder">
                      Admin
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Name & Email */}
            <div className="py-5">
              <h1 className="text-lg py-1 ">Details:</h1>
              <div className=" p-3 w-fit border border-lightBorder dark:border-darkBorder rounded">
                <div className="">
                  <h1 className="text-md ">
                    Name: <span className="mx-1 capitalize">{user?.name}</span>
                  </h1>
                </div>
                <div>
                  <h1 className="text-md ">
                    Email: <span className="mx-1 ">{user?.email}</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
