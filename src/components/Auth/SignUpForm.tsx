"use client";
import React, { useState } from "react";
import ToggleMode from "../Theme/ToggleMode";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loader from "../Loaders/Loader";
import Link from "next/link";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signup() {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar || "");
    try {
      const response = await axios.post("../api/signup", formData);
      if (response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log("Error signing in ", error);
      toast.error("Failed  to signup");
      return [];
    }
  }

  const signUpUserMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Signuped SuccessFully");
      router.push("/login");
    },
  });

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUpUserMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" w-full mx-5 lg:max-w-fit lg:p-5  p-0 relative grid  sm:grid-cols-2   border  border-lightBorder dark:border-darkBorder rounded">
        {/* Login Login */}
        <div className="p-5 sm:border-r  border-lightBorder dark:border-darkBorder">
          <h1 className="text-2xl py-5 text-center font-semibold uppercase">
            Request Access
          </h1>
          <div>
            <form
              onSubmit={handelSubmit}
              className="flex items-start justify-center flex-col gap-2"
            >
              <label className="text-sm lg:text-base">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name..."
                required
                className="p-2 w-full border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm"
              />

              <label className="text-sm lg:text-base">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                required
                className="p-2 w-full border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm"
              />

              <label className="text-sm lg:text-base">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                required
                className="w-full p-2 border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm "
              />

              <label className="text-sm lg:text-base">Avatar:</label>
              <input
                type="file"
                onChange={(e) => setAvatar(e.target.files?.[0] || null)}
                placeholder="Enter email..."
                required
                className=" text-sm lg:text-base w-full text-gray-700 font-medium bg-white border border-lightBorder dark:border-darkBorder file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-200 file:hover:bg-gray-100 file:text-black rounded 
                        dark:bg-darkMode dark:text-gray-500 dark:file:bg-neutral-800 dark:file:text-white dark:hover:file:text-gray-500 p-2"
              />
              <button
                type="submit"
                className="py-2 my-5 px-3 w-full border border-lightBorder dark:border-darkBorder rounded cursor-pointer text-sm lg:text-base"
              >
                {signUpUserMutation.isPending ? (
                  <Loader title="Requesting..." />
                ) : (
                  "Request Access"
                )}
              </button>
              <div className="text-center w-full text-sm lg:text-base ">
                Already Requested ?{" "}
                <Link
                  href={"/login"}
                  className="text-red-400 hover:text-red-500 hover:underline-offset-4 hover:underline decoration-red-500"
                >
                  Login
                </Link>
              </div>
              <div className="text-center w-full animate-pulse text-sm lg:text-base">
                *Note : (Request For Admin Access)
              </div>
            </form>
          </div>
        </div>
        {/* Image  */}
        <div className="flex items-center justify-center ">
          <Image
            src="/sign.svg"
            alt="image"
            width={400}
            height={400}
            className="lg:block hidden"
          />
        </div>

        <div className="absolute -right-5 -top-5 bg-white dark:bg-darkMode">
          <ToggleMode />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
