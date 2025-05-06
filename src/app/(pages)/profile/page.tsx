"use client";
import { useUser } from "@/app/context/UserContext";
import SettingsPopup from "@/components/Popups/EditSettingsPopup";
import PasswordPopup from "@/components/Popups/PasswordPopup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { user } = useUser();
  const [popup, setPopup] = useState(false)
  const [passwordPopup, setPasswordPopup] = useState(false)
  const [value, setValue] = useState("")
  const [editName, setEditName] = useState("")


  async function gmailVerificationCode(email: string) {
    try {
      const response = await axios.post('api/verifyEmail', { email });
      if (response.data.data) {
        return response.data.data
      }
      return []
    } catch (error) {
      console.log(`Error sending the verification code :`, error);
      return []
    }
  }

  const emailMutation = useMutation({
    mutationFn: gmailVerificationCode,
    onSuccess: () => {
      toast.success("OTP Sent on Email");
      setPasswordPopup(!passwordPopup);
    }
  })

  const handelGmailVerification = (email: string) => {
    emailMutation.mutate(email);
  }


  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <div className="py-5">
        <div className="border rounded border-lightBorder dark:border-darkBorder">
          <div className="p-5 grid lg:grid-cols-[2fr_5fr] grid-cols-1 gap-5">
            {/* Avatar */}
            <div className="sticky top-0">
              <h1 className="pb-2 text-lg">Avatar:</h1>
              <div className="relative w-full p-1 border rounded border-lightBorder dark:border-darkBorder">
                <Image
                  src={user?.avatar || "/placeholder.jpg"}
                  width={200}
                  height={200}
                  alt="image"
                  className="object-contain w-auto h-24 rounded lg:w-full lg:h-full"
                />
                <div className="absolute -top-1 -right-3">
                  {user?.isSuperAdmin ? (
                    <div className="px-2 py-1 text-xs text-white border-b-2 rounded-full bg-gradient-to-r from-red-500 to-yellow-400 border-lightBorder">
                      Super Admin
                    </div>
                  ) : (
                    <div className="px-2 text-xs text-white border-b-2 rounded-full bg-gradient-to-r from-teal-300 to-green-500 border-lightBorder">
                      Admin
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Name & Email */}
            {/* Col 2 */}
            <div>

              <h1 className="py-2 text-lg ">Edit Details :</h1>
              <div className="grid grid-cols-1 p-3 border rounded lg:grid-cols-2 border-lightBorder dark:border-darkBorder dark:bg-darkMode">
                <div className="p-2">
                  <p className="my-1 text-sm uppercase">FullName : </p>
                  <div className="flex gap-3">
                    <h1 className="w-full px-3 py-2 border rounded border-lightBorder dark:border-darkBorder">{user?.name}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.name as string);
                        setEditName("Full Name")
                      }}
                      className="px-2 text-white bg-green-600 rounded cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">UserName : </p>
                  <div className="flex gap-3">
                    <h1 className="w-full px-3 py-2 border rounded border-lightBorder dark:border-darkBorder">{user?.name}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.name as string);
                        setEditName("User Name")
                      }}
                      className="px-2 text-white bg-green-600 rounded cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">Email : </p>
                  <div className="flex gap-3">
                    <h1 className="w-full px-3 py-2 truncate border rounded border-lightBorder dark:border-darkBorder">{user?.email}</h1>
                    <button
                      onClick={() => {
                        setPopup(!popup);
                        setValue(user?.email as string);
                        setEditName("Email")
                      }}
                      className="px-2 text-white bg-green-600 rounded cursor-pointer"><Edit /></button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">Password : </p>
                  <div className="flex gap-3">
                    <h1 className="w-full px-3 py-2 border rounded border-lightBorder dark:border-darkBorder">{"*********"}</h1>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handelGmailVerification(user?.email as string);
                      }}
                      className="px-2 text-white bg-green-600 rounded cursor-pointer">
                      {emailMutation.isPending ? <Loader2 className="animate-spin" /> : < Edit />}
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="my-1 text-sm uppercase">ROLE : </p>
                  <div className="flex gap-3">
                    <h1 className="w-full px-3 py-2 border rounded border-lightBorder dark:border-darkBorder">{user?.isAdmin ? "Admin" : "Visitor"}</h1>
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

export default Page;
