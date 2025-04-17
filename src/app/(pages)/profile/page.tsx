"use client";
import { useUser } from "@/app/context/UserContext";
import SettingsPopup from "@/components/Popups/EditSettingsPopup";
import PasswordPopup from "@/components/Popups/PasswordPopup";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const { user } = useUser();
  const [popup, setPopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)
  const [value, setValue] = useState("")
  const [editName, setEditName] = useState("")

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="py-5">
        <div className=" border border-lightBorder dark:border-darkBorder rounded">
          <div className="p-5 grid lg:grid-cols-[2fr_5fr] grid-cols-1 gap-5">
            {/* Avatar */}
            <div className="sticky top-0">
              <h1 className="text-lg pb-2">Avatar:</h1>
              <div className="p-1 w-full border border-lightBorder dark:border-darkBorder rounded  relative">
                <Image
                  src={user?.avatar || "/placeholder.jpg"}
                  width={200}
                  height={200}
                  alt="image"
                  className="object-contain rounded w-auto lg:w-full h-24 lg:h-full"
                />
                <div className="absolute -top-1 -right-3">
                  {user?.isSuperAdmin ? (
                    <div className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-red-500 to-yellow-400 text-white border-b-2 border-lightBorder">
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
            {/* Col 2 */}
            <div>

              <h1 className="text-lg py-2 ">Edit Details :</h1>
              <div className="grid lg:grid-cols-2 grid-cols-1 border p-3 rounded border-lightBorder dark:bg-darkBorder">
                <div className="p-2">
                  <p className="my-1 text-sm uppercase">FullName : </p>
                  <div className="flex  gap-3">
                    <h1 className=" px-3 py-2 border border-lightBorder dark:border-darkBorder rounded w-full">{user?.name}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.name as string);
                        setEditName("Full Name")
                      }}
                      className="bg-green-600 px-2 rounded text-white cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">UserNAme : </p>
                  <div className="flex  gap-3">
                    <h1 className=" px-3 py-2 border border-lightBorder dark:border-darkBorder rounded w-full">{user?.name}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.name as string);
                        setEditName("User Name")
                      }}
                      className="bg-green-600 px-2 rounded text-white cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">Email : </p>
                  <div className="flex  gap-3">
                    <h1 className=" px-3 py-2 border border-lightBorder dark:border-darkBorder rounded w-full truncate">{user?.email}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.email as string);
                        setEditName("Email")
                      }}
                      className="bg-green-600 px-2 rounded text-white cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">Password : </p>
                  <div className="flex  gap-3">
                    <h1 className=" px-3 py-2 border border-lightBorder dark:border-darkBorder rounded w-full">{"*********"}</h1>
                    <button
                      onClick={() => {
                        setPasswordPopup(!passwordPopup);
                      }}
                      className="bg-green-600 px-2 rounded text-white cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">ADMIn : </p>
                  <div className="flex  gap-3">
                    <h1 className=" px-3 py-2 border border-lightBorder dark:border-darkBorder rounded w-full">{user?.isAdmin ? "Admin" : "Visitor"}</h1>
                  </div>
                </div>
                {popup &&
                  <SettingsPopup
                    isVisible={popup}
                    onClose={() => { setPopup(false); }}
                    id={user?._id}
                    value={value}
                    editName={editName} />
                }

                {passwordPopup &&
                  <PasswordPopup
                    isVisible={passwordPopup}
                    onClose={() => { setPasswordPopup(false); }}
                    id={user?._id} />
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
