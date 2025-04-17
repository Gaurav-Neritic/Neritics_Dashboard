"use client";
import Image from "next/image";
import React, { useState } from "react";
import ToggleMode from "../Theme/ToggleMode";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Loader from "../Loaders/Loader";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function login() {
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("../api/login", { data });

      if (response.data.data?.isAdmin) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        toast.success("Logged In Successfully");
        router.push("/");
        return response.data.data;
      }
      if (response.data.data === "Requested For Access") {
        return toast.success("Rquested For Access");
      }
    } catch (error) {
      console.log(`Error logging in : ${error}`);
      toast.error("Invalid Credentials");
    }
  }

  const loginMutation = useMutation({
    mutationFn: login,
  });

  const handelLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!email.includes('@neriticindustries')) {
    //   return toast.success("You aren't allowed", { icon: "🙅🏻‍♀️⚠️" })
    // }
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" w-full mx-5 lg:max-w-fit p-0 lg:p-5  relative grid grid-cols-2 max-sm:grid-cols-1  border border-lightBorder dark:border-darkBorder rounded">
        {/* Image  */}
        <div className="">
          <Image
            src="/login.svg"
            alt="image"
            width={400}
            height={400}
            className="lg:block hidden"
          />
        </div>
        {/* Login Login */}
        <div className="p-5 sm:border-l  border-lightBorder dark:border-darkBorder">
          <h1 className="text-2xl  py-5 text-center font-semibold uppercase">
            Login
          </h1>
          <div>
            <form
              onSubmit={handelLogin}
              className="flex items-start justify-center flex-col gap-2 "
            >
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
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  required
                  className="p-2 w-full border border-lightBorder dark:border-darkBorder rounded outline-none placeholder:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 cursor-pointer outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button
                type="submit"
                className="text-sm lg:text- py-2 my-5 px-3 w-full border border-lightBorder dark:border-darkBorder rounded cursor-pointer"
              >
                {loginMutation.isPending ? (
                  <Loader title="Logging In...." />
                ) : (
                  "Login"
                )}
              </button>
              <div className="text-center w-full text-sm lg:text-base">
                Request Admin Access -{" "}
                <Link
                  href={"/signup"}
                  className="text-red-400 hover:text-red-500 hover:underline-offset-4 hover:underline decoration-red-500"
                >
                  SignUp
                </Link>
              </div>
              <div className="text-center text-sm lg:text-base w-full animate-pulse ">
                *Note : (Only Admin Access)
              </div>
            </form>
          </div>
        </div>
        <div className="absolute -right-5 -top-5 bg-white dark:bg-darkMode">
          <ToggleMode />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
